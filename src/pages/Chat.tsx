import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../lib/i18n';
import { Button } from '../components/ui/Button';
import { Message, Order } from '../types';
import { formatCurrency, formatDate, calculateServiceFee } from '../lib/utils';
import { Send, DollarSign } from 'lucide-react';
import { processPayment } from '../lib/stripe';
import { LocationModal } from '../components/LocationModal';
import { RatingModal } from '../components/RatingModal';
import { useToast } from '../components/ui/Toaster';

export default function Chat() {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrder();
    fetchMessages();
    subscribeToMessages();
  }, [orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, motoservices(*)')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  function subscribeToMessages() {
    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const { error } = await supabase.from('messages').insert({
        order_id: orderId,
        sender_id: user.id,
        content: newMessage,
        type: 'text',
      });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async function sendPaymentRequest() {
    if (!order || !user) return;

    try {
      const { error } = await supabase.from('messages').insert({
        order_id: orderId,
        sender_id: user.id,
        content: `Payment request for ${formatCurrency(order.amount)}`,
        type: 'payment_request',
        amount: order.amount,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending payment request:', error);
    }
  }

  async function handlePayment(amount: number) {
    try {
      await processPayment(amount, orderId!);
      
      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({ status: 'in_progress' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Payment successful',
        description: 'Your payment has been processed',
        variant: 'success',
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'error',
      });
    }
  }

  async function handleLocationSubmit(pickup: string, dropoff: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          pickup_location: pickup,
          dropoff_location: dropoff,
        })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Location updated',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error updating location:', error);
      toast({
        title: 'Failed to update location',
        variant: 'error',
      });
    }
  }

  async function handleOrderComplete() {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (error) throw error;

      // Update service status to available
      await supabase
        .from('motoservices')
        .update({ status: 'available' })
        .eq('id', order?.motoservice_id);

      if (user?.id === order?.user_id) {
        setShowRatingModal(true);
      }

      toast({
        title: 'Order completed',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: 'Failed to complete order',
        variant: 'error',
      });
    }
  }

  async function handleRatingSubmit(rating: number, comment: string) {
    try {
      const { error } = await supabase.from('reviews').insert({
        order_id: orderId,
        user_id: user?.id,
        motoservice_id: order?.motoservice_id,
        rating,
        comment,
      });

      if (error) throw error;

      toast({
        title: 'Review submitted',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Failed to submit review',
        variant: 'error',
      });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-8rem)]">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">
              {t('chat_with', { name: order?.motoservices?.name || '' })}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender_id === user?.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'payment_request' ? (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2" />
                        <span>{t('payment_request')}</span>
                        {message.sender_id !== user?.id && (
                          <span className="ml-2 text-sm">
                            ({t('includes_fee', { fee: calculateServiceFee(message.amount || 0) })})
                          </span>
                        )}
                      </div>
                      <p className="font-semibold">
                        {formatCurrency(message.amount || 0)}
                      </p>
                      {message.sender_id !== user?.id && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => handlePayment(message.amount || 0)}
                        >
                          {t('pay_now')}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      message.sender_id === user?.id
                        ? 'text-indigo-200'
                        : 'text-gray-500'
                    }`}
                  >
                    {formatDate(message.created_at)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            {order?.status !== 'completed' && (
              <div className="mb-4 flex gap-2">
                {order?.status === 'pending' && user?.id === order?.user_id && (
                  <Button
                    variant="secondary"
                    onClick={() => setShowLocationModal(true)}
                    className="w-full"
                  >
                    {t('set_locations')}
                  </Button>
                )}
                {order?.status === 'in_progress' && (
                  <Button
                    onClick={handleOrderComplete}
                    className="w-full"
                  >
                    {t('mark_complete')}
                  </Button>
                )}
              </div>
            )}
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('type_message')}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="submit">
                <Send className="h-5 w-5" />
              </Button>
              {order?.motoservices?.user_id === user?.id && (
                <Button
                  variant="secondary"
                  onClick={sendPaymentRequest}
                >
                  <DollarSign className="h-5 w-5" />
                </Button>
              )}
            </form>
          </div>
        </div>
        <LocationModal
          isOpen={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onSubmit={handleLocationSubmit}
        />
        <RatingModal
          isOpen={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
      </div>
    </div>
  );
}