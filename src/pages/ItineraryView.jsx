import { motion } from 'framer-motion';
import { Calendar, DollarSign, MapPin, Clock, Coffee, Hotel, Car, Utensils, Camera, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const days = [
  {
    day: 1, date: 'Jun 12', title: 'Arrival & Exploring',
    activities: [
      { time: '10:00 AM', name: 'Airport Arrival (CDG)', type: 'Transport', cost: 80, icon: Car },
      { time: '01:00 PM', name: 'Hotel Check-in - Le Marais Boutique', type: 'Hotel', cost: 220, icon: Hotel },
      { time: '03:00 PM', name: 'Notre-Dame Cathedral Visit', type: 'Sightseeing', cost: 0, icon: Camera },
      { time: '07:00 PM', name: 'Dinner at Café de Flore', type: 'Food', cost: 65, icon: Utensils },
    ]
  },
  {
    day: 2, date: 'Jun 13', title: 'Eiffel & Montmartre',
    activities: [
      { time: '09:00 AM', name: 'Breakfast at hotel', type: 'Food', cost: 25, icon: Coffee },
      { time: '10:30 AM', name: 'Eiffel Tower Summit Tickets', type: 'Sightseeing', cost: 35, icon: Camera },
      { time: '02:00 PM', name: 'Seine River Cruise', type: 'Activity', cost: 50, icon: Camera },
      { time: '06:00 PM', name: 'Montmartre Evening Walk', type: 'Free', cost: 0, icon: Camera },
    ]
  },
  {
    day: 3, date: 'Jun 14', title: 'Art & Culture',
    activities: [
      { time: '09:00 AM', name: 'Louvre Museum (full day)', type: 'Sightseeing', cost: 22, icon: Camera },
      { time: '02:00 PM', name: 'Lunch at Café Marly', type: 'Food', cost: 45, icon: Utensils },
      { time: '07:00 PM', name: 'Wine Tasting Experience', type: 'Activity', cost: 95, icon: Coffee },
    ]
  }
];

const typeColor = { Transport: 'bg-blue-500/20 text-blue-400', Hotel: 'bg-purple-500/20 text-purple-400', Sightseeing: 'bg-amber-500/20 text-amber-400', Food: 'bg-green-500/20 text-green-400', Activity: 'bg-pink-500/20 text-pink-400', Free: 'bg-slate-500/20 text-slate-400' };

export default function ItineraryView() {
  const [expandedDay, setExpandedDay] = useState(1);
  const totalBudget = days.flatMap(d => d.activities).reduce((s, a) => s + a.cost, 0);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop" alt="Paris" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0C10]" />
        <div className="absolute inset-0 flex items-end px-6 pb-6 max-w-5xl mx-auto w-full">
          <div>
            <h1 className="text-4xl font-extrabold">Trip to Paris</h1>
            <p className="text-slate-300 flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1"><MapPin size={14}/> Paris, France</span>
              <span className="flex items-center gap-1"><Calendar size={14}/> Jun 12 – Jun 24, 2025</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Budget Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Budget', value: '$2,500', color: 'text-white', sub: 'estimated' },
            { label: 'Spent So Far', value: `$${totalBudget}`, color: 'text-primary', sub: 'activities' },
            { label: 'Remaining', value: `$${2500 - totalBudget}`, color: 'text-emerald-400', sub: 'budget left' },
            { label: 'Trip Duration', value: '12 Days', color: 'text-secondary', sub: '3 planned' },
          ].map(({ label, value, color, sub }) => (
            <div key={label} className="bg-slate-900 border border-white/10 rounded-2xl p-4">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Day-by-day itinerary */}
        <div className="space-y-4">
          {days.map((day, i) => (
            <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
              {/* Day Header - Clickable */}
              <button onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                    <span className="text-white font-extrabold text-sm leading-tight">{day.day}</span>
                    <span className="text-white/70 text-xs leading-tight">DAY</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{day.title}</h3>
                    <p className="text-slate-400 text-sm flex items-center gap-2">
                      <Calendar size={12} /> {day.date}
                      <span className="text-slate-600">·</span>
                      <DollarSign size={12} className="text-secondary" />${day.activities.reduce((s, a) => s + a.cost, 0)} est.
                    </p>
                  </div>
                </div>
                <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedDay === day.day ? 'rotate-180' : ''}`} />
              </button>

              {/* Activities */}
              {expandedDay === day.day && (
                <div className="px-5 pb-5 space-y-3">
                  <div className="relative ml-6 border-l-2 border-white/10 space-y-4 pl-5">
                    {day.activities.map((act, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.05 }}
                        className="relative -ml-[22px]">
                        <div className="absolute -left-[2px] w-4 h-4 rounded-full border-2 border-primary bg-[#0B0C10] mt-1" />
                        <div className="ml-6 bg-slate-800/60 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                          <div className="p-2.5 bg-white/5 rounded-xl shrink-0">
                            <act.icon size={18} className="text-slate-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm">{act.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={10} /> {act.time}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[act.type]}`}>{act.type}</span>
                            </div>
                          </div>
                          <span className={`font-bold text-sm shrink-0 ${act.cost === 0 ? 'text-emerald-400' : 'text-white'}`}>{act.cost === 0 ? 'Free' : `$${act.cost}`}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
