'use client';
import React, { ReactNode } from 'react';
import { CartProvider } from '@/app/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Elements stripe={stripePromise}>{children}</Elements>
    </CartProvider>
  );
}
