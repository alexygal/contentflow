import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Menu, Search, Settings, User, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from '../components/ui';

const BREADCRUMBS: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/create': 'Create Content',
  '/dashboard/operations': 'Operations',
  '/dashboard/partnerships': 'Partnerships',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/approvals': 'Approvals',
  '/dashboard/settings': 'Settings',
  '/dashboard/profile': 'Edit Profile',
  '/admin': 'Admin Panel',
};

export default function DashboardLayout() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const breadcrumb = BREADCRUMBS[location.pathname] ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full">
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
          <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md px-4 sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span className="text-slate-600">Dashboard</span>
            {breadcrumb !== 'Overview' && (
              <>
                <span className="text-slate-700">/</span>
                <span className="text-slate-300 font-medium">{breadcrumb}</span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-xl bg-white/5 border border-white/8 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors">
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search...</span>
              <kbd className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-xs text-slate-500">⌘K</kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative h-8 w-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-[#1E293B] border border-white/10 shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/8">
                    <p className="text-sm font-semibold text-white">Notifications</p>
                  </div>
                  {[
                    { text: '2 videos ready for review', time: '5m ago', dot: 'bg-blue-400' },
                    { text: 'New partnership opportunity', time: '1h ago', dot: 'bg-green-400' },
                    { text: 'Your Growth plan renews tomorrow', time: '2h ago', dot: 'bg-yellow-400' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                      <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-sm text-slate-200">{n.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full px-4 py-2.5 text-xs text-blue-400 hover:text-blue-300 text-center transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </div>

            {/* User avatar + dropdown */}
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(v => !v)}
                className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-500 transition-colors"
              >
                {user?.name.split(' ').map(n => n[0]).join('') ?? 'U'}
              </button>
              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#1E293B] border border-white/10 shadow-2xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/8">
                      <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/dashboard/profile'); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <User className="h-4 w-4" />Edit Profile
                    </button>
                    <button
                      onClick={() => { setAvatarOpen(false); navigate('/dashboard/settings'); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Settings className="h-4 w-4" />Settings
                    </button>
                    <div className="border-t border-white/8">
                      <button
                        onClick={() => { setAvatarOpen(false); logout(); navigate('/'); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
