import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Plus, Trash2, AlertCircle, BarChart3 } from 'lucide-react';

const initialRows = [
  { id: 1, name: 'Paris Hotel (4 nights)', allocated: 880, utilized: 920 },
  { id: 2, name: 'CDG Airport Transfer', allocated: 80, utilized: 75 },
  { id: 3, name: 'Eiffel Tower Tickets', allocated: 70, utilized: 35 },
  { id: 4, name: 'Seine River Cruise', allocated: 50, utilized: 50 },
  { id: 5, name: 'Louvre Museum', allocated: 45, utilized: 22 },
  { id: 6, name: 'Restaurants & Cafés', allocated: 400, utilized: 365 },
  { id: 7, name: 'Local Metro Passes', allocated: 30, utilized: 28 },
  { id: 8, name: 'Shopping & Souvenirs', allocated: 200, utilized: 185 },
];

export default function BudgetTable() {
  const [rows, setRows] = useState(initialRows);
  const [newRow, setNewRow] = useState({ name: '', allocated: '', utilized: '' });

  const addRow = () => {
    if (!newRow.name || !newRow.allocated) return;
    setRows(p => [...p, { id: Date.now(), name: newRow.name, allocated: parseFloat(newRow.allocated) || 0, utilized: parseFloat(newRow.utilized) || 0 }]);
    setNewRow({ name: '', allocated: '', utilized: '' });
  };
  const removeRow = (id) => setRows(p => p.filter(r => r.id !== id));

  const totalAllocated = rows.reduce((s, r) => s + r.allocated, 0);
  const totalUtilized = rows.reduce((s, r) => s + r.utilized, 0);
  const totalDiff = totalAllocated - totalUtilized;

  const diffColor = (diff) => diff >= 0 ? 'text-emerald-400' : 'text-red-400';
  const diffBg = (diff) => diff >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10';

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-2"><BarChart3 size={28} className="text-primary" /> Budget Tracker</h1>
          <p className="text-slate-400 mt-1">Trip to Paris, France · Jun 12 – Jun 24, 2025</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: 'Total Allocated', value: `$${totalAllocated.toLocaleString()}`, icon: DollarSign, color: 'from-primary to-indigo-600', sub: 'planned budget' },
            { label: 'Total Utilized', value: `$${totalUtilized.toLocaleString()}`, icon: TrendingUp, color: 'from-secondary to-pink-600', sub: 'actual spend' },
            { label: totalDiff >= 0 ? 'Under Budget' : 'Over Budget', value: `$${Math.abs(totalDiff).toLocaleString()}`, icon: totalDiff >= 0 ? TrendingDown : AlertCircle, color: totalDiff >= 0 ? 'from-emerald-500 to-teal-500' : 'from-red-500 to-rose-600', sub: totalDiff >= 0 ? 'remaining' : 'overspent' },
          ].map(({ label, value, icon: Icon, color, sub }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-5">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={22} className="text-white" />
              </div>
              <p className="text-3xl font-extrabold">{value}</p>
              <p className="text-slate-500 text-sm mt-1">{label}</p>
              <p className="text-slate-600 text-xs mt-0.5">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Budget Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 text-xs text-slate-500 uppercase tracking-widest font-semibold px-6 py-3 border-b border-white/10 bg-slate-950/50">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Place / Activity</div>
            <div className="col-span-2 text-right">Allocated</div>
            <div className="col-span-2 text-right">Utilized</div>
            <div className="col-span-2 text-right">Difference</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {rows.map((row, i) => {
              const diff = row.allocated - row.utilized;
              return (
                <motion.div key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="group grid grid-cols-12 items-center px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className="col-span-1 text-slate-600 text-sm font-mono">{i + 1}</div>
                  <div className="col-span-5 font-medium text-sm">{row.name}</div>
                  <div className="col-span-2 text-right font-semibold text-sm">${row.allocated.toLocaleString()}</div>
                  <div className="col-span-2 text-right font-semibold text-sm text-slate-300">${row.utilized.toLocaleString()}</div>
                  <div className={`col-span-1 text-right font-bold text-sm ${diffColor(diff)}`}>
                    {diff >= 0 ? '+' : '-'}${Math.abs(diff)}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button onClick={() => removeRow(row.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Add New Row */}
          <div className="grid grid-cols-12 items-center gap-2 px-6 py-4 border-t border-white/10 bg-slate-950/30">
            <div className="col-span-1 text-slate-700 text-sm font-mono">{rows.length + 1}</div>
            <div className="col-span-5">
              <input value={newRow.name} onChange={e => setNewRow(p => ({ ...p, name: e.target.value }))} placeholder="Add item name..."
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-slate-600" />
            </div>
            <div className="col-span-2">
              <input value={newRow.allocated} onChange={e => setNewRow(p => ({ ...p, allocated: e.target.value }))} placeholder="$0" type="number"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-slate-600" />
            </div>
            <div className="col-span-2">
              <input value={newRow.utilized} onChange={e => setNewRow(p => ({ ...p, utilized: e.target.value }))} placeholder="$0" type="number"
                className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-slate-600" />
            </div>
            <div className="col-span-2 flex justify-end">
              <button onClick={addRow}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-transform">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Totals Row */}
          <div className="grid grid-cols-12 items-center px-6 py-4 border-t-2 border-white/20 bg-slate-950/80 font-bold">
            <div className="col-span-1" />
            <div className="col-span-5 text-sm uppercase tracking-wider text-slate-300">Total</div>
            <div className="col-span-2 text-right text-primary">${totalAllocated.toLocaleString()}</div>
            <div className="col-span-2 text-right text-slate-300">${totalUtilized.toLocaleString()}</div>
            <div className={`col-span-2 text-right ${diffColor(totalDiff)}`}>
              <span className={`px-3 py-1 rounded-full text-sm ${diffBg(totalDiff)}`}>{totalDiff >= 0 ? '+' : ''}${totalDiff.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Budget Usage Bar */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Budget Utilization</h3>
            <span className="text-sm text-slate-400">{Math.round((totalUtilized / totalAllocated) * 100)}% used</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <motion.div className={`h-full rounded-full ${totalUtilized > totalAllocated ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-primary to-secondary'}`}
              initial={{ width: 0 }} animate={{ width: `${Math.min((totalUtilized / totalAllocated) * 100, 100)}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>$0</span><span>${totalAllocated.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
