import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold">DXN Store</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Authorized DXN distributor bringing premium wellness products, supplements, cosmetics, and more directly to your doorstep across India.
            </p>
            {/* Social as text links since icons not in this lucide version */}
            <div className="flex gap-4">
              <a href="https://wa.me/917258902556" target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors">
                💬 WhatsApp
              </a>
              <a href="mailto:shubhamk73407@gmail.com" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                ✉️ Email
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/checkout" className="text-gray-400 hover:text-white transition-colors">Checkout</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              <li><Link href="/categories/ayurveda" className="text-gray-400 hover:text-white transition-colors">Ayurveda & Supplements</Link></li>
              <li><Link href="/categories/food-beverages" className="text-gray-400 hover:text-white transition-colors">Food & Beverages</Link></li>
              <li><Link href="/categories/cosmetics" className="text-gray-400 hover:text-white transition-colors">Cosmetics & Toiletries</Link></li>
              <li><Link href="/categories/home-care" className="text-gray-400 hover:text-white transition-colors">Home Care</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Phone & WhatsApp</p>
                  <a href="https://wa.me/917258902556" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm">
                    +91 7258902556
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <a href="mailto:shubhamk73407@gmail.com" className="hover:text-white transition-colors text-sm break-all">
                    shubhamk73407@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Serving</p>
                  <p className="text-sm">Pan India — All States</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} DXN Store. All rights reserved. Authorized DXN Distributor.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 justify-center">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
