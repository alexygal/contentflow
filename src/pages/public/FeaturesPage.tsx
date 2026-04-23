import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, BarChart3, Brain, Check, CheckCircle,
  Globe, Sparkles, Star, Video, Wand2, Zap,
} from 'lucide-react';
import { Badge, Fade, GlassCard, GradientButton, SectionHeader } from '../../components/ui';

const PILLARS = [
  {
    icon: <Brain className="h-7 w-7 text-blue-400" />,
    bg: 'bg-blue-600/15',
    title: 'Content Creation',
    desc: 'Stop staring at a blank page. Our AI writes video scripts, partnership emails, social captions, and brainstorms content ideas—all personalized to your voice, brand, and audience.',
    points: ['Full video scripts (YouTube, TikTok, Blog)', 'Social captions & hooks', 'Partnership outreach emails', 'Content idea generation', 'Personalized to your voice'],
  },
  {
    icon: <Wand2 className="h-7 w-7 text-violet-400" />,
    bg: 'bg-violet-600/15',
    title: 'Content Operations',
    desc: 'Upload raw footage and receive a polished, publish-ready video in minutes. AI edits to match your style exactly, auto-schedules for peak times, and publishes everywhere simultaneously.',
    points: ['Auto scene detection & cutting', 'Style AI (your exact aesthetic)', 'Captions & subtitles', 'Auto-schedule at optimal times', 'One-click publish to all platforms', 'Audio normalization & color grading'],
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-emerald-400" />,
    bg: 'bg-emerald-600/15',
    title: 'Growth & Optimization',
    desc: 'Weekly analytics reports. Topic recommendations. A/B testing suggestions. We tell you exactly what works and why—so every video outperforms the last.',
    points: ['Cross-platform analytics dashboard', 'Retention curve analysis', 'Topic & timing recommendations', 'A/B content testing', 'Audience growth tracking', 'Monthly performance reports'],
  },
  {
    icon: <Globe className="h-7 w-7 text-pink-400" />,
    bg: 'bg-pink-600/15',
    title: 'Revenue Growth',
    desc: 'We identify brands that perfectly match your audience, generate personalized outreach emails, track every deal, and help you negotiate—turning content into diversified income streams.',
    points: ['AI brand matching (audience-first)', 'Personalized outreach email generation', 'Partnership pipeline management', 'Deal negotiation assistance', 'Revenue tracking & ROI reports', 'Affiliate program identification'],
  },
];

const VS_TABLE = [
  { feature: 'Script writing', cf: '✓ AI-generated', manual: 'Manual (hours)', generic: '✗' },
  { feature: 'Video editing time', cf: '5 min', manual: '4+ hours', generic: '90 min' },
  { feature: 'Style consistency', cf: '100% your brand', manual: 'Variable', generic: '~40%' },
  { feature: 'Auto-schedule & publish', cf: '✓ All platforms', manual: 'Manual', generic: 'Limited' },
  { feature: 'Partnership finder', cf: '✓ AI-matched', manual: '✗', generic: '✗' },
  { feature: 'Outreach emails written', cf: '✓', manual: '✗', generic: '✗' },
  { feature: 'Analytics & growth recs', cf: '✓', manual: '✗', generic: '✗' },
  { feature: 'Unlimited revisions', cf: '✓', manual: 'Costs extra', generic: '3 max' },
];

