import React, { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, DollarSign, Mail, Plus, TrendingUp } from 'lucide-react';
import { GlassCard, GradientButton, OutlineButton, StatCard, StatusPill, TabBar } from '../../components/ui';
import { api } from '../../utils/api';

type Stage = 'identified' | 'contacted' | 'negotiating' | 'closed';

const MOCK_OPPORTUNITIES = [
  { brand: 'NovaTech Software', category: 'SaaS', fit: 96, value: '€1,200', audience: 'Tech-savvy creators', logo: 'NT', color: 'bg-blue-600' },
  { brand: 'FocusFlow App', category: 'Productivity', fit: 91, value: '€800', audience: 'Productivity creators', logo: 'FF', color: 'bg-violet-600' },
  { brand: 'Creator Academy', category: 'Education', fit: 88, value: '€2,500', audience: 'Aspiring creators', logo: 'CA', color: 'bg-pink-600' },
  { brand: 'StreamDeck Pro', category: 'Hardware', fit: 84, value: '€1,800', audience: 'Tech creators', logo: 'SD', color: 'bg-emerald-600' },
  { brand: 'AudioLab Studio', category: 'Audio', fit: 79, value: '€600', audience: 'Content creators', logo: 'AL', color: 'bg-orange-600' },
  { brand: 'ClipSync', category: 'Software', fit: 75, value: '€950', audience: 'Video creators', logo: 'CS', color: 'bg-cyan-600' },
];

const MOCK_PIPELINE: Record<Stage, { brand: string; value: string; color: string }[]> = {
  identified: [
    { brand: 'StreamDeck Pro', value: '€1,800', color: 'bg-emerald-600' },
    { brand: 'AudioLab Studio', value: '€600', color: 'bg-orange-600' },
    { brand: 'ClipSync', value: '€950', color: 'bg-cyan-600' },
  ],
  contacted: [
    { brand: 'NovaTech Software', value: '€1,200', color: 'bg-blue-600' },
    { brand: 'Creator Academy', value: '€2,500', color: 'bg-pink-600' },
  ],
  negotiating: [
    { brand: 'FocusFlow App', value: '€800', color: 'bg-violet-600' },
  ],
  closed: [
    { brand: 'TechGadgets Pro', value: '€1,500', color: 'bg-blue-700' },
    { brand: 'MindMap AI', value: '€900', color: 'bg-indigo-600' },
  ],
};

const STAGE_LABELS: Record<Stage, string> = {
  identified: 'Identified',
  contacted: 'Contacted',
  negotiating: 'Negotiating',
  closed: 'Closed Won',
};

const STAGE_COLORS: Record<Stage, string> = {
  identified: 'text-slate-400 border-slate-700',
  contacted: 'text-blue-400 border-blue-700',
  negotiating: 'text-yellow-400 border-yellow-700',
  closed: 'text-green-400 border-green-700',
};

const MOCK_REVENUE = [
  { brand: 'TechGadgets Pro', amount: '€1,500', date: 'Apr 15', type: 'Dedicated video', status: 'paid' },
  { brand: 'MindMap AI', amount: '€900', date: 'Apr 8', type: 'Integration mention', status: 'paid' },
  { brand: 'FocusFlow App', amount: '€800', date: 'Apr 1', type: 'Review + affiliate', status: 'processing' },
  { brand: 'Creator Academy', amount: '€2,500', date: 'Mar 22', type: 'Sponsored series', status: 'paid' },
  { brand: 'NovaTech Software', amount: '€1,200', date: 'Mar 10', type: 'Dedicated video', status: 'paid' },
];

const TABS = [
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'revenue', label: 'Revenue' },
];

export default function PartnershipsPage() {
  const [tab, setTab] = useState('opportunities');
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);
  const [pipeline, setPipeline] = useState(MOCK_PIPELINE);
  const [revenue, setRevenue] = useState(MOCK_REVENUE);

  useEffect(() => {
    api.get<typeof MOCK_OPPORTUNITIES>('/api/partnerships/opportunities').then(setOpportunities).catch(() => {});
    api.get<typeof MOCK_PIPELINE>('/api/partnerships/pipeline').then(setPipeline).catch(() => {});
    api.get<typeof MOCK_REVENUE>('/api/partnerships/revenue').then(setRevenue).catch(() => {});
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Partnerships</h1>
          <p className="text-slate-400 text-sm mt-0.5">AI-matched brand deals and partnership management</p>
        </div>
        <GradientButton size="md"><Plus className="h-4 w-4" /> Add Partnership</GradientButton>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Deals" value="12" trend="+3 this month" trendUp icon={<Briefcase className="h-4 w-4" />} />
        <StatCard label="Pending Outreach" value="8" sub="awaiting response" icon={<Mail className="h-4 w-4" />} />
        <StatCard label="Monthly Revenue" value="€8,450" trend="+€1,200 vs last month" trendUp icon={<DollarSign className="h-4 w-4" />} />
        <StatCard label="Avg. Deal Size" value="€1,340" trend="+12% this quarter" trendUp icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'opportunities' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp, i) => (
            <GlassCard key={i} hover className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className={`h-11 w-11 rounded-xl ${opp.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {opp.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{opp.brand}</h3>
                  <p className="text-xs text-slate-500">{opp.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{opp.value}</p>
                  <p className="text-xs text-slate-500">est. value</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Audience fit</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${opp.fit}%` }} />
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{opp.fit}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Audience</p>
                  <p className="text-xs text-slate-300">{opp.audience}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <OutlineButton size="sm" className="flex-1">View details</OutlineButton>
                <GradientButton size="sm" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />Pitch
                </GradientButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === 'pipeline' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
          {(Object.entries(pipeline) as [Stage, typeof MOCK_PIPELINE[Stage]][]).map(([stage, deals]) => (
            <div key={stage} className="min-w-[200px]">
              <div className={`flex items-center justify-between mb-3 pb-2 border-b ${STAGE_COLORS[stage]}`}>
                <span className={`text-xs font-semibold ${STAGE_COLORS[stage].split(' ')[0]}`}>{STAGE_LABELS[stage]}</span>
                <span className="text-xs text-slate-500 bg-white/8 rounded-full px-2 py-0.5">{deals.length}</span>
              </div>
              <div className="space-y-2.5">
                {deals.map((d, i) => (
                  <GlassCard key={i} hover className="p-3.5 cursor-pointer">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`h-7 w-7 rounded-lg ${d.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {d.brand.slice(0, 2)}
                      </div>
                      <p className="text-sm text-white font-medium truncate">{d.brand}</p>
                    </div>
                    <p className="text-sm font-bold text-white">{d.value}</p>
                    <div className="flex gap-1.5 mt-2">
                      <button className="text-xs text-slate-500 hover:text-white transition-colors">Edit</button>
                      <span className="text-slate-700">·</span>
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Move →</button>
                    </div>
                  </GlassCard>
                ))}
                <button className="w-full rounded-xl border border-dashed border-white/15 py-2.5 text-xs text-slate-500 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-1.5">
                  <Plus className="h-3 w-3" />Add deal
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'revenue' && (
        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Revenue This Month: <span className="text-green-400">€8,450</span></h3>
              <OutlineButton size="sm">Export CSV</OutlineButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    {['Brand', 'Amount', 'Date', 'Type', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {revenue.map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3 text-sm text-white font-medium">{r.brand}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-400">{r.amount}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{r.date}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{r.type}</td>
                      <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
