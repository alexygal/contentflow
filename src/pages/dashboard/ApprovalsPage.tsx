import React, { useState } from 'react';
import { CheckCircle, Clock, PenLine, Star, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { GlassCard, OutlineButton, StatusPill, TabBar } from '../../components/ui';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';
type Item = { id: number; title: string; platform: string; createdAt: string; preview: string; status: ApprovalStatus };

const ITEMS: Record<string, Item[]> = {
  scripts: [
    { id: 1, title: 'How I Built a 6-Figure Creator Business', platform: 'YouTube', createdAt: '2h ago', preview: '[HOOK] "What if I told you that the biggest creators aren\'t working harder than you—they\'ve just automated the right things?"\n\n[INTRO] "I\'m Alex, and today I\'m breaking down the exact systems..."', status: 'pending' },
    { id: 2, title: 'My Top 5 AI Tools for Creators', platform: 'YouTube', createdAt: '5h ago', preview: '[HOOK] "These 5 AI tools save me 30 hours every week. Let me show you exactly how..."\n\n[INTRO] "Today we\'re doing a deep dive into the exact tech stack..."', status: 'pending' },
    { id: 3, title: 'Creator Burnout Recovery Plan', platform: 'YouTube', createdAt: '1d ago', preview: '[HOOK] "I almost quit YouTube last month. Here\'s what saved me..."\n\n[INTRO] "Nobody talks about this, but every creator hits a wall..."', status: 'approved' },
  ],
  captions: [
    { id: 4, title: '10 AI Tools Every Creator Needs', platform: 'TikTok', createdAt: '4h ago', preview: '🤖 The creator economy just changed forever.\n\nI used to spend 40+ hours editing every week. Now? 4 hours — because AI handles the rest.\n\n#CreatorEconomy #AITools', status: 'pending' },
    { id: 5, title: 'Morning Routine Caption', platform: 'Instagram', createdAt: '6h ago', preview: '5:30 AM. Before the world wakes up.\n\nThis morning routine has transformed my productivity. Swipe to see the full breakdown. 🌅', status: 'pending' },
    { id: 6, title: 'Productivity Tips Caption', platform: 'LinkedIn', createdAt: '1d ago', preview: 'Most creators are working 60 hours a week and growing slowly.\n\nI work 20 hours a week and growing fast.\n\nHere\'s the difference:', status: 'approved' },
  ],
  emails: [
    { id: 7, title: 'Partnership Pitch — NovaTech Software', platform: 'Email', createdAt: '1d ago', preview: 'Subject: Partnership opportunity — AlexRivera × NovaTech\n\nHi Sarah,\n\nI\'m Alex Rivera, creator of the AlexRivera channel where I help 512K tech-savvy creators...', status: 'pending' },
    { id: 8, title: 'Follow-up — FocusFlow App', platform: 'Email', createdAt: '2d ago', preview: 'Subject: Following up on our collaboration opportunity\n\nHi Marcus,\n\nJust wanted to follow up on my email from last week about a potential partnership...', status: 'approved' },
  ],
  partnerships: [
    { id: 9, title: 'TechGadgets Pro — Integration Deal', platform: 'Partnership', createdAt: '3d ago', preview: 'Brand: TechGadgets Pro\nDeal type: Dedicated video + 3-month affiliate\nProposed value: €1,800\nDeliverables: 1 × 15-min dedicated video, affiliate link in bio for 3 months', status: 'pending' },
    { id: 10, title: 'Creator Academy — Sponsored Series', platform: 'Partnership', createdAt: '4d ago', preview: 'Brand: Creator Academy\nDeal type: 5-video sponsored series\nProposed value: €3,500\nDeliverables: 5 × 10–15 min videos over 2 months', status: 'rejected' },
  ],
};

const TABS_DEF = [
  { id: 'scripts', label: 'Scripts' },
  { id: 'captions', label: 'Captions' },
  { id: 'emails', label: 'Emails' },
  { id: 'partnerships', label: 'Partnerships' },
];

function ApprovalCard({ item, onApprove, onReject }: { item: Item; onApprove: (id: number) => void; onReject: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <GlassCard className={`p-5 ${item.status !== 'pending' ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
          <PenLine className="h-4 w-4 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate">{item.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-500">{item.platform}</span>
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3 w-3" />{item.createdAt}</span>
          </div>
        </div>
        <StatusPill status={item.status} />
      </div>

      <div
        className={`bg-[#0F172A] rounded-xl px-4 py-3 mb-4 cursor-pointer overflow-hidden transition-all duration-300 ${expanded ? '' : 'max-h-20'}`}
        onClick={() => setExpanded(!expanded)}
      >
        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">{item.preview}</pre>
        {!expanded && <div className="h-6 bg-gradient-to-t from-[#0F172A] to-transparent absolute bottom-0 left-0 right-0 pointer-events-none" />}
      </div>
      <button onClick={() => setExpanded(!expanded)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors mb-4 block">
        {expanded ? 'Show less' : 'Read more →'}
      </button>

      {item.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => onReject(item.id)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-600/10 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600/20 transition-colors"
          >
            <ThumbsDown className="h-4 w-4" />Reject
          </button>
          <button
            onClick={() => onApprove(item.id)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-green-500/40 bg-green-600/10 py-2.5 text-sm font-medium text-green-400 hover:bg-green-600/20 transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />Approve
          </button>
        </div>
      )}
      {item.status === 'approved' && (
        <div className="flex items-center gap-2 text-sm text-green-400"><CheckCircle className="h-4 w-4" />Approved</div>
      )}
      {item.status === 'rejected' && (
        <div className="flex items-center gap-2 text-sm text-red-400"><X className="h-4 w-4" />Rejected</div>
      )}
    </GlassCard>
  );
}

export default function ApprovalsPage() {
  const [tab, setTab] = useState('scripts');
  const [items, setItems] = useState(ITEMS);

  const approve = (id: number) => setItems(prev => {
    const next = { ...prev };
    Object.keys(next).forEach(k => {
      next[k] = next[k].map(i => i.id === id ? { ...i, status: 'approved' as ApprovalStatus } : i);
    });
    return next;
  });

  const reject = (id: number) => setItems(prev => {
    const next = { ...prev };
    Object.keys(next).forEach(k => {
      next[k] = next[k].map(i => i.id === id ? { ...i, status: 'rejected' as ApprovalStatus } : i);
    });
    return next;
  });

  const pendingCount = (key: string) => items[key].filter(i => i.status === 'pending').length;

  const tabsWithCounts = TABS_DEF.map(t => ({ ...t, count: pendingCount(t.id) }));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Approvals</h1>
          <p className="text-slate-400 text-sm mt-0.5">Review and approve AI-generated content before publishing</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-yellow-500/15 border border-yellow-500/30 px-4 py-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-yellow-300 font-medium">
            {Object.values(items).flat().filter(i => i.status === 'pending').length} items need review
          </span>
        </div>
      </div>

      <TabBar tabs={tabsWithCounts} active={tab} onChange={setTab} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items[tab].map(item => (
          <ApprovalCard key={item.id} item={item} onApprove={approve} onReject={reject} />
        ))}
      </div>
    </div>
  );
}
