import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export async function processPayment(amount: number, orderId: string) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  // In a real app, this would call your backend
  // For demo purposes, we'll simulate a successful payment
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a payment intent response
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/create_payment_intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      amount,
      orderId,
    }),
  });

  const { clientSecret } = await response.json();
  if (!clientSecret) return null; // For demo purposes

  // Confirm the payment with Stripe.js
  const result = await stripe.confirmCardPayment(clientSecret);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.paymentIntent;
}