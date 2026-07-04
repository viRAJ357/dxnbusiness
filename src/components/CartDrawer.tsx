"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[70] transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
              <p className="text-gray-500">Looks like you haven't added anything yet.</p>
              <button 
                onClick={toggleCart}
                className="mt-4 px-6 py-2 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 pr-4">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-bold text-gray-900">₹{item.price}</p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-blue-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">₹{getCartTotal()}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={toggleCart}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
