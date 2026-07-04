"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import productsData from "@/data/products.json";

export default function ProductsPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(productsData.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">All Products</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={`/products/${product.id}`}>
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">₹{product.mrp}</p>
                      <p className="text-xl font-bold text-gray-900">₹{product.dp}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({ id: product.id, name: product.name, price: product.dp, image: product.image });
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors z-10"
                    >
                      Add
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different category.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
