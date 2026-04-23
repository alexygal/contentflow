import React, { useState } from 'react';
import {
  Building2, Calendar, ChevronDown, DollarSign,
  FileText, Info, MessageCircle, MessageSquare,
  Palette, Settings, Upload, Users, Video,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BrandProfile {
  // Section 1: Basic Brand Info
  brandName: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  website: string;
  // Section 2: Target Audience
  audienceAgeRange: string;
  audienceGender: string;
  audienceLocation: string;
  audienceEducation: string;
  audienceIncome: string;
  audienceInterests: string[];
  // Section 3: Content Style & Tone
  primaryTone: string;
  secondaryTone: string;
  vocabularyLevel: string;
  emojiUsage: string;
  profanityLevel: string;
  storytellingApproach: string;
  humorStyle: string;
  // Section 4: Visual Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontPreference: string;
  designStyle: string;
  colorMood: string;
  // Section 5: Video Editing Preferences
  preferredVideoLength: string;
  preferredPacing: string;
  transitionStyle: string;
  textOverlayFrequency: string;
  musicIntensity: string;
  brollUsage: string;
  preferredCameraAngles: string;
  talkingHeadPreference: string;
  // Section 6: Content Topics & Patterns
  primaryTopic: string;
  secondaryTopics: string;
  seasonalTopics: string;
  recurringFormats: string;
  topicsToAvoid: string;
  bestPerformingTopics: string;
  mostEngagedTopics: string;
  // Section 7: Publishing Preferences
  idealPostingTime: string;
  postingTimezone: string;
  postingFrequency: string;
  preferredPlatforms: string[];
  bestDaysToPost: string[];
  // Section 8: Revenue & Partnership Goals
  followerCount: string;
  revenueGoal: string;
  partnershipInterest: string;
  partnershipTypes: string[];
  targetBrands: string;
  brandsToAvoid: string;
  toolsBudget: string;
  // Section 9: Communication Preferences
  ctaStyle: string;
  includeLinks: string;
  mentionCompetitors: string;
  personalStories: string;
  educationEntertainmentRatio: string;
  // Section 10: Technical Details
  videoResolution: string;
  subtitlePreference: string;
  aspectRatio: string;
  audioQuality: string;
  // Section 11: Additional Context
  channelOriginStory: string;
  longTermVision: string;
  uniqueSellingProposition: string;
  brandValues: string[];
  competitors: string;
  inspirationSources: string;
}

export const defaultBrandProfile: BrandProfile = {
  brandName: '', tagline: '', shortDescription: '', longDescription: '', website: '',
  audienceAgeRange: '', audienceGender: '', audienceLocation: '', audienceEducation: '', audienceIncome: '',
  audienceInterests: [],
  primaryTone: '', secondaryTone: '', vocabularyLevel: '', emojiUsage: '', profanityLevel: '',
  storytellingApproach: '', humorStyle: '',
  primaryColor: '#2563EB', secondaryColor: '#EC4899', accentColor: '#10B981',
  fontPreference: '', designStyle: '', colorMood: '',
  preferredVideoLength: '', preferredPacing: '', transitionStyle: '', textOverlayFrequency: '',
  musicIntensity: '', brollUsage: '', preferredCameraAngles: '', talkingHeadPreference: '',
  primaryTopic: '', secondaryTopics: '', seasonalTopics: '', recurringFormats: '',
  topicsToAvoid: '', bestPerformingTopics: '', mostEngagedTopics: '',
  idealPostingTime: '', postingTimezone: '', postingFrequency: '',
  preferredPlatforms: [], bestDaysToPost: [],
  followerCount: '', revenueGoal: '', partnershipInterest: '', partnershipTypes: [],
  targetBrands: '', brandsToAvoid: '', toolsBudget: '',
  ctaStyle: '', includeLinks: '', mentionCompetitors: '', personalStories: '',
  educationEntertainmentRatio: '',
  videoResolution: '', subtitlePreference: '', aspectRatio: '', audioQuality: '',
  channelOriginStory: '', longTermVision: '', uniqueSellingProposition: '',
  brandValues: [], competitors: '', inspirationSources: '',
};

// ─── Helper Components ──────────────────────────────────────────────────────────

const inputCls = 'w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all';
const textareaCls = `${inputCls} resize-none`;

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
    </div>
  );
}

