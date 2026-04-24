import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, CreditCard, Database, Mail, Search, Server, Shield, TrendingUp, Users } from 'lucide-react';
import { GlassCard, OutlineButton, StatCard, StatusPill, TabBar } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { api } from '../../utils/api';

const MOCK_USERS_DATA = [
  { id: 'usr_01', name: 'Alex Rivera', email: 'alex@contentflow.ai', tier: 'growth', status: 'active', joined: 'Jan 12, 2025', revenue: '€2,500' },
  { id: 'usr_02', name: 'Sofia Rodriguez', email: 'sofia@tiktok.com', tier: 'growth', status: 'active', joined: 'Feb 3, 2025', revenue: '€2,500' },
  { id: 'usr_03', name: 'Marcus Chen', email: 'marcus@youtube.com', tier: 'premium', status: 'active', joined: 'Nov 20, 2024', revenue: '€5,000' },
  { id: 'usr_04', name: 'James Mitchell', email: 'james@podcast.com', tier: 'starter', status: 'active', joined: 'Mar 1, 2025', revenue: '€500' },
  { id: 'usr_05', name: 'Aisha Okonkwo', email: 'aisha@fitness.com', tier: 'growth', status: 'active', joined: 'Mar 15, 2025', revenue: '€2,500' },
  { id: 'usr_06', name: 'Lucas Dubois', email: 'lucas@creative.fr', tier: 'starter', status: 'suspended', joined: 'Feb 28, 2025', revenue: '€500' },
  { id: 'usr_07', name: 'Emma Watson', email: 'emma@lifestyle.co', tier: 'growth', status: 'trial', joined: 'Apr 20, 2025', revenue: '€0' },
  { id: 'usr_08', name: 'Raj Patel', email: 'raj@agency.in', tier: 'premium', status: 'active', joined: 'Dec 5, 2024', revenue: '€5,000' },
];

const MOCK_HEALTH = [
  { name: 'API Server', status: 'operational', latency: '48ms', uptime: '99.98%', icon: <Server className="h-4 w-4" /> },
  { name: 'Database', status: 'operational', latency: '12ms', uptime: '99.99%', icon: <Database className="h-4 w-4" /> },
  { name: 'Email Service', status: 'operational', latency: '220ms', uptime: '99.95%', icon: <Mail className="h-4 w-4" /> },
  { name: 'AI Pipeline', status: 'degraded', latency: '2.1s', uptime: '98.2%', icon: <Activity className="h-4 w-4" /> },
  { name: 'Storage', status: 'operational', latency: '95ms', uptime: '99.97%', icon: <Database className="h-4 w-4" /> },
];

const MOCK_PAYMENTS = [
  { user: 'Marcus Chen', amount: '€5,000', date: 'Apr 1, 2025', plan: 'Premium', status: 'succeeded' },
  { user: 'Alex Rivera', amount: '€2,500', date: 'Apr 1, 2025', plan: 'Growth', status: 'succeeded' },
  { user: 'Raj Patel', amount: '€5,000', date: 'Apr 1, 2025', plan: 'Premium', status: 'succeeded' },
  { user: 'Sofia Rodriguez', amount: '€2,500', date: 'Apr 1, 2025', plan: 'Growth', status: 'succeeded' },
  { user: 'Lucas Dubois', amount: '€500', date: 'Mar 28, 2025', plan: 'Starter', status: 'failed' },
  { user: 'Aisha Okonkwo', amount: '€2,500', date: 'Mar 15, 2025', plan: 'Growth', status: 'succeeded' },
];

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'payments', label: 'Payments' },
  { id: 'health', label: 'System Health' },
];

const TIER_PILL: Record<string, string> = {
  starter: 'bg-slate-500/20 text-slate-400',
  growth: 'bg-blue-500/20 text-blue-400',
  premium: 'bg-violet-500/20 text-violet-400',
};

const STATUS_PILL: Record<string, string> = {
  operational: 'bg-green-500/20 text-green-400',
  degraded: 'bg-yellow-500/20 text-yellow-400',
  down: 'bg-red-500/20 text-red-400',
};

