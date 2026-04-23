import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Play, X } from 'lucide-react';

// ─── Fade ────────────────────────────────────────────────────────────────────

export function Fade({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── GlassCard ───────────────────────────────────────────────────────────────

export function GlassCard({
  children,
  className = '',
  highlighted = false,
  hover = false,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
  hover?: boolean;
  onClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>) {
  return (
    <div
      onClick={onClick}
      {...rest}
      className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        highlighted
          ? 'bg-[#1a2744] border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.25)]'
          : `bg-white/3 border-white/8 ${hover ? 'hover:bg-white/6 hover:border-white/15 hover:scale-[1.01]' : ''}`
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────

export function SectionHeader({
  pre,
  heading,
  accent,
  sub,
  left = false,
}: {
  pre?: string;
  heading: string;
  accent: string;
  sub?: string;
  left?: boolean;
}) {
  return (
    <div className={`mb-14 ${left ? 'max-w-xl' : 'max-w-2xl mx-auto text-center'}`}>
      {pre && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">{pre}</p>}
      <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-100 md:text-[2.6rem]">
        {heading}{' '}
        <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">{accent}</span>
      </h2>
      {sub && <p className="text-lg leading-relaxed text-slate-400">{sub}</p>}
    </div>
  );
}

// ─── GradientButton ──────────────────────────────────────────────────────────

export function GradientButton({
  children,
  onClick,
  type = 'button',
  size = 'md',
  disabled = false,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}) {
  const sizes = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative overflow-hidden rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${sizes[size]} ${className}`}
      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 55%, #9333ea 85%, #EC4899 100%)' }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

// ─── OutlineButton ───────────────────────────────────────────────────────────

export function OutlineButton({
  children,
  onClick,
  type = 'button',
  size = 'md',
  danger = false,
  disabled = false,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  danger?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3.5 text-base' };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 ${
        danger
          ? 'bg-red-600/10 border border-red-500/40 text-red-400 hover:bg-red-600/20'
          : 'bg-white/8 border border-white/15 text-white hover:bg-white/15'
      } ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────

export function Input({
  label,
  error,
  className = '',
  ...props
}: { label?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <input
        {...props}
        className={`rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-200 ${
          error
            ? 'border-red-500/60 bg-red-900/30 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
            : 'border-slate-600 bg-[#1e293b] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        } ${className}`}
      />
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── TextArea ────────────────────────────────────────────────────────────────

export function TextArea({
  label,
  error,
  rows = 4,
  className = '',
  ...props
}: { label?: string; error?: string; rows?: number } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <textarea
        rows={rows}
        {...props}
        className={`resize-none rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition-all duration-200 ${
          error ? 'border-red-500/60 bg-red-900/30' : 'border-slate-600 bg-[#1e293b] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        } ${className}`}
      />
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Select ──────────────────────────────────────────────────────────────────

export function Select({
  label,
  error,
  options,
  className = '',
  ...props
}: {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <select
        {...props}
        className={`rounded-xl border px-4 py-3 text-sm text-white bg-[#1e293b] outline-none transition-all duration-200 ${
          error ? 'border-red-500/60' : 'border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        } ${className}`}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="mt-0.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

type BadgeVariant = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'slate';

export function Badge({
  children,
  pulse = false,
  variant = 'blue',
}: {
  children: React.ReactNode;
  pulse?: boolean;
  variant?: BadgeVariant;
}) {
  const cls: Record<BadgeVariant, string> = {
    blue:   'bg-blue-600/15 border-blue-500/30 text-blue-300',
    green:  'bg-green-600/15 border-green-500/30 text-green-300',
    yellow: 'bg-yellow-600/15 border-yellow-500/30 text-yellow-300',
    red:    'bg-red-600/15 border-red-500/30 text-red-300',
    purple: 'bg-purple-600/15 border-purple-500/30 text-purple-300',
    slate:  'bg-slate-600/15 border-slate-500/30 text-slate-400',
  };
  const dot: Record<BadgeVariant, string> = {
    blue: 'bg-blue-400', green: 'bg-green-400', yellow: 'bg-yellow-400',
    red: 'bg-red-400', purple: 'bg-purple-400', slate: 'bg-slate-400',
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${cls[variant]}`}>
      {pulse && <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${dot[variant]}`} />}
      {children}
    </div>
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────────

export function Alert({
  children,
  variant = 'success',
  onClose,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'info';
  onClose?: () => void;
  className?: string;
}) {
  const styles = {
    success: 'bg-green-500/20 border-green-500/40 text-green-300',
    error:   'bg-red-500/20 border-red-500/40 text-red-300',
    info:    'bg-blue-500/20 border-blue-500/40 text-blue-300',
  };
  return (
    <div className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${styles[variant]} ${className}`}>
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-sm font-medium flex-1">{children}</p>
      {onClose && (
        <button onClick={onClose} className="ml-auto opacity-60 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return <div className={`animate-spin rounded-full border-2 border-transparent border-t-blue-500 ${s[size]}`} />;
}

// ─── StatCard ────────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  trend,
  trendUp,
  icon,
  sub,
}: {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  sub?: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-400">{label}</p>
        {icon && (
          <div className="h-9 w-9 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
            {icon}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {sub && <p className="text-xs text-slate-500 mb-1">{sub}</p>}
      {trend && (
        <p className={`text-xs font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </GlassCard>
  );
}

// ─── Logo ────────────────────────────────────────────────────────────────────

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
        <Play className="h-4 w-4 text-white fill-white" />
      </div>
      <span className="font-bold text-white tracking-tight text-lg">ContentFlow</span>
    </div>
  );
}

// ─── PageWrapper ─────────────────────────────────────────────────────────────

export function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`min-h-screen bg-[#0F172A] text-slate-100 antialiased ${className}`}
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {children}
    </div>
  );
}

// ─── TabBar ──────────────────────────────────────────────────────────────────

export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-white/5 border border-white/8 p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            active === tab.id
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`rounded-full px-1.5 py-0.5 text-xs ${active === tab.id ? 'bg-blue-500/30 text-blue-200' : 'bg-white/10 text-slate-500'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── StatusPill ──────────────────────────────────────────────────────────────

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    published:   'bg-green-500/20 text-green-400 border border-green-500/30',
    processing:  'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    scheduled:   'bg-violet-500/20 text-violet-400 border border-violet-500/30',
    draft:       'bg-slate-500/20 text-slate-400 border border-slate-500/30',
    pending:     'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    approved:    'bg-green-500/20 text-green-400 border border-green-500/30',
    rejected:    'bg-red-500/20 text-red-400 border border-red-500/30',
    active:      'bg-green-500/20 text-green-400 border border-green-500/30',
    negotiating: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    closed:      'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    identified:  'bg-slate-500/20 text-slate-400 border border-slate-500/30',
  };
  const cls = map[status.toLowerCase()] ?? 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${cls}`}>{status}</span>;
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${checked ? 'bg-blue-600' : 'bg-white/15'}`}
    >
      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}
