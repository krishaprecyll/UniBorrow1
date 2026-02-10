
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  university_id: string;
  email: string;
  full_name: string;
  role: Role;
  phone: string;
  verified: boolean;
  created_at: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  available: boolean;
  rental_fee: number;
  rental_duration_days: number;
  deposit_amount: number;
  owner_id: string;
  safe_zone_id: string;
  created_at: string;
}

export interface Rental {
  id: string;
  delivery_id: string;
  item_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  rentee_id: string;
  created_at: string;
}

export interface Delivery {
  id: string;
  safe_zone_id: string;
  scheduled_time: string;
  delivered_at?: string;
  status: 'scheduled' | 'in_transit' | 'delivered';
  verification_code: string;
  rental_id: string;
}

export interface Transaction {
  id: string;
  rental_id: string;
  payer_id: string;
  payee_id: string;
  amount: number;
  transaction_type: 'rental_fee' | 'deposit' | 'refund';
  payment_method: 'university_credits' | 'card' | 'wallet';
  status: 'pending' | 'success' | 'failed';
  created_at: string;
}

export interface SafeZone {
  id: string;
  name: string;
  location_description: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export interface TrustSafety {
  id: string;
  user_id: string;
  rating: number;
  report_count: number;
  last_reported_at?: string;
  notes?: string;
}

export interface Analytics {
  id: string;
  metric_name: string;
  metric_value: number;
  recorded_at: string;
}
