import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Play } from 'lucide-react';
import { PageWrapper } from '../components/ui';

export default function AuthLayout() {
  return (
    <PageWrapper className="flex flex-col">
      {/* Atmospheric glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #2563EB, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #EC4899, transparent)', filter: 'blur(80px)' }} />
      </div>

      {/* Nav bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">ContentFlow</span>
        </Link>
        <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to site</Link>
      </header>

      {/* Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </main>

      <footer className="relative z-10 py-6 text-center">
        <p className="text-slate-600 text-xs">© 2025 ContentFlow · <Link to="#" className="hover:text-slate-400">Privacy</Link> · <Link to="#" className="hover:text-slate-400">Terms</Link></p>
      </footer>
    </PageWrapper>
  );
}
