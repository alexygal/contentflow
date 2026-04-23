import React, { useState } from 'react';
import { Check, Copy, PenLine, RefreshCw, Save, Sparkles, Star, Wand2 } from 'lucide-react';
import { Alert, GlassCard, GradientButton, OutlineButton, Select, TabBar, TextArea } from '../../components/ui';

type Tab = 'script' | 'caption' | 'email' | 'ideas' | 'thumbnail';

const TONES = [
  { value: 'educational', label: 'Educational' },
  { value: 'entertaining', label: 'Entertaining' },
  { value: 'inspirational', label: 'Inspirational' },
  { value: 'promotional', label: 'Promotional' },
  { value: 'conversational', label: 'Conversational' },
];

const PLATFORMS = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const HISTORY = [
  { type: 'Script', title: 'How I Built a 6-Figure Creator Business', time: '2h ago', status: 'approved' },
  { type: 'Caption', title: '10 AI Tools Every Creator Needs in 2025', time: '4h ago', status: 'pending' },
  { type: 'Email', title: 'Partnership Pitch — NovaTech Collaboration', time: '1d ago', status: 'approved' },
  { type: 'Ideas', title: 'Content ideas for April 2025', time: '2d ago', status: 'saved' },
  { type: 'Thumbnail', title: 'YouTube thumbnail brief — productivity video', time: '3d ago', status: 'saved' },
];

const MOCK_OUTPUTS: Record<Tab, string> = {
  script: `[HOOK — 0:00-0:15]
"What if I told you that the biggest creators aren't working harder than you — they've just automated the right things?"

[INTRO — 0:15-0:45]
"I'm [Name], and today I'm breaking down the exact systems I use to publish 5 videos a week while only working 4 hours on content creation. Let's get into it."

[MAIN CONTENT — 0:45-8:00]
SECTION 1: The Time Audit
"Before I found AI editing, I was spending 40 hours a week just on post-production. That's insane. Here's what I found when I tracked my time..."
[B-ROLL: Screen recording of time tracking app]

SECTION 2: The AI Stack
"I use three tools. ContentFlow handles editing. Claude handles scripts. And my team handles... well, actually I don't have a team anymore because the AI replaced them."
[B-ROLL: Screen recording of ContentFlow dashboard]

[CTA — 8:00-8:30]
"If you want my full AI creator toolkit, link is in the description. And subscribe if you want more of this — I post every Tuesday and Thursday."`,

  caption: `🤖 The creator economy just changed forever.

I used to spend 40+ hours editing every week. Now? 4 hours — because AI handles the rest.

Here's what my week looks like now vs. 6 months ago:

OLD:
→ Film: 2h
→ Edit: 40h 😭
→ Captions: 3h
→ Publish: 2h
Total: 47 hours

NEW:
→ Film: 2h
→ Review AI edit: 45min ✅
→ Auto-captions: Done
→ Auto-publish: Done
Total: 2 hours 45 min

That's 44 hours back every week.

What would you do with an extra 44 hours?

#CreatorEconomy #AITools #ContentCreation #YouTuber #VideoEditing #ContentFlow`,

  email: `Subject: Partnership opportunity — [Your Channel] × [Brand Name]

Hi [Contact Name],

I'm [Your Name], the creator behind [Channel Name] where I help [audience description] achieve [outcome].

I recently came across [Brand Name] and immediately thought of my audience — they're constantly asking me for recommendations on [relevant category], and your product genuinely solves a problem they face.

Here's a quick snapshot of my audience:
• Subscribers: [X]K YouTube + [X]K TikTok
• Monthly views: [X]M
• Average engagement rate: 6.2%
• Audience: [demographics]

I'd love to explore a collaboration — whether that's a dedicated review, an integration into an upcoming series, or something creative we come up with together.

Would you have 20 minutes for a quick call this week?

Best,
[Your Name]
[Channel links]`,

  ideas: `📋 CONTENT IDEAS — April 2025

🔥 HIGH POTENTIAL (trending + audience interest):
1. "I tried every AI video tool for 30 days — here's the winner"
2. "The creator stack that made me $10K in one month"
3. "Why 90% of creators quit (and how to not be one of them)"
4. "I gave an AI my YouTube channel for a week — this happened"
5. "Honest review: Is ContentFlow actually worth €2,500/month?"

📈 EDUCATIONAL SERIES:
6. "Creator Business 101" — 5-part series
7. "Week in my life as a 6-figure creator" — monthly vlog
8. "Teardown Tuesday" — analyzing successful creator strategies

🎯 TRENDING ANGLES:
9. "I automated my entire content workflow (cost breakdown)"
10. "My B-roll library that saves 10h/week"

💡 COLLABORATION IDEAS:
11. Collab with [Creator A] — creator productivity challenge
12. Expert interview: AI developer explains how style learning works`,

  thumbnail: `🎨 THUMBNAIL BRIEF

Video: "I Automated My Entire YouTube Channel for 30 Days"
Target CTR: 8%+

STYLE DIRECTION:
• Clean, high-contrast design
• My face showing: surprised/excited expression (mouth slightly open, eyebrows raised)
• Before/after split layout

VISUAL ELEMENTS:
Left side (BEFORE):
  • Clock showing "40 HRS" in red
  • Tired/stressed face
  • Cluttered timeline in background

Right side (AFTER):
  • Clock showing "4 HRS" in green
  • Happy/relaxed face
  • Clean, minimal UI

TEXT OVERLAY:
• Headline: "40 HOURS → 4 HOURS"
• Font: Bold sans-serif, 95% of thumbnail width
• Color: White with blue shadow

BACKGROUND:
• Dark gradient (#0F172A to #1E293B)
• Subtle blue glow behind face

SIZE: 1280×720px, safe zone for all devices`,
};

