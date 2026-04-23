import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge, Fade, GradientButton } from '../../components/ui';

const POST_META: Record<string, { title: string; category: string; readTime: string; date: string }> = {
  'ai-content-operations-2025': {
    title: "The Creator's Secret: Why the Top 1% Don't Edit Their Own Videos Anymore",
    category: 'AI Operations', readTime: '8 min read', date: 'Apr 18, 2025',
  },
  'from-1k-to-12k-partnerships': {
    title: "From €0 to €12,000/Month in Brand Deals: How AI Changed Partnership Outreach",
    category: 'Case Studies', readTime: '6 min read', date: 'Apr 14, 2025',
  },
  'tiktok-scripts-algorithm-2025': {
    title: 'The TikTok Script Formula That Gets 10× More Views in 2025',
    category: 'Platform Strategy', readTime: '5 min read', date: 'Apr 10, 2025',
  },
  'diversify-creator-revenue': {
    title: '5 Revenue Streams Every Creator Should Automate (And How AI Does It For You)',
    category: 'Creator Business', readTime: '7 min read', date: 'Apr 7, 2025',
  },
  'approval-only-workflow': {
    title: "The 'Approval-Only' Workflow: How Top Creators Stay In Control While Automating Everything",
    category: 'AI Operations', readTime: '9 min read', date: 'Apr 3, 2025',
  },
  'partnership-outreach-cold-email': {
    title: 'Why Cold Emails to Brands Almost Never Work (And What Does)',
    category: 'Partnerships & Revenue', readTime: '10 min read', date: 'Mar 28, 2025',
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = slug ? POST_META[slug] : null;

  if (!meta) {
    return (
      <div className="bg-[#0F172A] min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-slate-500 text-sm mb-4">This post could not be found.</p>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-screen">
      {/* Hero */}
      <section className="py-16 lg:py-24 relative border-b border-white/5">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 40% 50%, #2563EB, transparent 55%)' }} />
        <div className="max-w-3xl mx-auto px-4 relative">
          <Fade>
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Fade>
          <Fade delay={40}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="blue">{meta.category}</Badge>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3 w-3" />{meta.readTime}
              </span>
              <span className="text-xs text-slate-500">{meta.date}</span>
            </div>
          </Fade>
          <Fade delay={80}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{meta.title}</h1>
          </Fade>
        </div>
      </section>

      {/* Content placeholder */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Fade>
            <div className="rounded-2xl border border-white/8 bg-white/3 p-10 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
                <span className="text-2xl">✍️</span>
              </div>
              <h2 className="text-white font-bold text-xl mb-2">Full article coming soon</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                Subscribe to the ContentFlow blog to get notified when this article is published.
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-slate-600 bg-[#1e293b] px-4 py-2.5 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <GradientButton size="md">Notify me</GradientButton>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
