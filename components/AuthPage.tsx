
import React, { useState } from 'react';
import { ShoppingBag, Mail, Lock, User as UserIcon, GraduationCap, ArrowRight } from 'lucide-react';
import { MOCK_USERS } from '../mockData';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [uniId, setUniId] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Find the user by email
      const user = MOCK_USERS.find(u => u.email === email);
      
      // Validation Logic for Mock Login
      const isValidAdmin = email === 'admin@gmail.com' && password === 'admin123';
      const isValidUser = user && (password === 'password' || password === 'user123'); // Support basic mock passwords for other accounts

      if (isValidAdmin) {
        const adminUser = MOCK_USERS.find(u => u.role === 'admin')!;
        onLogin(adminUser);
      } else if (isValidUser && user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. For Admin, use admin@gmail.com with admin123.');
      }
    } else {
      // Mock registration
      const newUser: User = {
        id: 'u' + (MOCK_USERS.length + 1),
        university_id: uniId,
        email: email,
        full_name: fullName,
        role: 'user',
        phone: '555-0000',
        verified: true,
        created_at: new Date().toISOString(),
      };
      onLogin(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">UniBorrow</h1>
          <p className="text-blue-100 mt-2">Campus P2P Rental Marketplace</p>
        </div>

        <div className="p-8">
          <div className="flex mb-8 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                !isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">University ID</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      required
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="STU-2024-XXXX"
                      value={uniId}
                      onChange={(e) => setUniId(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">University Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2"
            >
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              By using UniBorrow, you agree to our <span className="text-blue-600 font-bold hover:underline cursor-pointer">Safety Guidelines</span> and <span className="text-blue-600 font-bold hover:underline cursor-pointer">Honor Code</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
