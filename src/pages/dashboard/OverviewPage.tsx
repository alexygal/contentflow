import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart2, Briefcase, CheckSquare, Clock,
  PenLine, Play, Star, TrendingUp, Video, Zap,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard, GradientButton, StatCard, StatusPill } from '../../components/ui';

const RECENT_CONTENT = [
  { title: 'How I Built a 6-Figure Creator Business', type: 'Script', platform: 'YouTube', status: 'approved', time: '2h ago' },
  { title: '10 AI Tools Every Creator Needs in 2025', type: 'Caption', platform: 'TikTok', status: 'pending', time: '4h ago' },
  { title: 'My Morning Routine for Maximum Productivity', type: 'Script', platform: 'YouTube', status: 'published', time: '1d ago' },
  { title: 'Brand Partnership Outreach — NovaTech', type: 'Email', platform: 'Email', status: 'approved', time: '1d ago' },
  { title: 'Weekend Vlog - NYC Edition', type: 'Caption', platform: 'Instagram', status: 'published', time: '2d ago' },
];

const SCHEDULED = [
  { title: 'Productivity Secrets of Top Creators', platform: 'YouTube', date: 'Today, 3:00 PM', icon: '▶' },
  { title: 'Tool Teardown: ContentFlow vs Descript', platform: 'TikTok', date: 'Tomorrow, 10:00 AM', icon: '📱' },
  { title: 'Q&A: Your AI Questions Answered', platform: 'Instagram', date: 'Apr 25, 2:00 PM', icon: '📸' },
];

const OPPORTUNITIES = [
  { brand: 'TechGadgets Pro', category: 'Software', value: '€1,200', fit: 96, color: 'bg-blue-600' },
  { brand: 'FocusFlow App', category: 'Productivity', value: '€800', fit: 91, color: 'bg-violet-600' },
  { brand: 'Creator Academy', category: 'Education', value: '€2,500', fit: 88, color: 'bg-pink-600' },
];

const QUICK_ACTIONS = [
  { label: 'Generate Script', icon: <PenLine className="h-5 w-5" />, to: '/dashboard/create', gradient: 'from-blue-600/30 to-blue-600/10' },
  { label: 'Upload Video', icon: <Video className="h-5 w-5" />, to: '/dashboard/operations', gradient: 'from-violet-600/30 to-violet-600/10' },
  { label: 'View Analytics', icon: <BarChart2 className="h-5 w-5" />, to: '/dashboard/analytics', gradient: 'from-pink-600/30 to-pink-600/10' },
  { label: 'Review Approvals', icon: <CheckSquare className="h-5 w-5" />, to: '/dashboard/approvals', gradient: 'from-emerald-600/30 to-emerald-600/10' },
];

export default function OverviewPage() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 lg:p-8 space-y-7 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-400 text-sm mt-0.5">Here's what's happening with your content today.</p>
        </div>
        <Link to="/dashboard/create">
          <GradientButton size="md">
            <Zap className="h-4 w-4" /> Quick Create
          </GradientButton>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Videos This Month" value="47" trend="+12 vs last month" trendUp icon={<Video className="h-4 w-4" />} />
        <StatCard label="Content Pieces" value="156" trend="+34 vs last month" trendUp icon={<PenLine className="h-4 w-4" />} />
        <StatCard label="Active Partnerships" value="12" trend="+3 this month" trendUp icon={<Briefcase className="h-4 w-4" />} />
        <StatCard label="Partnership Revenue" value="€8,450" trend="+€1,200 this month" trendUp icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((a) => (
            <Link key={a.label} to={a.to}>
              <div className={`rounded-2xl border border-white/8 bg-gradient-to-br ${a.gradient} p-5 hover:border-white/15 hover:scale-[1.02] transition-all duration-200 cursor-pointer group`}>
                <div className="text-white mb-3">{a.icon}</div>
                <p className="text-sm font-medium text-white">{a.label}</p>
                <ArrowRight className="h-4 w-4 text-slate-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent content */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Content</h2>
            <Link to="/dashboard/approvals" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all →</Link>
          </div>
          <GlassCard>
            <div className="divide-y divide-white/5">
              {RECENT_CONTENT.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
                  <div className="h-8 w-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                    {item.type === 'Script' ? <PenLine className="h-3.5 w-3.5 text-blue-400" /> :
                     item.type === 'Caption' ? <Play className="h-3.5 w-3.5 text-violet-400" /> :
                     <Star className="h-3.5 w-3.5 text-pink-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.type} · {item.platform} · {item.time}</p>
                  </div>
                  <StatusPill status={item.status} />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Scheduled */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white">Upcoming</h2>
              <Link to="/dashboard/operations" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Calendar →</Link>
            </div>
            <div className="space-y-2.5">
              {SCHEDULED.map((s, i) => (
                <GlassCard key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm text-white font-medium truncate">{s.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.platform}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="h-3 w-3 text-blue-400" />
                        <span className="text-xs text-blue-300">{s.date}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Partnership opportunities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white">Opportunities</h2>
              <Link to="/dashboard/partnerships" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all →</Link>
            </div>
            <div className="space-y-2.5">
              {OPPORTUNITIES.map((o, i) => (
                <GlassCard key={i} hover className="p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-lg ${o.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {o.brand.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{o.brand}</p>
                      <p className="text-xs text-slate-500">{o.category} · {o.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-400">{o.fit}%</p>
                      <p className="text-xs text-slate-600">fit</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade prompt for starter */}
      {user?.tier === 'starter' && (
        <GlassCard highlighted className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">Growth plan</p>
              <h3 className="text-white font-bold text-lg">Unlock 25 videos/month + all platforms</h3>
              <p className="text-slate-400 text-sm mt-1">You've used 4 of 5 video edits this month. Upgrade to never run out.</p>
            </div>
            <Link to="/pricing">
              <GradientButton size="md">Upgrade now <ArrowRight className="h-4 w-4" /></GradientButton>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
