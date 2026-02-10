
import React, { useState } from 'react';
// Added ShieldAlert to the lucide-react imports
import { Camera, MapPin, DollarSign, Clock, Info, ShieldAlert } from 'lucide-react';
import { MOCK_SAFE_ZONES } from '../mockData';

interface LenderFormProps {
  onComplete: () => void;
}

const LenderForm: React.FC<LenderFormProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    condition: 'Good',
    rental_fee: '',
    duration: '3',
    deposit: '',
    safeZone: MOCK_SAFE_ZONES[0].id,
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 p-8 text-white">
          <h1 className="text-2xl font-bold">Lend Your Gear</h1>
          <p className="text-gray-400 text-sm mt-1">Help a fellow student and earn some credits.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Item Title</label>
              <input
                required
                type="text"
                placeholder="e.g., TI-84 Plus Graphing Calculator"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={3}
                placeholder="Tell others about the condition and features..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Electronics</option>
                <option>Academic</option>
                <option>Sports</option>
                <option>Appliances</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Condition</label>
              <select 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.condition}
                onChange={e => setFormData({...formData, condition: e.target.value})}
              >
                <option>New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price per Day</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₱</span>
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.rental_fee}
                  onChange={e => setFormData({...formData, rental_fee: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Refundable Deposit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">₱</span>
                <input
                  required
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.deposit}
                  onChange={e => setFormData({...formData, deposit: e.target.value})}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Safe Zone (Handover Location)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  value={formData.safeZone}
                  onChange={e => setFormData({...formData, safeZone: e.target.value})}
                >
                  {MOCK_SAFE_ZONES.map(sz => (
                    <option key={sz.id} value={sz.id}>{sz.name}</option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 flex items-center">
                <Info className="h-3 w-3 mr-1" /> All transactions must take place in an official Safe Zone for insurance coverage.
              </p>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  required
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200'
              }`}
            >
              {loading ? 'Processing...' : 'List Item for Rent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LenderForm;
