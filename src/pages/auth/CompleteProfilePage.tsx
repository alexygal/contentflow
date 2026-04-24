import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import BrandProfileForm, { BrandProfile, defaultBrandProfile } from '../../components/BrandProfileForm';
import { api } from '../../utils/api';
import { Alert } from '../../components/ui';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<BrandProfile>(defaultBrandProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const update = (updates: Partial<BrandProfile>) => setBrand(prev => ({ ...prev, ...updates }));

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await api.put('/api/users/me/brand', { brand_profile: brand });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0F172A] text-white"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #2563EB, #EC4899)' }}
            >
              CF
            </div>
            <span className="text-white font-bold text-sm">ContentFlow</span>
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Skip for now →
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-24">

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/15 border border-blue-500/25 px-3 py-1 text-xs text-blue-300 mb-4">
            <Sparkles className="h-3 w-3" />
            AI Brand Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Complete Your Brand Profile
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Help ContentFlow's AI learn your brand, audience, and style. The more you fill in, the more personalized your scripts, edits, and brand partnerships will be.
          </p>
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              '✓ AI scripts in your exact voice',
              '✓ Video edits that match your style',
              '✓ Brand partnerships matched to your audience',
            ].map(item => (
              <span key={item} className="text-sm text-slate-400">{item}</span>
            ))}
          </div>
        </div>

        {error && <Alert variant="error" onClose={() => setError('')} className="mb-6">{error}</Alert>}

        {/* The comprehensive form */}
        <BrandProfileForm brand={brand} onChange={update} />

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 50%, #9333ea 80%, #EC4899 100%)' }}
          >
            {saving ? 'Saving…' : <><span>Save & go to Dashboard</span><ArrowRight className="h-4 w-4" /></>}
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="sm:w-52 py-3.5 rounded-xl border border-white/15 text-slate-300 font-semibold text-sm hover:border-white/30 hover:text-white transition-all"
          >
            Skip for now
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-3 text-center">
          You can always update your brand profile later in Settings → Brand Profile.
        </p>
      </div>
    </div>
  );
}
