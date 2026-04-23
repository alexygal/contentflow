import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Search, Tag } from 'lucide-react';
import { Badge, Fade, GlassCard, GradientButton, SectionHeader } from '../../components/ui';

const CATEGORIES = ['All', 'AI Operations', 'Partnerships & Revenue', 'Case Studies', 'Platform Strategy', 'Creator Business'];

const POSTS = [
  {
    slug: 'ai-content-operations-2025',
    title: "The Creator's Secret: Why the Top 1% Don't Edit Their Own Videos Anymore",
    excerpt: "We analyzed 10,000 creator accounts and found a shocking pattern. The top 1% don't spend more time creating—they spend less, and they've automated everything else. Here's exactly what they've delegated.",
    category: 'AI Operations',
    readTime: '8 min read',
    date: 'Apr 18, 2025',
    gradient: 'from-blue-600/30 to-violet-600/20',
    featured: true,
  },
  {
    slug: 'from-1k-to-12k-partnerships',
    title: "From €0 to €12,000/Month in Brand Deals: How AI Changed Partnership Outreach",
    excerpt: "Sarah Thompson didn't know how to approach brands. Then ContentFlow found them, wrote the pitches, and sent them on her behalf. Three deals later, she had €12,000 in monthly recurring partnership revenue.",
    category: 'Case Studies',
    readTime: '6 min read',
    date: 'Apr 14, 2025',
    gradient: 'from-emerald-600/20 to-teal-600/15',
  },
  {
    slug: 'tiktok-scripts-algorithm-2025',
    title: 'The TikTok Script Formula That Gets 10× More Views in 2025',
    excerpt: "Platform algorithms don't just reward good editing—they reward specific script structures. Here are the exact hook formulas, story arcs, and CTA placements that ContentFlow's AI uses to maximize early retention.",
    category: 'Platform Strategy',
    readTime: '5 min read',
    date: 'Apr 10, 2025',
    gradient: 'from-pink-600/20 to-rose-600/15',
  },
  {
    slug: 'diversify-creator-revenue',
    title: '5 Revenue Streams Every Creator Should Automate (And How AI Does It For You)',
    excerpt: "Ad revenue is fragile. The creators building 7-figure businesses have 5+ revenue streams. Here's how to build them all without adding 40 hours to your week.",
    category: 'Creator Business',
    readTime: '7 min read',
    date: 'Apr 7, 2025',
    gradient: 'from-orange-600/20 to-amber-600/15',
  },
  {
    slug: 'approval-only-workflow',
    title: "The 'Approval-Only' Workflow: How Top Creators Stay In Control While Automating Everything",
    excerpt: "Automation doesn't mean losing your voice. The best AI-powered creators review and approve everything—they just don't create it from scratch. Here's the exact workflow.",
    category: 'AI Operations',
    readTime: '9 min read',
    date: 'Apr 3, 2025',
    gradient: 'from-violet-600/20 to-purple-600/15',
  },
  {
    slug: 'partnership-outreach-cold-email',
    title: 'Why Cold Emails to Brands Almost Never Work (And What Does)',
    excerpt: "Generic outreach gets ignored. AI-personalized pitches that lead with audience data get meetings. A deep dive into what makes brand partnerships actually convert in 2025.",
    category: 'Partnerships & Revenue',
    readTime: '10 min read',
    date: 'Mar 28, 2025',
    gradient: 'from-cyan-600/20 to-sky-600/15',
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = POSTS.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="bg-[#0F172A]">
      {/* Hero */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 30% 50%, #2563EB, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 relative">
          <Fade><Badge pulse variant="blue">ContentFlow Blog</Badge></Fade>
          <Fade delay={80}>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Insights for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">modern creators</span>
            </h1>
          </Fade>
          <Fade delay={160}>
            <p className="mt-4 text-slate-400 text-lg">Strategies, case studies, and deep dives for creators who want to work smarter.</p>
          </Fade>
        </div>
      </section>

      {/* Search + filter */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-xl border border-slate-600 bg-[#1e293b] pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${activeCategory === cat ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'bg-white/5 text-slate-400 border border-white/8 hover:border-white/20 hover:text-white'}`}
                  >
                    <Tag className="h-3 w-3" />{cat}
                  </button>
                ))}
              </div>
            </div>
          </Fade>

          {/* Featured */}
          {featured && (
            <Fade delay={80}>
              <GlassCard hover className={`p-8 mb-8 bg-gradient-to-br ${featured.gradient} border-white/10`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-yellow-500/20 border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-300">✦ Featured</span>
                  <span className="rounded-full bg-white/8 border border-white/12 px-3 py-1 text-xs text-slate-400">{featured.category}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 max-w-2xl">{featured.title}</h2>
                <p className="text-slate-300 leading-relaxed mb-5 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                  <Link to={`/blog/${featured.slug}`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassCard>
            </Fade>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <Fade key={post.slug} delay={i * 60}>
                <GlassCard hover className={`p-6 flex flex-col bg-gradient-to-br ${post.gradient} border-white/8`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5 text-xs text-slate-400">{post.category}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 leading-snug flex-1">{post.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readTime}</span>
                    <Link to={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </GlassCard>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#080E1A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <Fade>
            <h2 className="text-3xl font-bold text-white mb-3">Stay ahead of the curve</h2>
            <p className="text-slate-400 mb-6 text-sm">Weekly insights on AI, content creation, and the creator economy. No spam.</p>
            <div className="flex gap-2">
              <input placeholder="your@email.com" className="flex-1 rounded-xl border border-slate-600 bg-[#1e293b] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
              <GradientButton size="md">Subscribe <ArrowRight className="h-4 w-4" /></GradientButton>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
}
