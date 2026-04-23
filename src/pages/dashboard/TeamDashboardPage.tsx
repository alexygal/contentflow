import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Alert, GlassCard, GradientButton, OutlineButton } from '../../components/ui';

interface Project {
  name: string;
  progress: number;
  color: string;
}

interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  spent: number;
}

interface ProspectItem {
  id: string;
  brand: string;
  contact: string;
  status: 'Contacted' | 'In Discussion' | 'Negotiating' | 'Closed' | 'Rejected';
  value: string;
  notes: string;
}

interface TeamNotes {
  alex: string;
  ami1: string;
  ami2: string;
}

interface DashboardData {
  projects: Project[];
  budget: BudgetItem[];
  prospects: ProspectItem[];
  notes: TeamNotes;
}

const MOCK_DATA: DashboardData = {
  projects: [
    { name: 'Frontend', progress: 85, color: 'bg-blue-500' },
    { name: 'Backend', progress: 70, color: 'bg-violet-500' },
    { name: 'AI Agents', progress: 60, color: 'bg-emerald-500' },
    { name: 'Deployment', progress: 40, color: 'bg-orange-500' },
  ],
  budget: [
    { id: 'b1', category: 'Development', allocated: 15000, spent: 11200 },
    { id: 'b2', category: 'Marketing', allocated: 5000, spent: 2300 },
    { id: 'b3', category: 'Infrastructure', allocated: 3000, spent: 1850 },
  ],
  prospects: [
    { id: 'p1', brand: 'TechBrand A', contact: 'james@techbrand.com', status: 'In Discussion', value: '€2,500', notes: 'Intro call scheduled' },
    { id: 'p2', brand: 'Creator Tools Co', contact: 'sarah@creatortools.io', status: 'Negotiating', value: '€4,000', notes: 'Awaiting contract' },
    { id: 'p3', brand: 'SaaS Platform X', contact: 'mike@saasx.com', status: 'Contacted', value: '€1,800', notes: 'Sent proposal' },
  ],
  notes: { alex: '', ami1: '', ami2: '' },
};

