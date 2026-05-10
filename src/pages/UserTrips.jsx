import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Search, Filter, ChevronRight, Plane, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const upcomingTrips = [
  { id: 1, name: 'Tokyo Adventure', destination: 'Japan', dates: 'Jun 12 – Jun 24, 2025', days: 12, status: 'Planning', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Amalfi Coast', destination: 'Italy', dates: 'Aug 3 – Aug 10, 2025', days: 7, status: 'Booked', img: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Maldives Escape', destination: 'Maldives', dates: 'Oct 1 – Oct 8, 2025', days: 7, status: 'Planning', img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=600&auto=format&fit=crop' },
];

const completedTrips = [
  { id: 4, name: 'Kyoto Spring', destination: 'Japan', dates: 'Mar 10 – Mar 17, 2025', days: 7, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop' },
  { id: 5, name: 'Swiss Alps', destination: 'Switzerland', dates: 'Dec 20 – Dec 27, 2024', days: 7, img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop' },
  { id: 6, name: 'Bali Retreat', destination: 'Indonesia', dates: 'Aug 5 – Aug 12, 2024', days: 7, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop' },
];

const statusColor = { Planning: 'bg-amber-500/20 text-amber-400 border-amber-500/30', Booked: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };

export default function UserTrips() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">My Trips</h1>
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search trips..." className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"><Filter size={18} /></button>
          </div>
          <Link to="/create-trip">
            <button className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform">+ New Trip</button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Upcoming Trips */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xl font-bold"><Plane size={20} className="text-primary" /> Upcoming Trips</div>
            <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1" />
            <span className="text-sm text-slate-400 font-medium">{upcomingTrips.length} trips</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map((trip, i) => (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-primary/40 shadow-xl hover:shadow-primary/10 transition-all cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <img src={trip.img} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${statusColor[trip.status]}`}>{trip.status}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{trip.name}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1 mb-3"><MapPin size={13} /> {trip.destination}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {trip.dates}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {trip.days} days</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} className="text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Completed Trips */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xl font-bold"><CheckCircle2 size={20} className="text-emerald-400" /> Completed Trips</div>
            <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1" />
            <span className="text-sm text-slate-400 font-medium">{completedTrips.length} trips</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTrips.map((trip, i) => (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-emerald-500/30 shadow-xl transition-all cursor-pointer opacity-80 hover:opacity-100">
                <div className="relative h-44 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={trip.img} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Completed</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{trip.name}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1 mb-3"><MapPin size={13} /> {trip.destination}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {trip.dates}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {trip.days} days</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
