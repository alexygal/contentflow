import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart2,
  Briefcase,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Home,
  LogOut,
  PenLine,
  Play,
  Settings,
  Shield,
  Users,
  Video,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  badge?: string;
}

const MAIN_ITEMS: NavItem[] = [
  { label: 'Overview',     to: '/dashboard',              icon: <Home className="h-4.5 w-4.5" /> },
  { label: 'Create',       to: '/dashboard/create',       icon: <PenLine className="h-4.5 w-4.5" /> },
  { label: 'Operations',   to: '/dashboard/operations',   icon: <Video className="h-4.5 w-4.5" /> },
  { label: 'Partnerships', to: '/dashboard/partnerships', icon: <Briefcase className="h-4.5 w-4.5" /> },
  { label: 'Analytics',    to: '/dashboard/analytics',    icon: <BarChart2 className="h-4.5 w-4.5" /> },
  { label: 'Approvals',    to: '/dashboard/approvals',    icon: <CheckSquare className="h-4.5 w-4.5" />, badge: '5' },
  { label: 'Team',         to: '/dashboard/team',         icon: <Users className="h-4.5 w-4.5" /> },
  { label: 'Settings',     to: '/dashboard/settings',     icon: <Settings className="h-4.5 w-4.5" /> },
];

export default function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const w = collapsed ? 'w-16' : 'w-60';

  if (mobile) {
    return (
      <div className="flex flex-col h-full bg-[#080E1A] border-r border-white/5 w-72">
        <SidebarContent items={MAIN_ITEMS} user={user} logout={handleLogout} onNavClick={onClose} collapsed={false} />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col h-full bg-[#080E1A] border-r border-white/5 transition-all duration-300 ${w} shrink-0`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full bg-[#1E293B] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
      <SidebarContent items={MAIN_ITEMS} user={user} logout={handleLogout} collapsed={collapsed} />
    </div>
  );
}

function SidebarContent({
  items,
  user,
  logout,
  collapsed,
  onNavClick,
}: {
  items: NavItem[];
  user: ReturnType<typeof useAuth>['user'];
  logout: () => void;
  collapsed: boolean;
  onNavClick?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
          <Play className="h-4 w-4 text-white fill-white" />
        </div>
        {!collapsed && <span className="font-bold text-white tracking-tight">ContentFlow</span>}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {!collapsed && <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">Main</p>}
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition-all duration-200 text-sm font-medium group ${
                collapsed ? 'justify-center px-3 py-3' : 'gap-3 px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-blue-600/15 text-blue-300 border-l-2 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-blue-600/30 text-blue-300 px-2 py-0.5 text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Admin link */}
        {user?.role === 'admin' && (
          <>
            {!collapsed && <p className="px-3 mt-4 mb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">Admin</p>}
            <NavLink
              to="/admin"
              onClick={onNavClick}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-200 text-sm font-medium ${
                  collapsed ? 'justify-center px-3 py-3' : 'gap-3 px-3 py-2.5'
                } ${isActive ? 'bg-pink-600/15 text-pink-300' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
              }
            >
              <Shield className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>Admin Panel</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* Bottom */}
      <div className={`border-t border-white/5 p-3 space-y-1`}>
        <button
          onClick={() => navigate('/help')}
          className={`w-full flex items-center rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${collapsed ? 'justify-center px-3 py-3' : 'gap-3 px-3 py-2.5'}`}
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Help & Support</span>}
        </button>
        <Link
          to="/"
          className={`flex items-center rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${collapsed ? 'justify-center px-3 py-3' : 'gap-3 px-3 py-2.5'}`}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Back to site</span>}
        </Link>
        <button
          onClick={logout}
          className={`w-full flex items-center rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-600/5 transition-colors ${collapsed ? 'justify-center px-3 py-3' : 'gap-3 px-3 py-2.5'}`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* User */}
        {user && !collapsed && (
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 border border-white/8 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user.tier} plan</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
