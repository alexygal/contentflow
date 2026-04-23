import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Shield, X } from 'lucide-react';
import { Badge, Fade, GlassCard, GradientButton, OutlineButton, SectionHeader } from '../../components/ui';

const TIERS = [
  {
    id: 'starter', name: 'Starter', price: '€500', period: '/month',
    desc: 'Test AI content operations. Get running in 30 minutes. Perfect for creators exploring automation.',
    cta: 'Get Started',
    features: ['4 scripts per month', 'Video editing (5 videos)', 'Email templates', 'YouTube + 1 platform', 'Analytics dashboard', '7-day revision history', 'Style AI (basic)'],
    missing: ['Unlimited scripts & emails', 'Partnership finder', 'Auto-schedule & publish', 'Advanced style AI', 'Team collaboration', 'API access'],
  },
  {
    id: 'growth', name: 'Growth', price: '€2,500', period: '/month',
    desc: 'Complete content operations — scripts, videos, emails, scheduling, and partnerships. Everything managed.',
    cta: 'Start Free Trial', recommended: true,
    features: ['Unlimited scripts, captions & emails', 'Unlimited video editing', 'Style AI (matches your exact brand)', 'Auto-schedule & publish (all platforms)', 'Partnership finder (2–3 matches/month)', 'Analytics + growth recommendations', 'Team collaboration (3 seats)', '30-day revision history'],
    missing: ['Proactive partnership scouting', 'Deal negotiation assistance', 'Weekly strategy calls', 'Dedicated account manager', 'API access', 'White-label'],
  },
  {
    id: 'premium', name: 'Premium', price: '€5,000', period: '/month',
    desc: 'Full content and revenue growth management for established creators, agencies, and teams.',
    cta: 'Contact Sales',
    features: ['Everything in Growth, plus:', 'Proactive partnership scouting', 'Deal negotiation assistance', 'Revenue optimization reports', 'Weekly strategy calls', 'Dedicated account manager', 'White-label option', 'API access', 'Unlimited team seats', 'SLA guarantee (99.9%)', 'Custom integrations'],
    missing: [],
  },
];

const FAQ = [
  { q: 'Can I change plans anytime?', a: 'Yes. Upgrade or downgrade at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of the next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Every new account gets a 14-day free trial with full access to Growth plan features. No credit card required.' },
  { q: 'Does the Growth plan really include partnership finding?', a: 'Yes. Our AI analyzes your audience and identifies 2–3 brand matches per month with personalized outreach emails drafted and ready for your approval. You review and approve before anything is sent.' },
  { q: 'How much partnership revenue can I expect?', a: 'Creators with 50K+ audiences typically see €1,000–5,000/month in new partnership revenue within 3 months. Results depend on niche and engagement rate.' },
  { q: 'Do you offer annual billing?', a: 'Yes. Annual billing saves you 20% compared to monthly. Contact our team to set up an annual subscription.' },
  { q: 'Is there a setup fee?', a: 'No setup fees, ever. The monthly subscription is all-inclusive: scripts, editing, publishing, partnership matching, analytics, and support.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? 'border-blue-500/40 bg-blue-600/5' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left">
        <span className="text-white font-medium text-sm">{q}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-400' : ''}`} />
      </button>
      {open && <div className="px-6 pb-5"><p className="text-slate-400 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="bg-[#0F172A]">
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 50% 60%, #2563EB, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <Fade><Badge pulse variant="blue">Transparent Pricing</Badge></Fade>
          <Fade delay={80}>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-white leading-tight">
              One price.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Everything managed.</span>
            </h1>
          </Fade>
          <Fade delay={160}>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">Scripts. Videos. Scheduling. Partnerships. Analytics. One monthly price covers your entire content operation — no per-video fees, no surprises.</p>
          </Fade>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {TIERS.map((tier, i) => (
              <Fade key={tier.id} delay={i * 80}>
                <div className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                  tier.recommended
                    ? 'bg-[#1a2744] border-blue-500 shadow-[0_0_60px_rgba(37,99,235,0.3)] scale-[1.03] z-10'
                    : 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15'
                }`}>
                  {tier.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
                      ✦ Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">{tier.name}</h3>
                    <p className="text-slate-400 text-sm">{tier.desc}</p>
                  </div>
                  <div className="flex items-end gap-1 mb-8">
                    <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                    <span className="text-slate-400 text-sm mb-2">{tier.period}</span>
                  </div>
                  <Link to={tier.id === 'premium' ? '#' : '/signup'}>
                    {tier.recommended ? (
                      <GradientButton size="lg" className="w-full mb-7">{tier.cta}</GradientButton>
                    ) : (
                      <OutlineButton size="lg" className="w-full mb-7">{tier.cta}</OutlineButton>
                    )}
                  </Link>
                  <ul className="space-y-2.5 mb-5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${tier.recommended ? 'text-blue-400' : 'text-slate-500'}`} />
                        <span className={tier.recommended ? 'text-slate-200' : 'text-slate-400'}>{f}</span>
                      </li>
                    ))}
                    {tier.missing.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                        <X className="h-4 w-4 shrink-0 mt-0.5 text-slate-600" />
                        <span className="text-slate-600 line-through">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue-400" />14-day free trial</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue-400" />No credit card required</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue-400" />Cancel anytime</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue-400" />SOC 2 Compliant</div>
            </div>
          </Fade>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080E1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade><SectionHeader heading="Pricing" accent="FAQs" sub="Clear answers to common questions about ContentFlow pricing." /></Fade>
          <div className="space-y-3">
            {FAQ.map((f, i) => <Fade key={i} delay={i * 50}><FAQItem q={f.q} a={f.a} /></Fade>)}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Fade>
            <h2 className="text-4xl font-bold text-white mb-4">Start for free today</h2>
            <p className="text-slate-400 mb-8">No credit card needed. Your first 3 video edits are on us.</p>
            <Link to="/signup"><GradientButton size="lg">Start Free Trial <ArrowRight className="h-5 w-5" /></GradientButton></Link>
          </Fade>
        </div>
      </section>
    </div>
  );
}
