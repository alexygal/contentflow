import React, { useEffect, useState } from 'react';
import { BarChart2, Clock, Eye, Heart, Sparkles, TrendingUp } from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { GlassCard, OutlineButton, StatCard } from '../../components/ui';
import { api } from '../../utils/api';

const MOCK_VIEWS_DATA = [
  { date: 'Apr 1', views: 38000 }, { date: 'Apr 3', views: 52000 }, { date: 'Apr 5', views: 45000 },
  { date: 'Apr 7', views: 67000 }, { date: 'Apr 9', views: 58000 }, { date: 'Apr 11', views: 72000 },
  { date: 'Apr 13', views: 89000 }, { date: 'Apr 15', views: 95000 }, { date: 'Apr 17', views: 110000 },
  { date: 'Apr 19', views: 98000 }, { date: 'Apr 21', views: 125000 }, { date: 'Apr 23', views: 134000 },
];

const MOCK_PLATFORM_DATA = [
  { platform: 'YouTube', views: 680000, engagement: 4.2, revenue: 5200 },
  { platform: 'TikTok', views: 380000, engagement: 7.8, revenue: 1800 },
  { platform: 'Instagram', views: 140000, engagement: 6.1, revenue: 950 },
  { platform: 'LinkedIn', views: 28000, engagement: 5.3, revenue: 500 },
];

const MOCK_PIE_DATA = [
  { name: 'YouTube', value: 56, fill: '#ef4444' },
  { name: 'TikTok', value: 26, fill: '#ec4899' },
  { name: 'Instagram', value: 13, fill: '#8b5cf6' },
  { name: 'LinkedIn', value: 5, fill: '#3b82f6' },
];

const MOCK_TOP_CONTENT = [
  { title: 'How I Built a 6-Figure Creator Business', platform: 'YouTube', views: '285K', engagement: '8.2%', revenue: '€1,240', growth: '+124%' },
  { title: '10 AI Tools Every Creator Needs in 2025', platform: 'TikTok', views: '187K', engagement: '9.4%', revenue: '€340', growth: '+89%' },
  { title: 'Morning Routine Revealed', platform: 'Instagram', views: '94K', engagement: '6.8%', revenue: '€210', growth: '+45%' },
  { title: 'Creator Burnout: My Story', platform: 'YouTube', views: '76K', engagement: '11.2%', revenue: '€890', growth: '+67%' },
  { title: 'Tool Teardown: ContentFlow vs Descript', platform: 'YouTube', views: '62K', engagement: '7.1%', revenue: '€680', growth: '+32%' },
];

const MOCK_INSIGHTS = [
  { icon: '🔥', insight: 'Your "How I Built" series gets 3.4× higher retention than your other content. Consider making it a weekly format.' },
  { icon: '⚡', insight: 'TikTok engagement is 86% higher than YouTube for you. You may be under-investing in short-form content.' },
  { icon: '💡', insight: 'Videos posted Tuesday 9AM–11AM get 42% more views in the first 24 hours.' },
  { icon: '📈', insight: 'Partnership revenue is up 89% this month. Your audience responds especially well to SaaS tool integrations.' },
];

const CHART_TOOLTIP_STYLE = {
  backgroundColor: '#1E293B',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f1f5f9',
  fontSize: '12px',
};

export default function AnalyticsPage() {
  const [range, setRange] = useState('30d');
  const ranges = ['7d', '30d', '90d', 'All time'];

  const [viewsData, setViewsData] = useState(MOCK_VIEWS_DATA);
  const [platformData, setPlatformData] = useState(MOCK_PLATFORM_DATA);
  const [pieData, setPieData] = useState(MOCK_PIE_DATA);
  const [topContent, setTopContent] = useState(MOCK_TOP_CONTENT);
  const [insights, setInsights] = useState(MOCK_INSIGHTS);

  useEffect(() => {
    const params = `?range=${range}`;
    api.get<typeof MOCK_VIEWS_DATA>(`/api/analytics/views${params}`).then(setViewsData).catch(() => {});
    api.get<typeof MOCK_PLATFORM_DATA>(`/api/analytics/platforms${params}`).then(setPlatformData).catch(() => {});
    api.get<typeof MOCK_PIE_DATA>(`/api/analytics/split${params}`).then(setPieData).catch(() => {});
    api.get<typeof MOCK_TOP_CONTENT>(`/api/analytics/content${params}`).then(setTopContent).catch(() => {});
    api.get<typeof MOCK_INSIGHTS>(`/api/analytics/insights${params}`).then(setInsights).catch(() => {});
  }, [range]);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 text-sm mt-0.5">Cross-platform performance insights</p>
        </div>
        <div className="flex gap-1 rounded-xl bg-white/5 border border-white/8 p-1">
          {ranges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${range === r ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'text-slate-400 hover:text-white'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Views" value="1.23M" trend="+18% vs last month" trendUp icon={<Eye className="h-4 w-4" />} />
        <StatCard label="Avg. Engagement" value="4.8%" trend="+0.6% vs last month" trendUp icon={<Heart className="h-4 w-4" />} />
        <StatCard label="Watch Time" value="2.1M min" trend="+22% vs last month" trendUp icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Revenue" value="€8,450" trend="+€1,200 this month" trendUp icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Views over time */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Views Over Time</h3>
            <OutlineButton size="sm">Export</OutlineButton>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => [`${(v / 1000).toFixed(0)}K views`]} />
              <Area type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} fill="url(#viewsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Platform split */}
        <GlassCard className="p-6">
          <h3 className="font-semibold text-white mb-5">Platform Split</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.fill }} />
                <span className="text-xs text-slate-400 flex-1">{p.name}</span>
                <span className="text-xs font-semibold text-white">{p.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Platform breakdown chart */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-white mb-5">Platform Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={platformData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="platform" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Bar dataKey="views" fill="#2563EB" radius={[4, 4, 0, 0]} name="Views" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Top content */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Top Performing Content</h3>
          <OutlineButton size="sm">View all</OutlineButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                {['Title', 'Platform', 'Views', 'Engagement', 'Revenue', 'Growth'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topContent.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-sm text-white max-w-xs truncate">{c.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-400">{c.platform}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{c.views}</td>
                  <td className="px-4 py-3 text-sm text-blue-400">{c.engagement}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-400">{c.revenue}</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-400">{c.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* AI Insights */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-400" />AI Insights
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {insights.map((ins, i) => (
            <GlassCard key={i} className="p-4 flex items-start gap-3">
              <span className="text-xl shrink-0">{ins.icon}</span>
              <p className="text-sm text-slate-300 leading-relaxed">{ins.insight}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
