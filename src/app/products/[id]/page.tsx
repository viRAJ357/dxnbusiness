"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Shield, Truck } from "lucide-react";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = productsData.find((p) => p.id === resolvedParams.id);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square border border-gray-100 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl shadow-sm"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-6">
              <p className="text-4xl font-black text-gray-900">₹{product.dp}</p>
              <p className="text-lg text-gray-400 line-through mb-1">MRP: ₹{product.mrp}</p>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-1.5 ml-2">
                Save ₹{product.mrp - product.dp}
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-10 border-t border-b border-gray-100 py-6">
              <li className="flex items-center text-gray-700">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                100% Original DXN Product
              </li>
              <li className="flex items-center text-gray-700">
                <Shield className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                Secure Checkout & Payment
              </li>
              <li className="flex items-center text-gray-700">
                <Truck className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                Fast Delivery Available
              </li>
            </ul>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addItem({ id: product.id, name: product.name, price: product.dp, image: product.image })}
                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Add to Cart
              </button>
              <Link href="/checkout" className="flex-1">
                <button 
                  onClick={() => addItem({ id: product.id, name: product.name, price: product.dp, image: product.image })}
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Buy Now
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