function Sel({ label, value, onChange, options, hint }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2.5 pr-9 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
        >
          <option value="">Select…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
      </div>
      {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
    </div>
  );
}

function CheckGroup({ options, values, onChange }: { options: string[]; values: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <label
          key={opt}
          className={`flex items-center gap-2 cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors ${
            values.includes(opt)
              ? 'border-blue-500/60 bg-blue-600/10 text-blue-300'
              : 'border-gray-700 bg-[#0f172a] text-slate-300 hover:border-gray-600'
          }`}
        >
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => toggle(opt)}
            className="w-3 h-3 accent-blue-600"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-[#0f172a] px-3 py-2">
        <label className="relative cursor-pointer shrink-0">
          <div className="h-7 w-7 rounded-lg border border-white/20 shadow-inner" style={{ background: value || '#000000' }} />
          <input
            type="color"
            value={value || '#000000'}
            onChange={e => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm outline-none font-mono placeholder:text-slate-500"
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[#1e293b]/50 hover:bg-[#1e293b]/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-400 shrink-0">{icon}</div>
          <span className="text-sm font-semibold text-white">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 py-5 space-y-4 border-t border-gray-700/40">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export interface BrandProfileFormProps {
  brand: BrandProfile;
  onChange: (updates: Partial<BrandProfile>) => void;
}

export default function BrandProfileForm({ brand, onChange }: BrandProfileFormProps) {
  const s = <K extends keyof BrandProfile>(key: K) =>
    (val: BrandProfile[K]) => onChange({ [key]: val } as Partial<BrandProfile>);
  const t = (key: keyof BrandProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value } as Partial<BrandProfile>);

  return (
    <div className="space-y-3">

      {/* ── 1. Basic Brand Info ── */}
      <Section title="Basic Brand Info" icon={<Building2 className="h-4 w-4" />}>
        <Field label="Brand / Channel name *">
          <input className={inputCls} value={brand.brandName} onChange={t('brandName')} placeholder="e.g. AlexRivera Tech" />
        </Field>
        <Field label="Brand tagline / Motto">
          <input className={inputCls} value={brand.tagline} onChange={t('tagline')} placeholder="e.g. Creating smarter, not harder" />
        </Field>
        <Field label="Short description" hint="One sentence — used in social bios and pitches">
          <input className={inputCls} value={brand.shortDescription} onChange={t('shortDescription')} placeholder="e.g. Tech YouTuber helping creators scale with AI tools" />
        </Field>
        <Field label="Full brand description" hint="2–4 sentences about your mission and what makes you unique">
          <textarea className={textareaCls} rows={4} value={brand.longDescription} onChange={t('longDescription')} placeholder="Describe your brand in depth — your story, mission, and audience..." />
        </Field>
        <Field label="Website URL">
          <input className={inputCls} type="url" value={brand.website} onChange={t('website')} placeholder="https://yourwebsite.com" />
        </Field>
      </Section>

      {/* ── 2. Target Audience ── */}
      <Section title="Target Audience" icon={<Users className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Primary age range" value={brand.audienceAgeRange} onChange={s('audienceAgeRange')}
            options={['Under 18', '18–24', '25–34', '35–49', '50–64', '65+', 'Mixed ages']} />
          <Sel label="Primary gender" value={brand.audienceGender} onChange={s('audienceGender')}
            options={['All genders equally', 'Mostly male', 'Mostly female', 'Non-binary leaning', 'Mixed']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Audience location" value={brand.audienceLocation} onChange={s('audienceLocation')}
            options={['Global', 'North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa', 'United States only', 'UK only']} />
          <Sel label="Education level" value={brand.audienceEducation} onChange={s('audienceEducation')}
            options={['High school', 'College / University', 'Graduate degree', 'Mixed levels']} />
        </div>
        <Sel label="Income level" value={brand.audienceIncome} onChange={s('audienceIncome')}
          options={['Low income', 'Middle income', 'High income', 'Very high income', 'Mixed']} />
        <Field label="Audience interests" hint="Select all that apply">
          <CheckGroup
            options={['Tech', 'Fitness & Health', 'Business', 'Entertainment', 'Finance & Investing', 'Beauty & Fashion', 'Gaming', 'Food & Cooking', 'Travel', 'Education', 'Music', 'Sports', 'Science', 'Art & Design', 'Parenting']}
            values={brand.audienceInterests}
            onChange={s('audienceInterests')}
          />
        </Field>
      </Section>

      {/* ── 3. Content Style & Tone ── */}
      <Section title="Content Style & Tone" icon={<MessageSquare className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Primary tone" value={brand.primaryTone} onChange={s('primaryTone')}
            options={['Professional', 'Casual & Friendly', 'Inspirational', 'Educational', 'Entertaining', 'Funny & Humorous', 'Sarcastic', 'Direct & No-nonsense', 'Empathetic', 'Motivational']} />
          <Sel label="Secondary tone" value={brand.secondaryTone} onChange={s('secondaryTone')}
            options={['None', 'Professional', 'Casual & Friendly', 'Inspirational', 'Educational', 'Entertaining', 'Funny & Humorous', 'Sarcastic', 'Direct & No-nonsense', 'Empathetic', 'Motivational']} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Sel label="Vocabulary level" value={brand.vocabularyLevel} onChange={s('vocabularyLevel')}
            options={['Simple & accessible', 'Moderate', 'Advanced', 'Technical / Jargon-heavy']} />
          <Sel label="Emoji usage" value={brand.emojiUsage} onChange={s('emojiUsage')}
            options={['Never', 'Minimal (1–2)', 'Moderate (3–5)', 'Heavy (6+)']} />
          <Sel label="Profanity level" value={brand.profanityLevel} onChange={s('profanityLevel')}
            options={['None', 'Minimal', 'Moderate', 'Heavy']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Storytelling approach" value={brand.storytellingApproach} onChange={s('storytellingApproach')}
            options={['Data-driven & factual', 'Story-based & narrative', 'Both equally', 'Practical & how-to focused']} />
          <Sel label="Humor style" value={brand.humorStyle} onChange={s('humorStyle')}
            options={['None', 'Dry & subtle', 'Puns & wordplay', 'Self-deprecating', 'Observational', 'Dark humor', 'Absurdist']} />
        </div>
      </Section>

      {/* ── 4. Visual Branding ── */}
      <Section title="Visual Branding" icon={<Palette className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-3 gap-4">
          <ColorPicker label="Primary brand color" value={brand.primaryColor} onChange={s('primaryColor')} />
          <ColorPicker label="Secondary brand color" value={brand.secondaryColor} onChange={s('secondaryColor')} />
          <ColorPicker label="Accent color" value={brand.accentColor} onChange={s('accentColor')} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Sel label="Font preference" value={brand.fontPreference} onChange={s('fontPreference')}
            options={['Modern sans-serif', 'Classic serif', 'Playful display', 'Clean minimalist', 'Bold condensed', 'Monospace']} />
          <Sel label="Design style" value={brand.designStyle} onChange={s('designStyle')}
            options={['Minimal & clean', 'Bold & vibrant', 'Dark & moody', 'Light & airy', 'Corporate & professional', 'Colorful & expressive', 'Retro / Vintage']} />
          <Sel label="Color mood" value={brand.colorMood} onChange={s('colorMood')}
            options={['Warm (reds/oranges/yellows)', 'Cool (blues/purples)', 'Neutral (grays/blacks)', 'Earth tones', 'Mixed']} />
        </div>
      </Section>

      {/* ── 5. Video Editing Preferences ── */}
      <Section title="Video Editing Preferences" icon={<Video className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Preferred video length" value={brand.preferredVideoLength} onChange={s('preferredVideoLength')}
            options={['Very short (< 1 min)', 'Short (1–3 min)', 'Medium (3–10 min)', 'Long (10–30 min)', 'Very long (30+ min)', 'Mixed']} />
          <Sel label="Preferred pacing" value={brand.preferredPacing} onChange={s('preferredPacing')}
            options={['Slow & relaxed', 'Medium', 'Fast & dynamic', 'Variable / Context-dependent']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Transition style" value={brand.transitionStyle} onChange={s('transitionStyle')}
            options={['Minimal (cuts only)', 'Simple transitions', 'Moderate', 'Heavy & fancy']} />
          <Sel label="Text overlay frequency" value={brand.textOverlayFrequency} onChange={s('textOverlayFrequency')}
            options={['Minimal', 'Moderate', 'Heavy']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Music intensity" value={brand.musicIntensity} onChange={s('musicIntensity')}
            options={['No music', 'Soft background', 'Moderate', 'Energetic', 'Very energetic']} />
          <Sel label="B-roll usage" value={brand.brollUsage} onChange={s('brollUsage')}
            options={['None', 'Minimal', 'Moderate', 'Heavy']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Preferred camera angles" value={brand.preferredCameraAngles} onChange={s('preferredCameraAngles')}
            options={['Wide shots', 'Medium shots', 'Close-ups', 'Mix of all']} />
          <Sel label="Talking head preference" value={brand.talkingHeadPreference} onChange={s('talkingHeadPreference')}
            options={['None', 'Minimal (intro/outro only)', 'Moderate', 'Heavy (main content)']} />
        </div>
      </Section>

      {/* ── 6. Content Topics & Patterns ── */}
      <Section title="Content Topics & Patterns" icon={<FileText className="h-4 w-4" />}>
        <Field label="Primary content topic *">
          <input className={inputCls} value={brand.primaryTopic} onChange={t('primaryTopic')} placeholder="e.g. AI tools for content creators" />
        </Field>
        <Field label="Secondary topics" hint="Separate with commas">
          <textarea className={textareaCls} rows={2} value={brand.secondaryTopics} onChange={t('secondaryTopics')} placeholder="e.g. Productivity, Creator monetization, Video editing workflows" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Seasonal / timely topics">
            <textarea className={textareaCls} rows={2} value={brand.seasonalTopics} onChange={t('seasonalTopics')} placeholder="e.g. Year-in-review, Q4 tools guide" />
          </Field>
          <Field label="Recurring formats / series">
            <input className={inputCls} value={brand.recurringFormats} onChange={t('recurringFormats')} placeholder="e.g. Weekly tool review, Monthly creator roundup" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Topics to AVOID">
            <textarea className={textareaCls} rows={2} value={brand.topicsToAvoid} onChange={t('topicsToAvoid')} placeholder="e.g. Politics, religion, highly controversial debates" />
          </Field>
          <Field label="Best-performing topics">
            <textarea className={textareaCls} rows={2} value={brand.bestPerformingTopics} onChange={t('bestPerformingTopics')} placeholder="e.g. AI news breakdowns, tool comparisons, income transparency" />
          </Field>
        </div>
        <Field label="Topics your audience engages with most">
          <input className={inputCls} value={brand.mostEngagedTopics} onChange={t('mostEngagedTopics')} placeholder="e.g. 'How I earn €X with AI' posts, step-by-step tutorials" />
        </Field>
      </Section>

      {/* ── 7. Brand Materials (placeholder) ── */}
      <Section title="Brand Materials" icon={<Upload className="h-4 w-4" />}>
        <p className="text-sm text-slate-400">Upload your brand assets so the AI can learn your exact visual style.</p>
        {[
          { label: 'Past successful videos (3–5 recommended)', hint: 'MP4, MOV — up to 500 MB each' },
          { label: 'Brand guidelines document', hint: 'PDF or DOCX (optional)' },
          { label: 'Brand font files', hint: 'TTF or OTF (optional)' },
        ].map(({ label, hint }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border border-dashed border-gray-700 bg-[#0f172a] px-5 py-4">
            <Upload className="h-5 w-5 text-slate-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-400">{label}</p>
              <p className="text-xs text-slate-600">{hint}</p>
            </div>
            <span className="text-xs text-slate-600 rounded-full border border-slate-700/60 px-2 py-0.5 shrink-0">Coming soon</span>
          </div>
        ))}
      </Section>

      {/* ── 8. Publishing Preferences ── */}
      <Section title="Publishing Preferences" icon={<Calendar className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Posting frequency" value={brand.postingFrequency} onChange={s('postingFrequency')}
            options={['Daily', '5× per week', '3× per week', '2× per week', 'Weekly', 'Biweekly', 'Monthly', 'Flexible']} />
          <Sel label="Timezone" value={brand.postingTimezone} onChange={s('postingTimezone')}
            options={['UTC', 'EST (UTC-5)', 'CST (UTC-6)', 'MST (UTC-7)', 'PST (UTC-8)', 'GMT (UTC+0)', 'CET (UTC+1)', 'IST (UTC+5:30)', 'JST (UTC+9)', 'AEST (UTC+10)']} />
        </div>
        <Field label="Ideal posting time" hint="Local time when your audience is most active">
          <input className={inputCls} type="time" value={brand.idealPostingTime} onChange={t('idealPostingTime')} />
        </Field>
        <Field label="Active platforms" hint="Select all you currently publish on">
          <CheckGroup
            options={['YouTube', 'TikTok', 'Instagram', 'Instagram Reels', 'Facebook', 'LinkedIn', 'Twitter / X', 'Podcast', 'Blog / Newsletter', 'Pinterest', 'Snapchat', 'Twitch']}
            values={brand.preferredPlatforms}
            onChange={s('preferredPlatforms')}
          />
        </Field>
        <Field label="Best days to post">
          <CheckGroup
            options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
            values={brand.bestDaysToPost}
            onChange={s('bestDaysToPost')}
          />
        </Field>
      </Section>

      {/* ── 9. Revenue & Partnership Goals ── */}
      <Section title="Revenue & Partnership Goals" icon={<DollarSign className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Current total followers (across all platforms)">
            <input className={inputCls} value={brand.followerCount} onChange={t('followerCount')} placeholder="e.g. 85,000" />
          </Field>
          <Sel label="Monthly revenue goal" value={brand.revenueGoal} onChange={s('revenueGoal')}
            options={['Under €1,000/mo', '€1,000–5,000/mo', '€5,000–10,000/mo', '€10,000–50,000/mo', '€50,000+/mo']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Interested in brand partnerships?" value={brand.partnershipInterest} onChange={s('partnershipInterest')}
            options={['Yes, actively looking', 'Yes, open to the right ones', 'Not yet / need more followers', 'No']} />
          <Sel label="Tools & services monthly budget" value={brand.toolsBudget} onChange={s('toolsBudget')}
            options={['Under €100/mo', '€100–500/mo', '€500–2,000/mo', '€2,000–5,000/mo', '€5,000+/mo']} />
        </div>
        <Field label="Partnership types preferred">
          <CheckGroup
            options={['Sponsored posts', 'Affiliate marketing', 'Product reviews', 'Brand ambassador', 'Co-created content', 'Event appearances', 'Long-term deals']}
            values={brand.partnershipTypes}
            onChange={s('partnershipTypes')}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Types of brands / companies to target">
            <textarea className={textareaCls} rows={2} value={brand.targetBrands} onChange={t('targetBrands')} placeholder="e.g. SaaS tools, creator economy platforms, productivity apps" />
          </Field>
          <Field label="Brands / companies to AVOID">
            <textarea className={textareaCls} rows={2} value={brand.brandsToAvoid} onChange={t('brandsToAvoid')} placeholder="e.g. gambling, predatory crypto, fast fashion" />
          </Field>
        </div>
      </Section>

      {/* ── 10. Communication Preferences ── */}
      <Section title="Communication Preferences" icon={<MessageCircle className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Call-to-action (CTA) style" value={brand.ctaStyle} onChange={s('ctaStyle')}
            options={['Soft (gentle suggestions)', 'Direct', 'Aggressive / Urgent']} />
          <Sel label="Include links in content" value={brand.includeLinks} onChange={s('includeLinks')}
            options={['Bio / pinned post only', 'Moderately (description/comments)', 'Heavily (throughout content)']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Mention competitors" value={brand.mentionCompetitors} onChange={s('mentionCompetitors')}
            options={['Never', 'Rarely (comparison only)', 'Sometimes', 'Often']} />
          <Sel label="Include personal stories" value={brand.personalStories} onChange={s('personalStories')}
            options={['Never', 'Sometimes (as examples)', 'Often', 'Always (central to brand)']} />
        </div>
        <Sel label="Education vs. Entertainment balance" value={brand.educationEntertainmentRatio} onChange={s('educationEntertainmentRatio')}
          options={['90% Education / 10% Entertainment', '70% / 30%', '50% / 50%', '30% / 70%', '10% Education / 90% Entertainment']} />
      </Section>

      {/* ── 11. Technical Details ── */}
      <Section title="Technical Details" icon={<Settings className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Video resolution" value={brand.videoResolution} onChange={s('videoResolution')}
            options={['720p', '1080p', '4K', 'Mixed depending on content']} />
          <Sel label="Subtitle preference" value={brand.subtitlePreference} onChange={s('subtitlePreference')}
            options={['Always (auto-generated)', 'Always (custom/reviewed)', 'Sometimes', 'Never']} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Sel label="Aspect ratio" value={brand.aspectRatio} onChange={s('aspectRatio')}
            options={['16:9 (landscape / YouTube)', '9:16 (portrait / TikTok)', '1:1 (square)', '4:5 (Instagram portrait)', 'Mixed']} />
          <Sel label="Audio quality standard" value={brand.audioQuality} onChange={s('audioQuality')}
            options={['Podcast-quality', 'YouTube-standard', 'Professional broadcast', 'Context-dependent']} />
        </div>
      </Section>

      {/* ── 12. Additional Context ── */}
      <Section title="Additional Context" icon={<Info className="h-4 w-4" />}>
        <Field label="Why did you start your channel / brand?">
          <textarea className={textareaCls} rows={3} value={brand.channelOriginStory} onChange={t('channelOriginStory')} placeholder="Your origin story helps the AI capture your authentic voice and passion..." />
        </Field>
        <Field label="Long-term vision (1–3 years)">
          <textarea className={textareaCls} rows={3} value={brand.longTermVision} onChange={t('longTermVision')} placeholder="Where do you want to take your brand? What does success look like?" />
        </Field>
        <Field label="Unique selling proposition (USP)" hint="What makes you genuinely different from others in your niche?">
          <textarea className={textareaCls} rows={2} value={brand.uniqueSellingProposition} onChange={t('uniqueSellingProposition')} placeholder="e.g. I'm the only creator who combines real business results with AI education..." />
        </Field>
        <Field label="Core brand values">
          <CheckGroup
            options={['Authenticity', 'Quality', 'Innovation', 'Transparency', 'Community', 'Education', 'Entertainment', 'Empowerment', 'Sustainability', 'Inclusivity', 'Humor & Levity', 'Creativity', 'Results-focused']}
            values={brand.brandValues}
            onChange={s('brandValues')}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Main competitors" hint="List 3–5, one per line">
            <textarea className={textareaCls} rows={3} value={brand.competitors} onChange={t('competitors')} placeholder={'e.g. Creator A\nCreator B\nCreator C'} />
          </Field>
          <Field label="Inspiration sources" hint="Creators, brands, or styles you admire">
            <textarea className={textareaCls} rows={3} value={brand.inspirationSources} onChange={t('inspirationSources')} placeholder="e.g. MrBeast (production quality), MKBHD (depth), Ali Abdaal (tone)" />
          </Field>
        </div>
      </Section>

    </div>
  );
}
