import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, Plus, X, Package, Zap, FileText, Shirt, Laptop } from 'lucide-react';

const initialCategories = {
  Clothing: [
    { id: 1, text: '3x T-Shirts', done: true },
    { id: 2, text: 'Jeans / Trousers', done: true },
    { id: 3, text: 'Waterproof Jacket', done: false },
    { id: 4, text: 'Comfortable Shoes', done: false },
  ],
  Electronics: [
    { id: 5, text: 'Laptop & Charger', done: true },
    { id: 6, text: 'Power Bank 20000mAh', done: false },
    { id: 7, text: 'Universal Adapter', done: false },
    { id: 8, text: 'Headphones', done: true },
  ],
  Documents: [
    { id: 9, text: 'Passport (valid 6+ months)', done: true },
    { id: 10, text: 'Travel Insurance', done: false },
    { id: 11, text: 'Hotel Bookings (printed)', done: false },
    { id: 12, text: 'Visa Documents', done: true },
  ],
  Essentials: [
    { id: 13, text: 'Sunscreen SPF 50+', done: false },
    { id: 14, text: 'First Aid Kit', done: false },
    { id: 15, text: 'Reusable Water Bottle', done: true },
    { id: 16, text: 'Hand Sanitizer', done: true },
  ]
};

const categoryMeta = {
  Clothing: { icon: Shirt, color: 'from-pink-500 to-rose-500' },
  Electronics: { icon: Laptop, color: 'from-blue-500 to-cyan-400' },
  Documents: { icon: FileText, color: 'from-amber-500 to-orange-500' },
  Essentials: { icon: Package, color: 'from-emerald-500 to-teal-500' },
};

export default function PackingChecklist() {
  const [categories, setCategories] = useState(initialCategories);
  const [newItem, setNewItem] = useState({});
  const [activeCategory, setActiveCategory] = useState('Clothing');

  const toggle = (cat, id) => setCategories(p => ({ ...p, [cat]: p[cat].map(i => i.id === id ? { ...i, done: !i.done } : i) }));
  const remove = (cat, id) => setCategories(p => ({ ...p, [cat]: p[cat].filter(i => i.id !== id) }));
  const addItem = (cat) => {
    if (!newItem[cat]?.trim()) return;
    setCategories(p => ({ ...p, [cat]: [...p[cat], { id: Date.now(), text: newItem[cat].trim(), done: false }] }));
    setNewItem(p => ({ ...p, [cat]: '' }));
  };

  const allItems = Object.values(categories).flat();
  const doneCount = allItems.filter(i => i.done).length;
  const progress = Math.round((doneCount / allItems.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2"><Package size={28} className="text-primary" /> Packing Checklist</h1>
            <p className="text-slate-400 mt-1">Trip to Paris · Jun 12 – Jun 24, 2025</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-primary">{progress}%</p>
            <p className="text-slate-500 text-sm">packed ({doneCount}/{allItems.length})</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {Object.keys(categories).map(cat => {
            const { icon: Icon, color } = categoryMeta[cat];
            const catDone = categories[cat].filter(i => i.done).length;
            const catTotal = categories[cat].length;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold shrink-0 border transition-all ${activeCategory === cat ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg` : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'}`}>
                <Icon size={15} /> {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeCategory === cat ? 'bg-white/20' : 'bg-white/5'}`}>{catDone}/{catTotal}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category List */}
        <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
          {/* Category Header */}
          <div className={`p-4 flex items-center gap-3 bg-gradient-to-r ${categoryMeta[activeCategory].color} bg-opacity-20`}>
            {(() => { const Icon = categoryMeta[activeCategory].icon; return <Icon size={20} className="text-white" />; })()}
            <span className="font-bold text-lg">{activeCategory}</span>
            <span className="ml-auto text-sm text-white/70">{categories[activeCategory].filter(i => i.done).length} of {categories[activeCategory].length} done</span>
          </div>

          {/* Items */}
          <div className="divide-y divide-white/5">
            {categories[activeCategory].map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors group">
                <button onClick={() => toggle(activeCategory, item.id)} className="shrink-0">
                  {item.done
                    ? <CheckSquare size={22} className="text-primary" fill="rgba(99,102,241,0.2)" />
                    : <Square size={22} className="text-slate-600 hover:text-slate-400 transition-colors" />}
                </button>
                <span className={`flex-1 font-medium transition-all ${item.done ? 'line-through text-slate-500' : 'text-white'}`}>{item.text}</span>
                <button onClick={() => remove(activeCategory, item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <X size={15} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Add New Item */}
          <div className="flex gap-2 p-4 border-t border-white/10">
            <input
              value={newItem[activeCategory] || ''}
              onChange={e => setNewItem(p => ({ ...p, [activeCategory]: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addItem(activeCategory)}
              placeholder={`Add item to ${activeCategory}...`}
              className="flex-1 px-4 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-slate-600" />
            <button onClick={() => addItem(activeCategory)}
              className="px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5">
              <Plus size={16} /> Add
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(categories).map(([cat, items]) => {
            const { color } = categoryMeta[cat];
            const done = items.filter(i => i.done).length;
            const pct = Math.round((done / items.length) * 100);
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-left hover:border-primary/30 transition-colors">
                <p className="text-slate-400 text-xs mb-2">{cat}</p>
                <p className="font-bold text-lg">{pct}%</p>
                <div className="h-1 bg-slate-800 rounded-full mt-2">
                  <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