export default function CreatePage() {
  const [tab, setTab] = useState<Tab>('script');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [tone, setTone] = useState('educational');
  const [audience, setAudience] = useState('');
  const [output, setOutput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'script', label: 'Script' },
    { id: 'caption', label: 'Caption' },
    { id: 'email', label: 'Partnership Email' },
    { id: 'ideas', label: 'Content Ideas' },
    { id: 'thumbnail', label: 'Thumbnail Brief' },
  ];

  const generate = async () => {
    setGenerating(true);
    setOutput('');
    await new Promise(r => setTimeout(r, 1800));
    setOutput(MOCK_OUTPUTS[tab]);
    setGenerating(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white">Create Content</h1>
        <p className="text-slate-400 text-sm mt-0.5">AI-powered content generation for every format</p>
      </div>

      <div className="mb-6">
        <TabBar
          tabs={TABS}
          active={tab}
          onChange={(id) => { setTab(id as Tab); setOutput(''); }}
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <TextArea
              label="Topic / Brief"
              rows={3}
              placeholder={
                tab === 'script' ? "e.g. How I use AI to edit 30 videos per week..." :
                tab === 'caption' ? "e.g. My journey to 500K subscribers..." :
                tab === 'email' ? "e.g. Pitch to a productivity app brand..." :
                tab === 'ideas' ? "e.g. Content ideas around AI and creativity for April..." :
                "e.g. YouTube video about AI video editing workflow..."
              }
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
            {tab !== 'ideas' && (
              <Select
                label="Platform"
                options={PLATFORMS}
                value={platform}
                onChange={e => setPlatform(e.target.value)}
              />
            )}
            <Select
              label="Tone"
              options={TONES}
              value={tone}
              onChange={e => setTone(e.target.value)}
            />
            <TextArea
              label="Target audience (optional)"
              rows={2}
              placeholder="e.g. Beginner YouTubers who want to grow their channel..."
              value={audience}
              onChange={e => setAudience(e.target.value)}
            />
            <GradientButton onClick={generate} disabled={generating} size="lg" className="w-full">
              {generating ? (
                <><RefreshCw className="h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><Wand2 className="h-4 w-4" /> Generate {tab === 'script' ? 'Script' : tab === 'ideas' ? 'Ideas' : 'Content'}</>
              )}
            </GradientButton>
          </GlassCard>

          {/* Tips */}
          <GlassCard className="p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tips for better output</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2"><Sparkles className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />Be specific about your topic and angle</li>
              <li className="flex items-start gap-2"><Sparkles className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />Describe your audience in detail for better targeting</li>
              <li className="flex items-start gap-2"><Sparkles className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />Select the exact platform to get optimized format</li>
            </ul>
          </GlassCard>
        </div>

        {/* Output */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <GlassCard className="p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">Generated Output</span>
              </div>
              {output && (
                <div className="flex gap-2">
                  <OutlineButton size="sm" onClick={copy} className="flex items-center gap-1.5">
                    {copied ? <><Check className="h-3 w-3 text-green-400" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                  </OutlineButton>
                  <OutlineButton size="sm" onClick={save} className="flex items-center gap-1.5">
                    {saved ? <><Check className="h-3 w-3 text-green-400" /> Saved</> : <><Save className="h-3 w-3" /> Save</>}
                  </OutlineButton>
                  <OutlineButton size="sm" onClick={generate} className="flex items-center gap-1.5">
                    <RefreshCw className="h-3 w-3" /> Regenerate
                  </OutlineButton>
                </div>
              )}
            </div>
            {generating ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-full border-2 border-blue-600/30 border-t-blue-500 animate-spin" />
                  <Wand2 className="absolute inset-0 m-auto h-6 w-6 text-blue-400" />
                </div>
                <p className="text-slate-400 text-sm">AI is crafting your {tab}...</p>
              </div>
            ) : output ? (
              <div>
                <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans border-b border-white/5 pb-4 mb-4">{output}</pre>
                {saved && <Alert variant="success" className="mt-2">Saved to content history</Alert>}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <Wand2 className="h-6 w-6 text-slate-500" />
                </div>
                <p className="text-slate-500 text-sm">Fill in the form and click Generate to create content</p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* History */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Recent History</h2>
        <GlassCard>
          <div className="divide-y divide-white/5">
            {HISTORY.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <PenLine className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.type} · {item.time}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>{item.status}</span>
                <Star className="h-4 w-4 text-slate-600 hover:text-yellow-400 transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
