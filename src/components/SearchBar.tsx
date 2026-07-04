"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import productsData from "@/data/products.json";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof productsData>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const filtered = productsData.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 6));
    setOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (id: string) => {
    setQuery("");
    setOpen(false);
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
          placeholder="Search DXN products..."
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-bold text-blue-600 flex-shrink-0">₹{product.dp}</p>
            </button>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(query)}`}
            onClick={() => { setOpen(false); setQuery(""); }}
            className="block text-center text-sm text-blue-600 font-medium py-3 border-t border-gray-100 hover:bg-gray-50"
          >
            View all results for "{query}"
          </Link>
        </div>
      )}

      {open && results.length === 0 && query.length >= 2 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4 text-center text-sm text-gray-500">
          No products found for "{query}"
        </div>
      )}
    </div>
  );
}
