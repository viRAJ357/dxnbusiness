import type { Metadata } from "next";
import { Leaf, Award, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About DXN | Premium Health & Wellness",
  description: "Learn about DXN – a world leader in Ganoderma-based health products, trusted by millions worldwide.",
};

export default function AboutPage() {
  const stats = [
    { label: "Countries", value: "180+" },
    { label: "Members", value: "9M+" },
    { label: "Products", value: "100+" },
    { label: "Years", value: "30+" },
  ];

  const values = [
    { icon: <Leaf className="w-7 h-7 text-green-500" />, title: "100% Natural", desc: "All products use the finest natural ingredients including Ganoderma, Spirulina, and Aloe Vera." },
    { icon: <Award className="w-7 h-7 text-blue-500" />, title: "Award-Winning Quality", desc: "Certified with GMP, ISO, and HACCP standards ensuring the highest quality in every product." },
    { icon: <Globe className="w-7 h-7 text-purple-500" />, title: "Global Presence", desc: "Operating in over 180 countries with a trusted reputation built over 30+ years." },
    { icon: <Users className="w-7 h-7 text-orange-500" />, title: "Community Driven", desc: "Over 9 million members worldwide who trust DXN for their health and wellness journey." },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1600"
            alt="About DXN"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">About DXN</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            DXN was founded in 1993 by Dato' Dr. Lim Siow Jin, a graduate of the Indian Institute of Technology. Guided by the mission of providing the highest quality products and business opportunities, DXN has grown into a global wellness powerhouse.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold text-white">{stat.value}</p>
              <p className="text-blue-200 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Why Choose DXN?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">The DXN Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600 space-y-5">
            <p>
              DXN started with a vision to harness the power of Ganoderma — known as the "King of Herbs" — and bring its incredible health benefits to the world. Today, DXN operates its own Ganoderma farms, processing facilities, and research centers, ensuring complete control over quality from farm to shelf.
            </p>
            <p>
              With a presence in over 180 countries and more than 9 million members, DXN's success is built on a foundation of trust, quality, and community. Every product is crafted with care, combining ancient herbal wisdom with modern scientific research.
            </p>
            <p>
              As an authorized DXN distributor, our store brings these world-class products directly to you with fast delivery, secure payments, and exceptional customer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
