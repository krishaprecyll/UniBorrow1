
import { User, Item, SafeZone, Transaction, TrustSafety, Analytics, Rental } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', university_id: 'UNI123', email: 'admin@gmail.com', full_name: 'System Admin', role: 'admin', phone: '555-0101', verified: true, created_at: '2023-01-01' },
  { id: 'u2', university_id: 'STU456', email: 'jane@uni.edu', full_name: 'Jane Smith', role: 'user', phone: '555-0102', verified: true, created_at: '2023-05-10' },
  { id: 'u3', university_id: 'STU789', email: 'mike@uni.edu', full_name: 'Mike Johnson', role: 'user', phone: '555-0103', verified: false, created_at: '2023-06-15' },
];

export const MOCK_SAFE_ZONES: SafeZone[] = [
  { id: 'sz1', name: 'Main Library Lobby', location_description: 'Near the circulation desk, 1st floor', latitude: 40.7128, longitude: -74.0060, active: true },
  { id: 'sz2', name: 'Student Union Hub', location_description: 'Central seating area, next to Starbucks', latitude: 40.7130, longitude: -74.0065, active: true },
  { id: 'sz3', name: 'North Campus Gym', location_description: 'Information desk at the entrance', latitude: 40.7140, longitude: -74.0070, active: true },
];

export const MOCK_ITEMS: Item[] = [
  { id: 'i1', name: 'Canon DSLR Camera', description: 'EOS 80D with 18-135mm lens. Perfect for photography projects.', category: 'Electronics', image_url: 'https://picsum.photos/seed/camera/400/300', condition: 'Like New', available: true, rental_fee: 15.00, rental_duration_days: 3, deposit_amount: 50.00, owner_id: 'u2', safe_zone_id: 'sz1', created_at: '2023-10-01' },
  { id: 'i2', name: 'CalculatX 3000', description: 'Advanced graphing calculator for engineering students.', category: 'Academic', image_url: 'https://picsum.photos/seed/calc/400/300', condition: 'Good', available: true, rental_fee: 5.00, rental_duration_days: 7, deposit_amount: 20.00, owner_id: 'u3', safe_zone_id: 'sz2', created_at: '2023-10-02' },
  { id: 'i3', name: 'Mountain Bike', description: 'Sturdy mountain bike, 21-speed. Great for weekend trips.', category: 'Sports', image_url: 'https://picsum.photos/seed/bike/400/300', condition: 'Fair', available: true, rental_fee: 10.00, rental_duration_days: 2, deposit_amount: 40.00, owner_id: 'u2', safe_zone_id: 'sz3', created_at: '2023-10-03' },
  { id: 'i4', name: 'Mini Fridge', description: 'Compact fridge for dorm rooms. 1.7 cu. ft.', category: 'Appliances', image_url: 'https://picsum.photos/seed/fridge/400/300', condition: 'Good', available: true, rental_fee: 8.00, rental_duration_days: 30, deposit_amount: 30.00, owner_id: 'u2', safe_zone_id: 'sz2', created_at: '2023-10-04' },
];

export const MOCK_RENTALS: Rental[] = [
  { id: 'r1', delivery_id: 'd1', item_id: 'i1', start_date: '2023-08-05', end_date: '2023-08-08', status: 'completed', rentee_id: 'u3', created_at: '2023-08-01' },
  { id: 'r2', delivery_id: 'd2', item_id: 'i2', start_date: '2023-08-15', end_date: '2023-08-22', status: 'completed', rentee_id: 'u2', created_at: '2023-08-10' },
  { id: 'r3', delivery_id: 'd3', item_id: 'i1', start_date: '2023-09-02', end_date: '2023-09-05', status: 'completed', rentee_id: 'u3', created_at: '2023-09-01' },
  { id: 'r4', delivery_id: 'd4', item_id: 'i3', start_date: '2023-09-10', end_date: '2023-09-12', status: 'completed', rentee_id: 'u2', created_at: '2023-09-05' },
  { id: 'r5', delivery_id: 'd5', item_id: 'i1', start_date: '2023-10-05', end_date: '2023-10-08', status: 'active', rentee_id: 'u3', created_at: '2023-10-01' },
  { id: 'r6', delivery_id: 'd6', item_id: 'i2', start_date: '2023-10-12', end_date: '2023-10-19', status: 'active', rentee_id: 'u2', created_at: '2023-10-10' },
  { id: 'r7', delivery_id: 'd7', item_id: 'i3', start_date: '2023-10-20', end_date: '2023-10-22', status: 'pending', rentee_id: 'u3', created_at: '2023-10-15' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', rental_id: 'r1', payer_id: 'u3', payee_id: 'u2', amount: 45.00, transaction_type: 'rental_fee', payment_method: 'university_credits', status: 'success', created_at: '2023-08-01T10:00:00Z' },
  { id: 't2', rental_id: 'r2', payer_id: 'u2', payee_id: 'u3', amount: 35.00, transaction_type: 'rental_fee', payment_method: 'card', status: 'success', created_at: '2023-08-10T14:30:00Z' },
  { id: 't3', rental_id: 'r3', payer_id: 'u3', payee_id: 'u2', amount: 45.00, transaction_type: 'rental_fee', payment_method: 'university_credits', status: 'success', created_at: '2023-09-01T09:00:00Z' },
  { id: 't4', rental_id: 'r4', payer_id: 'u2', payee_id: 'u3', amount: 20.00, transaction_type: 'rental_fee', payment_method: 'wallet', status: 'success', created_at: '2023-09-05T11:00:00Z' },
  { id: 't5', rental_id: 'r5', payer_id: 'u3', payee_id: 'u2', amount: 45.00, transaction_type: 'rental_fee', payment_method: 'university_credits', status: 'pending', created_at: '2023-10-01T10:00:00Z' },
];

export const MOCK_TRUST_SAFETY: TrustSafety[] = [
  { id: 'ts1', user_id: 'u3', rating: 2.1, report_count: 5, last_reported_at: '2023-10-24T08:00:00Z', notes: 'Item returned late multiple times. Damaged a calculator.' },
  { id: 'ts2', user_id: 'u2', rating: 4.8, report_count: 0 },
  { id: 'ts3', user_id: 'u1', rating: 5.0, report_count: 0 },
];

export const MOCK_ANALYTICS: Analytics[] = [
  { id: 'a1', metric_name: 'Total Revenue', metric_value: 8450, recorded_at: new Date().toISOString() },
  { id: 'a2', metric_name: 'Active Rentals', metric_value: 12, recorded_at: new Date().toISOString() },
  { id: 'a3', metric_name: 'System Health', metric_value: 99.9, recorded_at: new Date().toISOString() },
];
