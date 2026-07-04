"use client";

import { use } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const categoryMeta: Record<string, { label: string; image: string; description: string }> = {
  "ayurveda": {
    label: "Ayurveda & Supplements",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1600",
    description: "Ancient herbs and modern science combined to nourish your body from within.",
  },
  "food-beverages": {
    label: "Food & Beverages",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1600",
    description: "Delicious, nutritious food and beverages enriched with Ganoderma extract.",
  },
  "cosmetics": {
    label: "Cosmetics & Toiletries",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=1600",
    description: "Natural beauty products for radiant skin and healthy hair.",
  },
  "home-care": {
    label: "Home Care",
    image: "https://images.unsplash.com/photo-1584820927498-cafe5c152a00?auto=format&fit=crop&q=80&w=1600",
    description: "Effective and eco-friendly products to keep your home clean and fresh.",
  },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = categoryMeta[slug];
  if (!meta) notFound();

  const addItem = useCartStore((state) => state.addItem);
  const products = productsData.filter((p) => p.category === meta.label);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src={meta.image} alt={meta.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-extrabold text-white mb-2">{meta.label}</h1>
          <p className="text-gray-200 max-w-lg">{meta.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Products
        </Link>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <Link href={`/products/${product.id}`}>
                  <div className="h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
                  </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">₹{product.mrp}</p>
                      <p className="text-xl font-bold text-gray-900">₹{product.dp}</p>
                    </div>
                    <button
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.dp, image: product.image })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
