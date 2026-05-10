import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Filter, Tag, Plus, X } from 'lucide-react';

const activities = [
  { id: 1, name: 'Paragliding in the Alps', location: 'Interlaken, Switzerland', duration: '3 hours', price: '$120', rating: 4.9, category: 'Adventure', img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Gondola Ride', location: 'Venice, Italy', duration: '1 hour', price: '$80', rating: 4.7, category: 'Culture', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Snorkeling Tour', location: 'Maldives', duration: '4 hours', price: '$95', rating: 4.8, category: 'Water', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'City Food Tour', location: 'Tokyo, Japan', duration: '3 hours', price: '$55', rating: 4.6, category: 'Food', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Safari Drive', location: 'Masai Mara, Kenya', duration: '6 hours', price: '$200', rating: 5.0, category: 'Adventure', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Temple Hopping', location: 'Kyoto, Japan', duration: '5 hours', price: '$40', rating: 4.8, category: 'Culture', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=400&auto=format&fit=crop' },
];

const categories = ['All', 'Adventure', 'Culture', 'Water', 'Food'];
const categoryColor = { Adventure: 'from-orange-500 to-red-500', Culture: 'from-purple-500 to-indigo-500', Water: 'from-blue-500 to-cyan-400', Food: 'from-yellow-500 to-amber-500' };

export default function ActivitySearch() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [added, setAdded] = useState([]);

  const filtered = activities.filter(a =>
    (activeCategory === 'All' || a.category === activeCategory) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => setAdded(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      {/* Hero Search Header */}
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1200&auto=format&fit=crop" alt="bg" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0C10]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-extrabold mb-2 text-center">Find Activities</h1>
          <p className="text-slate-300 mb-6">Discover things to do at your destination</p>
          <div className="w-full max-w-xl relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Try "Paragliding" or "Food tour"...'
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/60 text-sm font-medium" />
            {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"><X size={16} /></button>}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold shrink-0 border transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20'}`}>
              <Tag size={12} className="inline mr-1.5" />{cat}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm font-semibold shrink-0 flex items-center gap-2 transition-colors">
            <Filter size={14} /> More Filters
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.map((activity, i) => (
            <motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-5 bg-slate-900 border border-white/10 hover:border-primary/30 rounded-3xl p-4 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer">
              <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                <img src={activity.img} alt={activity.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-base truncate">{activity.name}</h3>
                  <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${categoryColor[activity.category]} text-white`}>{activity.category}</span>
                </div>
                <p className="text-slate-400 text-sm flex items-center gap-1 mb-2"><MapPin size={12} /> {activity.location}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={11} /> {activity.duration}</span>
                  <span className="flex items-center gap-1 text-amber-400"><Star size={11} fill="currentColor" /> {activity.rating}</span>
                  <span className="font-bold text-primary text-sm">{activity.price}</span>
                </div>
              </div>
              <button onClick={() => toggle(activity.id)}
                className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all ${added.includes(activity.id) ? 'bg-primary border-primary text-white rotate-45' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-primary/20 hover:border-primary/50'}`}>
                {added.includes(activity.id) ? <X size={18} /> : <Plus size={18} />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
