"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending (opens WhatsApp with message)
    const msg = encodeURIComponent(
      `Hi, I'm ${form.name}!\n\nSubject: ${form.subject}\n\n${form.message}\n\nPhone: ${form.phone}\nEmail: ${form.email}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/917258902556?text=${msg}`, "_blank");
      setSent(true);
      setLoading(false);
    }, 800);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      label: "Phone & WhatsApp",
      value: "+91 7258902556",
      link: "https://wa.me/917258902556",
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      label: "Email",
      value: "shubhamk73407@gmail.com",
      link: "mailto:shubhamk73407@gmail.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      label: "Serving",
      value: "Pan India — All States",
      link: null,
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      label: "Business Hours",
      value: "Mon–Sat: 9 AM – 8 PM",
      link: null,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">Get in Touch</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Have a question about our products or want to place a bulk order? We're here to help!
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h2>
            {contactInfo.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noreferrer" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp Quick Chat */}
            <a
              href="https://wa.me/917258902556?text=Hi%2C%20I%20want%20to%20know%20more%20about%20DXN%20products"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500">WhatsApp opened with your message. We'll reply as soon as possible.</p>
                <button onClick={() => setSent(false)} className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-medium rounded-full hover:bg-blue-100">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input required name="name" value={form.name} onChange={handleChange} type="text" placeholder="Shubham" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 7258902556" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select required name="subject" value={form.subject} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">-- Select --</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Order Tracking">Order Tracking</option>
                      <option value="Returns & Refund">Returns & Refund</option>
                      <option value="Become a Distributor">Become a Distributor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us what you need..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {loading ? "Sending..." : (
                        <><Send className="w-4 h-4" /> Send via WhatsApp</>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
