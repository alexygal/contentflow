import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { Logo } from './ui';

type Lang = 'en' | 'fr' | 'es';
const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const NAV_LINKS: Record<Lang, { label: string; to: string }[]> = {
  en: [
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Blog', to: '/blog' },
    { label: 'Help', to: '/help' },
  ],
  fr: [
    { label: 'Fonctionnalités', to: '/features' },
    { label: 'Tarifs', to: '/pricing' },
    { label: 'Blog', to: '/blog' },
    { label: 'Aide', to: '/help' },
  ],
  es: [
    { label: 'Características', to: '/features' },
    { label: 'Precios', to: '/pricing' },
    { label: 'Blog', to: '/blog' },
    { label: 'Ayuda', to: '/help' },
  ],
};

const CTA: Record<Lang, { signin: string; start: string }> = {
  en: { signin: 'Sign in', start: 'Get Started' },
  fr: { signin: 'Connexion', start: 'Commencer' },
  es: { signin: 'Iniciar sesión', start: 'Empezar' },
};

export default function PublicNav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('cf_lang') as Lang | null;
    if (stored && ['en', 'fr', 'es'].includes(stored)) return stored;
    const bl = navigator.language.split('-')[0];
    if (bl === 'fr') return 'fr';
    if (bl === 'es') return 'es';
    return 'en';
  });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const switchLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('cf_lang', l);
    setLangOpen(false);
  };

  const links = NAV_LINKS[lang];
  const cta = CTA[lang];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Lang switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:block">{LANGS.find(l => l.code === lang)?.label}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-[#1E293B] border border-white/10 shadow-2xl overflow-hidden z-50">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${lang === l.code ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      <span>{l.flag}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 font-medium"
            >
              {cta.signin}
            </Link>
            <button
              onClick={() => navigate('/signup')}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
              style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}
            >
              {cta.start}
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F172A]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="mt-1 px-4 py-3 text-slate-300 text-sm hover:text-white hover:bg-white/5 rounded-lg">
            {cta.signin}
          </Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="mt-1 rounded-xl px-4 py-3 text-sm font-semibold text-white text-center" style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}>
            {cta.start}
          </Link>
        </div>
      )}
    </nav>
  );
}
