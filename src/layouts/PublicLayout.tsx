import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Instagram, Linkedin, Play, Twitter, Youtube } from 'lucide-react';
import PublicNav from '../components/PublicNav';
import { PageWrapper } from '../components/ui';

function PublicFooter() {
  const cols = [
    {
      heading: 'Product',
      links: [
        { label: 'Features', to: '/features' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'Blog', to: '/blog' },
        { label: 'Help', to: '/help' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', to: '#' },
        { label: 'Careers', to: '#' },
        { label: 'Contact', to: '#' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '#' },
        { label: 'Terms of Service', to: '#' },
        { label: 'Cookie Policy', to: '#' },
      ],
    },
  ];

  const socials = [
    { icon: <Twitter className="h-4 w-4" />, href: '#' },
    { icon: <Youtube className="h-4 w-4" />, href: '#' },
    { icon: <Instagram className="h-4 w-4" />, href: '#' },
    { icon: <Linkedin className="h-4 w-4" />, href: '#' },
  ];

  return (
    <footer className="bg-[#080E1A] border-t border-white/5 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="font-bold text-white tracking-tight text-lg">ContentFlow</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              AI-powered video editing for creators who want to scale without scaling their workload.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="h-8 w-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-slate-500 text-sm hover:text-slate-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">© 2026 ContentFlow. All rights reserved.</p>
          <p className="text-slate-700 text-xs">Made with ♥ for creators worldwide</p>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  return (
    <PageWrapper>
      <PublicNav />
      <main className="pt-16">
        <Outlet />
      </main>
      <PublicFooter />
    </PageWrapper>
  );
}
