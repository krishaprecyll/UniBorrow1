
import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, LayoutDashboard, UserCircle, LogOut, PackagePlus, ShieldCheck } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import Marketplace from './components/Marketplace';
import LenderForm from './components/LenderForm';
import AuthPage from './components/AuthPage';
import { User, Role } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'marketplace' | 'admin' | 'lend'>('marketplace');

  // Handle auto-redirection on login based on role
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('marketplace');
      }
    }
  }, [currentUser]);

  // Robust RBAC: If a non-admin tries to switch to admin view, force them back
  const handleViewChange = useCallback((view: 'marketplace' | 'admin' | 'lend') => {
    if (view === 'admin' && currentUser?.role !== 'admin') {
      setCurrentView('marketplace');
      return;
    }
    setCurrentView(view);
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('marketplace');
  };

  if (!currentUser) {
    return <AuthPage onLogin={setCurrentUser} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'admin':
        // Double check role during render
        return currentUser.role === 'admin' ? <AdminDashboard /> : <Marketplace />;
      case 'lend':
        return <LenderForm onComplete={() => setCurrentView('marketplace')} />;
      case 'marketplace':
      default:
        return <Marketplace />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar / Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center cursor-pointer group" 
                onClick={() => handleViewChange(currentUser.role === 'admin' ? 'admin' : 'marketplace')}
              >
                <div className="bg-blue-600 p-1.5 rounded-xl mr-2 group-hover:rotate-12 transition-transform">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight">UniBorrow</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {currentUser.role !== 'admin' && (
                  <>
                    <button
                      onClick={() => handleViewChange('marketplace')}
                      className={`${
                        currentView === 'marketplace'
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors`}
                    >
                      Marketplace
                    </button>
                    <button
                      onClick={() => handleViewChange('lend')}
                      className={`${
                        currentView === 'lend'
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors`}
                    >
                      <PackagePlus className="h-4 w-4 mr-1" />
                      Lend Gear
                    </button>
                  </>
                )}
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleViewChange('admin')}
                    className={`${
                      currentView === 'admin'
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors`}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Dashboard
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end mr-3">
                <span className="flex items-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  {currentUser.role === 'admin' ? (
                    <>
                      <ShieldCheck className="h-3 w-3 mr-1 text-blue-600" />
                      Administrative
                    </>
                  ) : 'Student Verified'}
                </span>
                <span className="text-sm font-black text-gray-900">{currentUser.full_name}</span>
              </div>
              <div className="relative group">
                <div className="bg-gray-50 p-2 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
                  <UserCircle className="h-6 w-6 text-gray-600" />
                </div>
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] transform group-hover:translate-y-0 translate-y-2">
                  <div className="p-6 bg-gray-50/50 rounded-t-3xl border-b border-gray-100">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">User Context</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{currentUser.email}</p>
                    <p className="text-xs font-medium text-gray-500 mt-1">ID: {currentUser.university_id}</p>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-4 text-sm text-red-600 font-black hover:bg-red-50 rounded-2xl transition-colors group/btn"
                    >
                      <span>Terminate Session</span>
                      <LogOut className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderView()}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4 opacity-50">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-black tracking-tighter text-xl text-gray-900">UniBorrow</span>
          </div>
          <p className="text-gray-400 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Campus P2P Network. Operational across 15+ University Campuses.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
