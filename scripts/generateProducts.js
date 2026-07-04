// scripts/generateProducts.js
const path = require('path');
const fs = require('fs');
const { parsePdf } = require('../lib/pdfParser');

const pdfPath = process.argv[2] || path.resolve(__dirname, '..', 'public', 'DXN Product Price List April 2026.pdf');
const outputPath = path.resolve(__dirname, '..', 'data', 'products.json');

(async () => {
  try {
    const products = await parsePdf(pdfPath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
    console.log('✅ Products extracted to', outputPath);
    console.log('Count:', products.length);
  } catch (err) {
    console.error('❌ Error extracting PDF:', err);
    process.exit(1);
  }
})();
