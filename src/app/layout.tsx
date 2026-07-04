import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ClientProviders from "@/app/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DXN Store | Premium Health & Wellness Products",
  description: "Get premium wellness products, supplements, and cosmetics directly to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen flex flex-col bg-gray-900 text-white`}>
        <ClientProviders>
          <Header />
          <CartDrawer />
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ClientProviders>
      </body>
    </html>
  );
}
