export type UserRole = 'user' | 'motoservice';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  phone_number?: string;
  full_name: string;
  document_url?: string;
  verified?: boolean;
  created_at: string;
}

export interface MotoService {
  id: string;
  user_id: string;
  name: string;
  description: string;
  avatar_url: string;
  rating: number;
  status: 'available' | 'busy';
  online_status: boolean;
  hourly_rate: number;
  reviews_count: number;
}

export interface Order {
  id: string;
  user_id: string;
  motoservice_id: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed';
  pickup_location: string;
  dropoff_location: string;
  amount: number;
  created_at: string;
  completed_at?: string;
}

export interface Review {
  id: string;
  order_id: string;
  user_id: string;
  motoservice_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'payment_request';
  amount?: number;
  created_at: string;
}