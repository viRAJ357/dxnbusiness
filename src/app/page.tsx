"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import productsData from "@/data/products.json";
import { ShieldCheck, Truck, RefreshCcw, HeadphonesIcon, MessageCircle } from "lucide-react";

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);
  const featuredProducts = productsData.slice(0, 8);

  const categories = [
    { name: "Ayurveda & Supplements", image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600", link: "/categories/ayurveda" },
    { name: "Food & Beverages", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600", link: "/categories/food-beverages" },
    { name: "Cosmetics & Toiletries", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600", link: "/categories/cosmetics" },
    { name: "Home Care", image: "https://images.unsplash.com/photo-1584820927498-cafe5c152a00?auto=format&fit=crop&q=80&w=600", link: "/categories/home-care" },
  ];

  const trustBadges = [
    { icon: <Truck className="w-7 h-7 text-blue-600" />, title: "Fast Delivery", desc: "Pan India shipping" },
    { icon: <ShieldCheck className="w-7 h-7 text-blue-600" />, title: "Secure Payment", desc: "UPI, Card, COD & more" },
    { icon: <RefreshCcw className="w-7 h-7 text-blue-600" />, title: "Easy Returns", desc: "7-day return policy" },
    { icon: <HeadphonesIcon className="w-7 h-7 text-blue-600" />, title: "24/7 Support", desc: "WhatsApp & email" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1605802521997-6a1bdcb14088?auto=format&fit=crop&q=80&w=1600"
            alt="Wellness Background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-36 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-blue-600 bg-opacity-80 text-blue-100 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🌿 Authorized DXN Distributor
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Premium Wellness <br className="hidden sm:block" /> for a Better Life
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl leading-relaxed">
            Discover DXN's world-class Ayurveda, food, cosmetics & more — delivered fast across India with secure payment.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-blue-700 bg-white hover:bg-blue-50 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/917258902556?text=Hi%2C%20I%20want%20to%20order%20DXN%20products"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full text-white border-2 border-white border-opacity-50 hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Order
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{badge.title}</p>
                  <p className="text-xs text-gray-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link} className="group relative block rounded-2xl overflow-hidden bg-gray-100 h-64">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-5">
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 text-sm mt-1">Bestsellers trusted by thousands</p>
            </div>
            <Link href="/products" className="text-blue-600 font-semibold hover:text-blue-500 text-sm">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group flex flex-col">
                <Link href={`/products/${product.id}`}>
                  <div className="h-56 overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">{product.category}</p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through">MRP ₹{product.mrp}</p>
                      <p className="text-lg font-extrabold text-gray-900">₹{product.dp}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({ id: product.id, name: product.name, price: product.dp, image: product.image });
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp CTA Band */}
      <div className="bg-green-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Need Help Choosing? Chat with Us! 💬</h2>
          <p className="text-green-100 mb-6">Get personalized product recommendations, track your order, or ask any question on WhatsApp.</p>
          <a
            href="https://wa.me/917258902556?text=Hi%2C%20I%20need%20help%20choosing%20DXN%20products"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp — +91 7258902556
          </a>
        </div>
      </div>
    </div>
  );
}

