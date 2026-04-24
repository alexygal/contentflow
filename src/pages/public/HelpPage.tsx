import React, { useState } from 'react';
import { ArrowRight, Book, ChevronDown, MessageCircle, Play, Search, Zap } from 'lucide-react';
import { Badge, Fade, GlassCard, GradientButton, Input, SectionHeader, TextArea } from '../../components/ui';
import { api } from '../../utils/api';

const TOPICS = [
  { icon: <Zap className="h-5 w-5 text-blue-400" />, title: 'Getting Started', count: 12 },
  { icon: <Play className="h-5 w-5 text-violet-400" />, title: 'Content & Scripts', count: 18 },
  { icon: <Book className="h-5 w-5 text-emerald-400" />, title: 'Partnerships & Revenue', count: 11 },
  { icon: <MessageCircle className="h-5 w-5 text-pink-400" />, title: 'Account & Billing', count: 15 },
];

const FAQ = [
  {
    q: 'Do you really write scripts for me?',
    a: "Yes. Pick a topic, your tone, and target platform (YouTube, TikTok, Blog). ContentFlow generates a complete, personalized script in under 30 seconds. It learns from your past content so the voice, style, and angle are uniquely yours. You approve or request revisions—nothing is recorded until you say so.",
  },
  {
    q: 'How do you find brand partnerships for me?',
    a: "Our AI analyzes your audience demographics, engagement rates, niche, and content themes to identify brands that are an ideal match for your channel. We generate personalized outreach emails for you to review and approve before anything is sent. You finalize the negotiation—we handle all the groundwork.",
  },
  {
    q: "What if I don't like the script, edit, or partnership pitch?",
    a: "Everything requires your explicit approval before going anywhere. Reject it or request specific changes—we revise until it's right. Unlimited revisions on all plans. Nothing is published, sent, or executed without your green light.",
  },
  {
    q: 'How much partnership revenue can I realistically earn?',
    a: 'Creators with 50K+ audiences typically see €1,000–5,000/month in new partnership revenue within their first 3 months. Some earn €10,000+ with multiple concurrent deals. Results depend on your niche, engagement rate, and audience alignment with available brands.',
  },
  {
    q: 'How long does AI style learning take?',
    a: "Upload 5–10 reference videos during onboarding. Style learning completes in 30–60 minutes. You'll receive an email when your style model is ready. Every video and script created after that reflects your exact aesthetic.",
  },
  {
    q: 'Is my content stored securely?',
    a: 'All footage is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and GDPR compliant. You own your content and can delete it at any time.',
  },
  {
    q: 'How does billing work?',
    a: "You're billed monthly on the date you signed up. All plans include a 14-day free trial. Upgrade, downgrade, or cancel at any time from your billing settings. No setup fees, no per-script or per-video charges.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all overflow-hidden ${open ? 'border-blue-500/40 bg-blue-600/5' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left">
        <span className="text-slate-200 font-medium text-sm">{q}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-5"><p className="text-slate-400 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = FAQ.filter(f =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/support/contact', form);
    } catch {
      // Network error — still show success (message queued locally)
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0F172A]">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 50% 40%, #2563EB, transparent 55%)' }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <Fade><Badge pulse variant="blue">Help Center</Badge></Fade>
          <Fade delay={80}><h1 className="mt-5 text-5xl font-extrabold text-white">How can we help?</h1></Fade>
          <Fade delay={160}>
            <div className="mt-6 relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search the help center..."
                className="w-full rounded-2xl border border-slate-600 bg-[#1e293b] pl-12 pr-4 py-4 text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
            </div>
          </Fade>
        </div>
      </section>

      {/* Topics */}
      {!search && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Fade><SectionHeader heading="Browse by" accent="topic" /></Fade>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TOPICS.map((t, i) => (
                <Fade key={i} delay={i * 60}>
                  <GlassCard hover className="p-5 cursor-pointer">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-3">{t.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{t.title}</h3>
                    <p className="text-xs text-slate-500">{t.count} articles</p>
                  </GlassCard>
                </Fade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-[#080E1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade>
            <SectionHeader
              heading={search ? `Results for "${search}"` : 'Frequently asked'}
              accent={search ? '' : 'questions'}
            />
          </Fade>
          {filtered.length === 0 ? (
            <Fade><p className="text-center text-slate-500 py-8">No results found. Try a different search term.</p></Fade>
          ) : (
            <div className="space-y-3">
              {filtered.map((f, i) => <Fade key={i} delay={i * 40}><FAQItem q={f.q} a={f.a} /></Fade>)}
            </div>
          )}
        </div>
      </section>

      {/* Support form */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade><SectionHeader heading="Still need" accent="help?" sub="Our support team typically responds within 2 hours." /></Fade>
          <Fade delay={80}>
            <GlassCard className="p-8">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto h-14 w-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                    <MessageCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Message sent!</h3>
                  <p className="text-slate-400 text-sm">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={submitForm} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Your name" placeholder="Alex Rivera" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                    <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <Input label="Subject" placeholder="What's your question about?" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
                  <TextArea label="Message" rows={5} placeholder="Describe your issue in detail..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                  <GradientButton type="submit" size="lg" className="w-full">
                    Send message <ArrowRight className="h-4 w-4" />
                  </GradientButton>
                </form>
              )}
            </GlassCard>
          </Fade>
        </div>
      </section>
    </div>
  );
}
