"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, User, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';

export default function Header() {
  const getCartCount = useCartStore((state) => state.getCartCount);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [mounted, setMounted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 -ml-2 rounded-md hover:bg-gray-100 md:hidden">
                {mobileMenu ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">DXN Store</span>
              </Link>
            </div>

            {/* Search Bar — desktop */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <SearchBar />
            </div>

            {/* Nav + Icons */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <nav className="hidden md:flex space-x-6">
                <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Products</Link>
                <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
              </nav>
              
              <div className="flex items-center gap-3 border-l pl-4">
                <Link href="/contact" className="text-gray-500 hover:text-blue-600 transition-colors hidden md:block">
                  <User className="h-6 w-6" />
                </Link>
                <button onClick={toggleCart} className="text-gray-500 hover:text-blue-600 transition-colors relative">
                  <ShoppingCart className="h-6 w-6" />
                  {mounted && getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-3 md:hidden">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenu(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">DXN Store</span>
            </div>
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenu(false)} className="text-lg font-semibold text-gray-800 hover:text-blue-600">Home</Link>
              <Link href="/products" onClick={() => setMobileMenu(false)} className="text-lg font-semibold text-gray-800 hover:text-blue-600">All Products</Link>
              <Link href="/about" onClick={() => setMobileMenu(false)} className="text-lg font-semibold text-gray-800 hover:text-blue-600">About</Link>
              <Link href="/contact" onClick={() => setMobileMenu(false)} className="text-lg font-semibold text-gray-800 hover:text-blue-600">Contact Us</Link>
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-100">
              <a href="https://wa.me/917258902556" target="_blank" rel="noreferrer" className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-bold hover:bg-green-600">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

