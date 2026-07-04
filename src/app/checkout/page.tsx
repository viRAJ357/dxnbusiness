"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Smartphone, Building2, CreditCard, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type PaymentMethod = "cod" | "phonepe" | "upi" | "netbanking" | "card";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    upiId: "",
    bankName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getCartTotal();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Valid 6-digit pincode required";

    if (paymentMethod === "upi" && !form.upiId.trim()) newErrors.upiId = "UPI ID is required";
    if (paymentMethod === "netbanking" && !form.bankName.trim()) newErrors.bankName = "Bank name is required";
    if (paymentMethod === "card") {
      if (!form.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      if (!form.cardExpiry.trim()) newErrors.cardExpiry = "Expiry is required";
      if (!form.cardCvv.trim()) newErrors.cardCvv = "CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const orderData = {
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        paymentMethod,
        items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
        total,
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        setSuccess(true);
      } else {
        alert("Order failed. Please try again or contact us on WhatsApp.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Order Placed! 🎉</h1>
          <p className="text-gray-500 mb-2">
            Thank you, <strong>{form.name}</strong>! Your order has been received.
          </p>
          <p className="text-gray-500 mb-8">
            Order confirmation has been sent to <strong>{form.email}</strong>. We will contact you on <strong>{form.phone}</strong> soon.
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-8 text-left">
            <p className="text-sm font-medium text-blue-900 mb-1">Need help? Contact us:</p>
            <a href="https://wa.me/917258902556" className="text-blue-600 font-medium block hover:underline">
              📱 WhatsApp: +91 7258902556
            </a>
          </div>
          <Link
            href="/products"
            className="w-full block bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/products" className="text-blue-600 font-medium hover:underline">Browse Products</Link>
        </div>
      </div>
    );
  }

  const paymentOptions = [
    { id: "cod", label: "Cash on Delivery", icon: <Truck className="w-5 h-5" />, desc: "Pay when you receive" },
    { id: "phonepe", label: "PhonePe / UPI", icon: <Smartphone className="w-5 h-5" />, desc: "Pay to 7258902556" },
    { id: "upi", label: "Other UPI", icon: <Smartphone className="w-5 h-5" />, desc: "GPay, Paytm, BHIM etc." },
    { id: "netbanking", label: "Net Banking", icon: <Building2 className="w-5 h-5" />, desc: "All major banks" },
    { id: "card", label: "Debit / Credit Card", icon: <CreditCard className="w-5 h-5" />, desc: "Visa, Mastercard, RuPay" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Shubham Kumar" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-400" : "border-gray-200"}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="7258902556" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-400" : "border-gray-200"}`} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@email.com" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-400" : "border-gray-200"}`} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="House No, Street, Colony..." className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-400" : "border-gray-200"}`} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input name="city" value={form.city} onChange={handleChange} type="text" placeholder="Mumbai" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? "border-red-400" : "border-gray-200"}`} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input name="state" value={form.state} onChange={handleChange} type="text" placeholder="Maharashtra" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-400" : "border-gray-200"}`} />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} type="text" maxLength={6} placeholder="400001" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pincode ? "border-red-400" : "border-gray-200"}`} />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {paymentOptions.map((option) => (
                  <label key={option.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="payment" value={option.id} checked={paymentMethod === option.id} onChange={() => setPaymentMethod(option.id as PaymentMethod)} className="sr-only" />
                    <div className={`${paymentMethod === option.id ? "text-blue-600" : "text-gray-400"}`}>
                      {option.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{option.label}</p>
                      <p className="text-xs text-gray-500">{option.desc}</p>
                    </div>
                    {paymentMethod === option.id && (
                      <CheckCircle className="w-5 h-5 text-blue-500 ml-auto flex-shrink-0" />
                    )}
                  </label>
                ))}
              </div>

              {/* PhonePe Instructions */}
              {paymentMethod === "phonepe" && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-purple-900 mb-1">📱 Pay via PhonePe / UPI</p>
                  <p className="text-sm text-purple-700">Send payment to: <strong>7258902556@ybl</strong></p>
                  <p className="text-xs text-purple-500 mt-1">After payment, you will receive a confirmation call.</p>
                </div>
              )}

              {/* UPI Input */}
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                  <input name="upiId" value={form.upiId} onChange={handleChange} type="text" placeholder="yourname@upi" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.upiId ? "border-red-400" : "border-gray-200"}`} />
                  {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
                  <select name="bankName" value={form.bankName} onChange={handleChange} className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bankName ? "border-red-400" : "border-gray-200"}`}>
                    <option value="">-- Select Bank --</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis">Axis Bank</option>
                    <option value="Kotak">Kotak Mahindra Bank</option>
                    <option value="PNB">Punjab National Bank</option>
                    <option value="BOB">Bank of Baroda</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                </div>
              )}

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input name="cardNumber" value={form.cardNumber} onChange={handleChange} type="text" maxLength={16} placeholder="1234 5678 9012 3456" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? "border-red-400" : "border-gray-200"}`} />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                    <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} type="text" maxLength={5} placeholder="12/28" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardExpiry ? "border-red-400" : "border-gray-200"}`} />
                    {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input name="cardCvv" value={form.cardCvv} onChange={handleChange} type="password" maxLength={3} placeholder="•••" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardCvv ? "border-red-400" : "border-gray-200"}`} />
                    {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 flex-shrink-0">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order • ₹${total}`
                )}
              </button>

              <div className="flex items-center gap-2 justify-center mt-4 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure & encrypted checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