const STATUS_COLORS: Record<ProspectItem['status'], string> = {
  Contacted: 'bg-slate-500/20 text-slate-300',
  'In Discussion': 'bg-blue-500/20 text-blue-300',
  Negotiating: 'bg-yellow-500/20 text-yellow-300',
  Closed: 'bg-green-500/20 text-green-300',
  Rejected: 'bg-red-500/20 text-red-300',
};

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem('cf_token')}` };
}

export default function TeamDashboardPage() {
  const [data, setData] = useState<DashboardData>(MOCK_DATA);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/team/dashboard', { headers: authHeader() })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/team/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || 'Failed to save');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateProject = (i: number, progress: number) => {
    setData(d => {
      const projects = [...d.projects];
      projects[i] = { ...projects[i], progress: Math.min(100, Math.max(0, progress)) };
      return { ...d, projects };
    });
  };

  const addBudgetItem = () => {
    setData(d => ({
      ...d,
      budget: [...d.budget, { id: 'b' + Date.now(), category: 'New Category', allocated: 0, spent: 0 }],
    }));
  };

  const updateBudget = (id: string, field: keyof BudgetItem, value: string | number) => {
    setData(d => ({
      ...d,
      budget: d.budget.map(b => b.id === id ? { ...b, [field]: value } : b),
    }));
  };

  const deleteBudget = (id: string) => {
    setData(d => ({ ...d, budget: d.budget.filter(b => b.id !== id) }));
  };

  const addProspect = () => {
    setData(d => ({
      ...d,
      prospects: [...d.prospects, { id: 'p' + Date.now(), brand: '', contact: '', status: 'Contacted', value: '', notes: '' }],
    }));
  };

  const updateProspect = (id: string, field: keyof ProspectItem, value: string) => {
    setData(d => ({
      ...d,
      prospects: d.prospects.map(p => p.id === id ? { ...p, [field]: value } : p),
    }));
  };

  const deleteProspect = (id: string) => {
    setData(d => ({ ...d, prospects: d.prospects.filter(p => p.id !== id) }));
  };

  const totalAllocated = data.budget.reduce((s, b) => s + Number(b.allocated), 0);
  const totalSpent = data.budget.reduce((s, b) => s + Number(b.spent), 0);

  return (
    <div className="p-6 lg:p-8 max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Track progress, budget, and outreach</p>
        </div>
        <GradientButton size="md" onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Sauvegarder Tout'}
        </GradientButton>
      </div>

      {saved && <Alert variant="success" onClose={() => setSaved(false)}>Changes saved successfully</Alert>}
      {saveError && <Alert variant="error" onClose={() => setSaveError('')}>{saveError}</Alert>}

      {/* Project Progress */}
      <GlassCard className="p-6">
        <h2 className="text-white font-semibold mb-5">Project Progress</h2>
        <div className="space-y-5">
          {data.projects.map((proj, i) => {
            const pct = Number(proj.progress) || 0;
            return (
              <div key={proj.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">{proj.name}</span>
                  <div className="flex items-center gap-3">
                    {pct >= 100
                      ? <CheckCircle className="h-4 w-4 text-green-400" />
                      : pct < 30
                      ? <AlertCircle className="h-4 w-4 text-orange-400" />
                      : null}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={pct}
                      onChange={e => updateProject(i, Number(e.target.value))}
                      className="w-28 accent-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-white w-10 text-right tabular-nums">{pct}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${proj.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Budget Tracker */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold">Budget Tracker</h2>
          <OutlineButton size="sm" onClick={addBudgetItem}>
            <Plus className="h-3.5 w-3.5 mr-1" />Add row
          </OutlineButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500 border-b border-white/8">
                <th className="text-left pb-3 font-medium">Category</th>
                <th className="text-right pb-3 font-medium">Allocated (€)</th>
                <th className="text-right pb-3 font-medium">Spent (€)</th>
                <th className="text-right pb-3 font-medium">Remaining</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.budget.map(b => {
                const rem = Number(b.allocated) - Number(b.spent);
                return (
                  <tr key={b.id} className="group">
                    <td className="py-3 pr-4">
                      <input
                        value={b.category}
                        onChange={e => updateBudget(b.id, 'category', e.target.value)}
                        className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-200 w-full transition-colors py-0.5"
                      />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <input
                        type="number"
                        value={b.allocated}
                        onChange={e => updateBudget(b.id, 'allocated', Number(e.target.value))}
                        className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-200 w-24 text-right transition-colors py-0.5"
                      />
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <input
                        type="number"
                        value={b.spent}
                        onChange={e => updateBudget(b.id, 'spent', Number(e.target.value))}
                        className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-200 w-24 text-right transition-colors py-0.5"
                      />
                    </td>
                    <td className={`py-3 pr-4 text-right font-medium ${rem < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      €{rem.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => deleteBudget(b.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 text-sm font-semibold">
                <td className="pt-3 text-slate-300">Total</td>
                <td className="pt-3 text-right text-white">€{totalAllocated.toLocaleString()}</td>
                <td className="pt-3 text-right text-white">€{totalSpent.toLocaleString()}</td>
                <td className={`pt-3 text-right ${totalAllocated - totalSpent < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  €{(totalAllocated - totalSpent).toLocaleString()}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>

      {/* Prospection Table */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold">Outreach & Prospection</h2>
          <OutlineButton size="sm" onClick={addProspect}>
            <Plus className="h-3.5 w-3.5 mr-1" />Add prospect
          </OutlineButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-500 border-b border-white/8">
                <th className="text-left pb-3 font-medium">Brand</th>
                <th className="text-left pb-3 font-medium">Contact</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Value</th>
                <th className="text-left pb-3 font-medium">Notes</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.prospects.map(p => (
                <tr key={p.id} className="group">
                  <td className="py-3 pr-3">
                    <input
                      value={p.brand}
                      onChange={e => updateProspect(p.id, 'brand', e.target.value)}
                      placeholder="Brand name"
                      className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-200 placeholder:text-slate-600 w-full transition-colors py-0.5"
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <input
                      value={p.contact}
                      onChange={e => updateProspect(p.id, 'contact', e.target.value)}
                      placeholder="email@brand.com"
                      className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-400 placeholder:text-slate-600 w-full text-xs transition-colors py-0.5"
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <select
                      value={p.status}
                      onChange={e => updateProspect(p.id, 'status', e.target.value)}
                      className="bg-[#1e293b] border border-white/10 rounded-lg px-2 py-1 text-xs outline-none focus:border-blue-500 transition-colors text-slate-200"
                    >
                      {Object.keys(STATUS_COLORS).map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-3 pr-3">
                    <input
                      value={p.value}
                      onChange={e => updateProspect(p.id, 'value', e.target.value)}
                      placeholder="€0"
                      className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-200 placeholder:text-slate-600 w-20 transition-colors py-0.5"
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <input
                      value={p.notes}
                      onChange={e => updateProspect(p.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      className="bg-transparent border-0 border-b border-transparent hover:border-white/20 focus:border-blue-500 outline-none text-slate-400 placeholder:text-slate-600 w-full text-xs transition-colors py-0.5"
                    />
                  </td>
                  <td className="py-3">
                    <button onClick={() => deleteProspect(p.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.prospects.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-600 text-sm">No prospects yet. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Team Notes */}
      <div className="grid md:grid-cols-3 gap-4">
        {([
          { key: 'alex', label: 'Alex' },
          { key: 'ami1', label: 'Ami 1' },
          { key: 'ami2', label: 'Ami 2' },
        ] as { key: keyof TeamNotes; label: string }[]).map(({ key, label }) => (
          <GlassCard key={key} className="p-5">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">{label}'s Notes</h3>
            <textarea
              value={data.notes[key]}
              onChange={e => setData(d => ({ ...d, notes: { ...d.notes, [key]: e.target.value } }))}
              placeholder={`${label}'s notes...`}
              rows={8}
              className="w-full bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none resize-none leading-relaxed"
            />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