export default function AdminPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [usersData, setUsersData] = useState(MOCK_USERS_DATA);
  const [health, setHealth] = useState(MOCK_HEALTH);
  const [payments, setPayments] = useState(MOCK_PAYMENTS);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    Promise.all([
      api.get('/api/admin/users').catch(() => null),
      api.get('/api/admin/health').catch(() => null),
      api.get('/api/admin/payments').catch(() => null),
    ]).then(([users, hlth, pmts]) => {
      if (users) setUsersData(users as typeof MOCK_USERS_DATA);
      if (hlth) setHealth(hlth as typeof MOCK_HEALTH);
      if (pmts) setPayments(pmts as typeof MOCK_PAYMENTS);
    }).catch(() => {});
  }, [user?.role]);

  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  const filteredUsers = usersData.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
          <Shield className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-0.5">Platform management and system monitoring</p>
        </div>
      </div>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Users" value="1,247" trend="+48 this month" trendUp icon={<Users className="h-4 w-4" />} />
            <StatCard label="MRR" value="€124,500" trend="+€8,200 vs last month" trendUp icon={<TrendingUp className="h-4 w-4" />} />
            <StatCard label="Churn Rate" value="2.1%" trend="+0.3% vs last month" trendUp={false} icon={<Activity className="h-4 w-4" />} />
            <StatCard label="Support Tickets" value="47" sub="12 open, 35 resolved" icon={<Mail className="h-4 w-4" />} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Starter', count: 623, revenue: '€311,500', pct: 50, color: 'bg-slate-500' },
              { label: 'Growth', count: 498, revenue: '€1,245,000', pct: 40, color: 'bg-blue-500' },
              { label: 'Premium', count: 126, revenue: '€630,000', pct: 10, color: 'bg-violet-500' },
            ].map(t => (
              <GlassCard key={t.label} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-300">{t.label} plan</span>
                  <span className="text-xs text-slate-500">{t.pct}% of users</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{t.count}</p>
                <p className="text-xs text-slate-500 mb-3">{t.revenue} ARR</p>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <GlassCard className="p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />Recent Alerts
              </h3>
              <div className="space-y-3">
                {[
                  { msg: 'AI pipeline latency spike (+40%)', time: '15 min ago', sev: 'warning' },
                  { msg: 'Payment failed: Lucas Dubois (€500)', time: '2d ago', sev: 'error' },
                  { msg: 'Storage usage at 78% capacity', time: '3d ago', sev: 'warning' },
                  { msg: 'New record: 2,400 videos processed in one day', time: '1w ago', sev: 'info' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${a.sev === 'error' ? 'bg-red-400' : a.sev === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                    <div>
                      <p className="text-sm text-slate-200">{a.msg}</p>
                      <p className="text-xs text-slate-500">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  'Impersonate user', 'Send announcement', 'Export user CSV', 'View error logs',
                  'Clear cache', 'Run DB backup', 'Manage plans', 'Feature flags',
                ].map((a) => (
                  <button key={a} className="rounded-xl bg-white/5 border border-white/8 px-3 py-2.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all text-left">
                    {a}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-xl border border-slate-600 bg-[#1e293b] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <span className="text-xs text-slate-500">{filteredUsers.length} users</span>
          </div>
          <GlassCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {['User', 'Plan', 'Status', 'Joined', 'Revenue', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{u.name}</p>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${TIER_PILL[u.tier]}`}>{u.tier}</span>
                      </td>
                      <td className="px-5 py-3.5"><StatusPill status={u.status} /></td>
                      <td className="px-5 py-3.5 text-sm text-slate-400">{u.joined}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-white">{u.revenue}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <OutlineButton size="sm">View</OutlineButton>
                          <OutlineButton size="sm" danger>Suspend</OutlineButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'payments' && (
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {['User', 'Amount', 'Plan', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-white">{p.user}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-white">{p.amount}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{p.plan}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{p.date}</td>
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${p.status === 'succeeded' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {p.status === 'succeeded' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {p.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {tab === 'health' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {health.map(h => (
              <GlassCard key={h.name} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    {h.icon}
                    <span className="font-medium text-sm">{h.name}</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_PILL[h.status]}`}>{h.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Latency</p>
                    <p className="text-sm font-semibold text-white">{h.latency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Uptime (30d)</p>
                    <p className={`text-sm font-semibold ${parseFloat(h.uptime) > 99.5 ? 'text-green-400' : 'text-yellow-400'}`}>{h.uptime}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4" />Resource Usage</h3>
            <div className="space-y-4">
              {[
                { label: 'Storage', used: 78, total: '12TB / 16TB', color: 'bg-orange-500' },
                { label: 'API requests (today)', used: 62, total: '620K / 1M', color: 'bg-blue-500' },
                { label: 'AI compute hours', used: 45, total: '450 / 1,000 hrs', color: 'bg-violet-500' },
                { label: 'Active sessions', used: 23, total: '230 / 1,000', color: 'bg-emerald-500' },
              ].map(r => (
                <div key={r.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{r.label}</span>
                    <span className="text-xs text-slate-500">{r.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className={`h-full rounded-full transition-all ${r.color}`} style={{ width: `${r.used}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
