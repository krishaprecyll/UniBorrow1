
import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Activity, 
  ShieldAlert, 
  FileText, 
  Package, 
  Users, 
  EyeOff, 
  Eye,
  Trash2
} from 'lucide-react';
import { 
  MOCK_ANALYTICS, 
  MOCK_TRUST_SAFETY, 
  MOCK_USERS, 
  MOCK_TRANSACTIONS,
  MOCK_RENTALS,
  MOCK_ITEMS
} from '../mockData';
import { Item } from '../types';

const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [activeTab, setActiveTab] = useState<'analytics' | 'safety' | 'items' | 'transactions'>('analytics');

  // Logic: Safety Watch (report_count > 3)
  const highRiskUsers = useMemo(() => 
    MOCK_TRUST_SAFETY
      .filter(ts => ts.report_count > 3)
      .map(ts => ({
        ...ts,
        user: MOCK_USERS.find(u => u.id === ts.user_id)
      }))
  , []);

  // Logic: Monthly Rental Volume Chart Data
  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const volume: Record<string, number> = {};
    
    months.forEach(m => volume[m] = 0);
    
    MOCK_RENTALS.forEach(rental => {
      const date = new Date(rental.created_at);
      const monthName = months[date.getMonth()];
      volume[monthName] += 1;
    });

    return months.map(month => ({
      name: month,
      rentals: volume[month]
    }));
  }, []);

  // Logic: Item Management
  const toggleItemStatus = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Administration</h1>
          <p className="text-gray-500">Global oversight of UniBorrow operations.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
          {(['analytics', 'safety', 'items', 'transactions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ANALYTICS.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${
                  stat.metric_name === 'System Health' ? 'bg-green-50 text-green-600' : 
                  stat.metric_name === 'Active Rentals' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {stat.metric_name === 'System Health' ? <CheckCircle className="h-6 w-6" /> : 
                   stat.metric_name === 'Active Rentals' ? <Activity className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.metric_name}</p>
                  <h3 className="text-2xl font-black text-gray-900">
                    {stat.metric_name === 'Total Revenue' ? `₱${stat.metric_value.toLocaleString()}` : 
                     stat.metric_name === 'System Health' ? `${stat.metric_value}%` : stat.metric_value.toLocaleString()}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Rental Volume Visual */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Monthly Rental Volume</span>
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 600}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Bar 
                    dataKey="rentals" 
                    fill="#3b82f6" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'safety' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-red-50/30">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900">Safety Watchlist</h2>
            </div>
            <span className="text-xs font-black text-red-600 bg-red-100 px-3 py-1 rounded-full uppercase tracking-widest">
              Critical Risk: {highRiskUsers.length} Users
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Rating</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Reports</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Last Issue</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {highRiskUsers.map(record => (
                  <tr key={record.id} className="hover:bg-red-50/10 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500">
                          {record.user?.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{record.user?.full_name}</p>
                          <p className="text-xs text-gray-400">{record.user?.university_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-1 text-amber-500">
                        <StarIcon className="h-4 w-4 fill-current" />
                        <span className="font-bold">{record.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-md font-black text-sm">
                        {record.report_count}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs text-gray-500 italic max-w-xs truncate">{record.notes || 'No notes provided'}</p>
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button className="text-xs font-bold text-blue-600 hover:underline">Warn User</button>
                      <button className="text-xs font-bold text-red-600 hover:underline">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'items' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Item Inventory</h2>
            </div>
            <span className="text-xs font-bold text-gray-400">{items.length} Total Items</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Item</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Owner</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map(item => {
                  const owner = MOCK_USERS.find(u => u.id === item.owner_id);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <img src={item.image_url} className="h-10 w-10 rounded-lg object-cover" alt="" />
                          <p className="font-bold text-gray-900">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-medium text-gray-700">{owner?.full_name}</p>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-500">{item.category}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.available ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => toggleItemStatus(item.id)}
                          className={`p-2 rounded-xl transition-all ${
                            item.available ? 'text-amber-500 hover:bg-amber-50' : 'text-green-500 hover:bg-green-50'
                          }`}
                          title={item.available ? "Deactivate Item" : "Activate Item"}
                        >
                          {item.available ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl ml-2">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center space-x-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Method</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-indigo-50/5">
                    <td className="px-8 py-5 text-sm font-mono text-gray-400">#{tx.id}</td>
                    <td className="px-8 py-5 text-sm font-black text-gray-900">₱{tx.amount.toFixed(2)}</td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-gray-500 capitalize">{tx.transaction_type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-8 py-5 text-xs text-gray-500 capitalize">{tx.payment_method.replace('_', ' ')}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        tx.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for Star
const StarIcon = ({ className, fill }: { className?: string, fill?: string }) => (
  <svg className={className} fill={fill || 'currentColor'} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default AdminDashboard;