const USE_CASES = [
  { icon: <Video className="h-5 w-5" />, type: 'YouTubers', desc: 'Scripts written, footage edited, posts scheduled. Reclaim 25+ hours per week and publish 5× more without burnout.' },
  { icon: <Sparkles className="h-5 w-5" />, type: 'TikTok Creators', desc: 'Batch-generate captions, hooks, and edits for 30 short-form videos per week—each perfectly paced for maximum retention.' },
  { icon: <Award className="h-5 w-5" />, type: 'Podcast Hosts', desc: 'Auto-clip your best moments into shareable social videos. AI identifies partnership opportunities relevant to your audience.' },
  { icon: <Star className="h-5 w-5" />, type: 'Fitness Coaches', desc: 'ContentFlow writes your program emails, finds brand deals with supplement and equipment companies, and edits your videos automatically.' },
  { icon: <Globe className="h-5 w-5" />, type: 'Agencies', desc: 'Manage 50+ creator accounts from one dashboard. Scripts, editing, and partnership outreach—handled at scale with white-label branding.' },
  { icon: <Zap className="h-5 w-5" />, type: 'Growing Creators', desc: 'Not yet monetized? ContentFlow finds partnership opportunities early, helps you build a brand deal pipeline before you hit 100K.' },
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#0F172A]">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 60% 30%, #2563EB, transparent 60%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Fade>
            <Badge pulse variant="blue">Platform Features</Badge>
          </Fade>
          <Fade delay={80}>
            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-tight text-white">
              Not a video editor.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                Your AI operations manager.
              </span>
            </h1>
          </Fade>
          <Fade delay={160}>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              ContentFlow manages your entire content operation across four pillars: Creation, Operations, Optimization, and Revenue Growth. Everything handled. You just approve and create.
            </p>
          </Fade>
          <Fade delay={240}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <GradientButton size="lg">Start Free Trial <ArrowRight className="h-5 w-5" /></GradientButton>
              </Link>
              <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                View pricing →
              </Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade><SectionHeader heading="Four pillars that" accent="run your business" sub="Each pillar is powerful alone. Together, they eliminate your entire content and revenue operations bottleneck." /></Fade>
          <div className="space-y-8">
            {PILLARS.map((p, i) => (
              <Fade key={i} delay={i * 80}>
                <GlassCard hover className={`p-8 ${i % 2 === 0 ? '' : ''}`}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                      <div className={`h-12 w-12 rounded-2xl ${p.bg} flex items-center justify-center mb-5`}>{p.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-3">{p.title}</h3>
                      <p className="text-slate-400 leading-relaxed mb-5">{p.desc}</p>
                      <ul className="space-y-2">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <CheckCircle className="h-4 w-4 text-blue-400 shrink-0" />{pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`rounded-2xl bg-[#0F172A] border border-white/8 p-6 h-52 flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="text-center">
                        <div className={`mx-auto mb-3 h-16 w-16 rounded-2xl ${p.bg} flex items-center justify-center`}>{p.icon}</div>
                        <p className="text-slate-500 text-sm">Interactive demo coming soon</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-[#080E1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade><SectionHeader heading="ContentFlow vs." accent="doing it yourself" sub="See why creators are switching from manual workflows and generic AI tools to a complete operations manager." /></Fade>
          <Fade delay={100}>
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Feature</th>
                      <th className="px-6 py-4 text-sm font-semibold text-center" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(236,72,153,0.1))' }}>
                        <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">ContentFlow</span>
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-center">Manual editing</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-center">Generic AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VS_TABLE.map((row, i) => (
                      <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/1'}`}>
                        <td className="px-6 py-3.5 text-sm text-slate-300">{row.feature}</td>
                        <td className="px-6 py-3.5 text-sm text-green-400 font-medium text-center">{row.cf}</td>
                        <td className="px-6 py-3.5 text-sm text-slate-500 text-center">{row.manual}</td>
                        <td className="px-6 py-3.5 text-sm text-slate-500 text-center">{row.generic}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Fade>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade><SectionHeader heading="Built for every" accent="type of creator" sub="Whether you're a solo creator or running a multi-creator agency, ContentFlow manages everything at your scale." /></Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc, i) => (
              <Fade key={i} delay={i * 60}>
                <GlassCard hover className="p-6">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/15 flex items-center justify-center text-blue-400 mb-4">{uc.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{uc.type}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{uc.desc}</p>
                </GlassCard>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#080E1A]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Fade>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to reclaim 20+ hours per week?</h2>
            <p className="text-slate-400 mb-8">Join 500+ creators who let ContentFlow manage their entire content operation — and find €1,000–5,000/month in new partnership revenue.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup"><GradientButton size="lg">Start Free Trial <ArrowRight className="h-5 w-5" /></GradientButton></Link>
              <Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Compare plans →</Link>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
