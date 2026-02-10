import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  CheckCircle, 
  Activity, 
  ShieldAlert, 
  FileText, 
  Package, 
  Users, 
  EyeOff, 
  Eye,
  Trash2,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { 
  MOCK_ANALYTICS, 
  MOCK_TRUST_SAFETY, 
  MOCK_USERS, 
  MOCK_TRANSACTIONS,
  MOCK_RENTALS,
  MOCK_ITEMS
} from '../mockData';
import { Item, User } from '../types';

const AdminDashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [activeTab, setActiveTab] = useState<'analytics' | 'safety' | 'items' | 'transactions' | 'approvals'>('analytics');

  // Logic: Filter pending users (unverified students)
  const pendingUsers = useMemo(() => 
    users.filter(u => !u.verified && u.role !== 'admin'), 
  [users]);

  // Logic: Safety Watch (report_count > 3)
  const highRiskUsers = useMemo(() => 
    MOCK_TRUST_SAFETY
      .filter(ts => ts.report_count > 3)
      .map(ts => ({
        ...ts,
        user: users.find(u => u.id === ts.user_id)
      }))
  , [users]);

  // Logic: Monthly Rental Volume Chart Data
  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const volume: Record<string, number> = {};
    months.forEach(m => volume[m] = 0);
    
    MOCK_RENTALS.forEach(rental => {
      const date = new Date(rental.created_at);
      volume[months[date.getMonth()]] += 1;
    });

    return months.map(month => ({ name: month, rentals: volume[month] }));
  }, []);

  // Actions
  const approveUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: true } : u));
    alert("Student verified successfully!");
  };

  const toggleItemStatus = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">UniBorrow Admin</h1>
          <p className="text-gray-500">Campus Rental Oversight & Verification</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          {(['analytics', 'approvals', 'safety', 'items', 'transactions'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'approvals' ? `Approvals (${pendingUsers.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ANALYTICS.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">{stat.metric_name}</p>
                  <h3 className="text-2xl font-black text-gray-900">
                    {stat.metric_name.includes('Revenue') ? `₱${stat.metric_value}` : stat.metric_value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100">
             <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-blue-600"/> Rental Trends</h2>
             <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="rentals" fill="#3b82f6" radius={[4, 4, 0, 0]}/></BarChart></ResponsiveContainer></div>
          </div>
        </div>
      )}

      {/* 2. USER APPROVALS TAB */}
      {activeTab === 'approvals' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="px-8 py-6 border-b flex justify-between items-center bg-orange-50/30">
            <h2 className="text-xl font-bold flex items-center gap-2"><UserCheck className="text-orange-600"/> Pending Student Verification</h2>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">{pendingUsers.length} Students Waiting</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                <tr>
                  <th className="px-8 py-4">Student Name</th>
                  <th className="px-8 py-4">University ID</th>
                  <th className="px
