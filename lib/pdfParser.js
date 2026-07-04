const fs = require('fs');
const pdf = require('pdf-parse');

/**
 * Parses a PDF file and extracts product name and MRP.
 * Returns an array of objects: { id, name, mrp }
 */
async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const lines = data.text.split('\n').map(l => l.trim()).filter(l => l.length);
  const products = [];
  let id = 1;
  const priceRegex = /([\d,]+(?:\.\d{1,2})?)$/; // captures trailing number
  lines.forEach(line => {
    const priceMatch = line.match(priceRegex);
    if (priceMatch) {
      const mrp = parseFloat(priceMatch[1].replace(/,/g, ''));
      const name = line.replace(priceRegex, '').trim();
      if (name && !isNaN(mrp)) {
        products.push({ id: id++, name, mrp });
      }
    }
  });
  return products;
}

module.exports = { parsePdf };
