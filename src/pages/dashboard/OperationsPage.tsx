import React, { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Cloud, Instagram, Layers, Link2, Loader2, Plus, Upload, Video, Youtube } from 'lucide-react';
import { GlassCard, GradientButton, OutlineButton, StatCard, StatusPill, TabBar } from '../../components/ui';
import { api } from '../../utils/api';

const MOCK_QUEUE = [
  { title: 'Productivity Secrets of Top Creators', platform: 'YouTube', scheduledAt: 'Today, 3:00 PM', status: 'scheduled', duration: '14:32' },
  { title: 'Tool Teardown: ContentFlow vs Descript', platform: 'TikTok', scheduledAt: 'Tomorrow, 10:00 AM', status: 'processing', duration: '00:58' },
  { title: 'Q&A: Your AI Questions Answered', platform: 'Instagram', scheduledAt: 'Apr 25, 2:00 PM', status: 'draft', duration: '05:12' },
  { title: 'How I Built a 6-Figure Creator Business', platform: 'YouTube', scheduledAt: 'Apr 27, 9:00 AM', status: 'draft', duration: '22:45' },
  { title: 'Morning Routine Revealed', platform: 'TikTok', scheduledAt: 'Apr 28, 12:00 PM', status: 'draft', duration: '01:05' },
];

const MOCK_PLATFORMS = [
  { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, color: 'text-red-400', connected: true, channel: '@alexrivera • 512K subs' },
  { name: 'TikTok', icon: <Video className="h-5 w-5" />, color: 'text-pink-400', connected: true, channel: '@alexrivera • 234K followers' },
  { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, color: 'text-violet-400', connected: true, channel: '@alexrivera • 89K followers' },
  { name: 'LinkedIn', icon: <Link2 className="h-5 w-5" />, color: 'text-blue-400', connected: false, channel: 'Connect your account' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALENDAR_ITEMS: Record<number, { title: string; platform: string; color: string }[]> = {
  1: [{ title: 'Productivity Secrets', platform: 'YT', color: 'bg-red-500/40' }],
  3: [{ title: 'Tool Teardown', platform: 'TK', color: 'bg-pink-500/40' }],
  5: [{ title: 'Q&A Session', platform: 'IG', color: 'bg-violet-500/40' }],
  0: [{ title: 'Creator Business', platform: 'YT', color: 'bg-red-500/40' }, { title: 'Morning Routine', platform: 'TK', color: 'bg-pink-500/40' }],
};

export default function OperationsPage() {
  const [tab, setTab] = useState('queue');
  const [dragging, setDragging] = useState(false);
  const [calView, setCalView] = useState<'week' | 'month'>('week');
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const [platforms, setPlatforms] = useState(MOCK_PLATFORMS);

  useEffect(() => {
    api.get<typeof MOCK_QUEUE>('/api/operations/queue').then(setQueue).catch(() => {});
    api.get<{ name: string; connected: boolean; channel: string }[]>('/api/platforms')
      .then(data => setPlatforms(prev => prev.map(p => {
        const remote = data.find(d => d.name === p.name);
        return remote ? { ...p, ...remote } : p;
      })))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Operations</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your video pipeline and publishing schedule</p>
        </div>
        <GradientButton size="md"><Plus className="h-4 w-4" /> Upload Video</GradientButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Processing" value="3" sub="videos being edited" icon={<Loader2 className="h-4 w-4 animate-spin" />} />
        <StatCard label="Scheduled" value="5" sub="ready to publish" icon={<Calendar className="h-4 w-4" />} />
        <StatCard label="Published" value="47" trend="+12 vs last month" trendUp icon={<Cloud className="h-4 w-4" />} />
        <StatCard label="Queue Time" value="8 min" sub="avg. processing time" icon={<Video className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Upload + queue */}
        <div className="lg:col-span-2 space-y-5">
          {/* Upload zone */}
          <GlassCard
            className={`border-dashed p-8 text-center transition-all ${dragging ? 'border-blue-500 bg-blue-600/10' : 'border-white/20'}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
          >
            <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-white font-semibold mb-1">Drop your footage here</p>
            <p className="text-slate-400 text-sm mb-4">MP4, MOV, AVI, MKV, ProRes up to 100GB</p>
            <OutlineButton size="md">Browse files</OutlineButton>
          </GlassCard>

          {/* Queue */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white">Publishing Queue</h2>
              <TabBar tabs={[{ id: 'queue', label: 'Queue' }, { id: 'history', label: 'History' }]} active={tab} onChange={setTab} />
            </div>
            <GlassCard>
              <div className="divide-y divide-white/5">
                {queue.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-[#0F172A] border border-white/8 flex items-center justify-center shrink-0">
                      <Video className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.platform} · {item.duration} · {item.scheduledAt}</p>
                    </div>
                    <StatusPill status={item.status} />
                    <OutlineButton size="sm">Edit</OutlineButton>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right: Calendar + platforms */}
        <div className="space-y-5">
          {/* Calendar */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Content Calendar</h3>
              <div className="flex items-center gap-1">
                <button className="p-1 text-slate-400 hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-xs text-slate-400 px-1">Apr 21–27</span>
                <button className="p-1 text-slate-400 hover:text-white"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => <div key={d} className="text-center text-xs text-slate-600 font-medium">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[21, 22, 23, 24, 25, 26, 27].map((day, i) => (
                <div key={day} className="min-h-[64px] rounded-lg bg-white/3 border border-white/5 p-1">
                  <p className="text-xs text-slate-500 mb-1">{day}</p>
                  {(CALENDAR_ITEMS[i] || []).map((ev, j) => (
                    <div key={j} className={`rounded text-[9px] text-white px-1 py-0.5 mb-0.5 truncate ${ev.color}`}>
                      {ev.platform}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Platform connections */}
          <GlassCard className="p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Platform Connections</h3>
            <div className="space-y-3">
              {platforms.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 ${p.color}`}>
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{p.name}</p>
                    <p className="text-xs text-slate-500 truncate">{p.channel}</p>
                  </div>
                  {p.connected ? (
                    <span className="rounded-full bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 text-xs font-medium">Connected</span>
                  ) : (
                    <OutlineButton size="sm"><Layers className="h-3 w-3 mr-1" />Connect</OutlineButton>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
