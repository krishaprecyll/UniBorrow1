
import React, { useState } from 'react';
import { Search, MapPin, Star, Calendar, ArrowRight, CheckCircle2, Filter } from 'lucide-react';
import { MOCK_ITEMS, MOCK_SAFE_ZONES } from '../mockData';
import { Item } from '../types';

const CATEGORIES = ["All", "Electronics", "Academic", "Sports", "Appliances", "Other"];

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [rentalComplete, setRentalComplete] = useState(false);

  const filteredItems = MOCK_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRent = (item: Item) => {
    setSelectedItem(item);
  };

  const confirmRental = () => {
    // In a real app, this would hit the API
    setRentalComplete(true);
    setTimeout(() => {
      setRentalComplete(false);
      setSelectedItem(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Campus Marketplace</h1>
          <p className="text-gray-500">Rent high-quality items from your peers at Uni.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for cameras, bikes, books..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center text-gray-500 mr-2">
          <Filter className="h-4 w-4 mr-1" />
          <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? filteredItems.map((item) => {
          const safeZone = MOCK_SAFE_ZONES.find(sz => sz.id === item.safe_zone_id);
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm border border-white/50">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <div className="flex items-center text-amber-500 shrink-0">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs font-bold ml-1">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 h-10">{item.description}</p>
                <div className="flex items-center text-xs text-gray-400 space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{safeZone?.name}</span>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-gray-50">
                  <div>
                    <span className="text-lg font-black text-blue-600">₱{item.rental_fee.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 ml-1">/day</span>
                  </div>
                  <button 
                    onClick={() => handleRent(item)}
                    className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No items found</h3>
            <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>

      {/* Rental Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {rentalComplete ? (
              <div className="p-10 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Rental Requested!</h2>
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-600 font-medium mb-1">Your verification code</p>
                  <span className="text-2xl font-mono font-black text-blue-700 tracking-wider">UB-{Math.floor(Math.random() * 9000) + 1000}</span>
                </div>
                <p className="text-sm text-gray-500 px-6">Please meet the owner at <strong>{MOCK_SAFE_ZONES.find(sz => sz.id === selectedItem.safe_zone_id)?.name}</strong> for handover.</p>
              </div>
            ) : (
              <>
                <div className="relative h-48">
                  <img src={selectedItem.image_url} alt="" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 bg-white/50 backdrop-blur text-gray-900 h-8 w-8 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md tracking-wider">
                        {selectedItem.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                    <p className="text-sm text-gray-500">Condition: <span className="font-semibold text-gray-700">{selectedItem.condition}</span></p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Rental Duration</span>
                      <span className="font-semibold text-gray-900">{selectedItem.rental_duration_days} Days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Rental Fee</span>
                      <span className="font-semibold text-gray-900">₱{selectedItem.rental_fee.toFixed(2)} / day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Refundable Deposit</span>
                      <span className="font-semibold text-gray-900">₱{selectedItem.deposit_amount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-xl">
                      <span className="text-gray-900">Total Due</span>
                      <span className="text-blue-600">₱{(selectedItem.rental_fee * selectedItem.rental_duration_days + selectedItem.deposit_amount).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-sm text-gray-600 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                    <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-800">Meeting Point</p>
                      <p className="text-amber-700 text-xs">{MOCK_SAFE_ZONES.find(sz => sz.id === selectedItem.safe_zone_id)?.name}</p>
                    </div>
                  </div>

                  <button 
                    onClick={confirmRental}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                  >
                    Confirm & Proceed to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
