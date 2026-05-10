import { motion } from 'framer-motion';
import { Users, Map, Briefcase, BarChart3, Activity, AlertTriangle, ChevronRight, TrendingUp, Globe, Settings } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,480', change: '+12%', icon: Users, color: 'from-primary to-indigo-600' },
  { label: 'Active Trips', value: '3,241', change: '+8%', icon: Map, color: 'from-secondary to-pink-600' },
  { label: 'Total Revenue', value: '$84.2k', change: '+22%', icon: BarChart3, color: 'from-emerald-500 to-teal-600' },
  { label: 'Countries', value: '142', change: '+3', icon: Globe, color: 'from-amber-500 to-orange-600' },
];

const recentActivity = [
  { user: 'Sofia Martinez', action: 'Created a new trip to Santorini', time: '2m ago', status: 'Trip Created', statusColor: 'bg-blue-500/20 text-blue-400' },
  { user: 'James Chen', action: 'Completed Kyoto Spring itinerary', time: '15m ago', status: 'Completed', statusColor: 'bg-emerald-500/20 text-emerald-400' },
  { user: 'Amara Osei', action: 'Reported a broken map link', time: '1h ago', status: 'Issue', statusColor: 'bg-red-500/20 text-red-400' },
  { user: 'Lucas Novak', action: 'Shared itinerary publicly', time: '2h ago', status: 'Shared', statusColor: 'bg-purple-500/20 text-purple-400' },
  { user: 'Mei Lin', action: 'Registered a new account', time: '3h ago', status: 'New User', statusColor: 'bg-amber-500/20 text-amber-400' },
  { user: 'David Müller', action: 'Deleted their account', time: '5h ago', status: 'Deleted', statusColor: 'bg-slate-500/20 text-slate-400' },
];

const navItems = [
  ['Dashboard', Activity, true],
  ['Users', Users, false],
  ['Trips', Map, false],
  ['Reports', BarChart3, false],
  ['Issues', AlertTriangle, false],
  ['Settings', Settings, false],
];

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-slate-950 border-r border-white/10 shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Traveloop</h2>
          <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
        </div>
        <nav className="p-3 flex-1 space-y-1">
          {navItems.map(([label, Icon, active]) => (
            <button key={label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary border border-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <Icon size={17} />{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">A</div>
            <div><p className="text-sm font-semibold">Admin</p><p className="text-slate-500 text-xs">Super Admin</p></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between z-20">
          <h1 className="text-xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Activity size={16} className="text-emerald-400" />
            <span>All systems operational</span>
          </div>
        </header>

        <div className="p-6 space-y-8 max-w-6xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-slate-900 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${stat.color}`}><stat.icon size={20} className="text-white" /></div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2"><TrendingUp size={18} className="text-primary" /> User Growth</h3>
                <select className="bg-slate-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-slate-300 focus:outline-none">
                  <option>Last 7 days</option><option>Last 30 days</option>
                </select>
              </div>
              <div className="flex items-end gap-2 h-36">
                {[40, 65, 50, 80, 70, 90, 85, 95, 75, 100, 88, 92, 78, 96].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/40 to-primary/10 hover:from-primary/60 hover:to-primary/20 transition-colors cursor-pointer"
                    style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-2 px-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase size={18} className="text-secondary" /> Top Destinations</h3>
              {[['Paris', 2840, 100], ['Kyoto', 2310, 81], ['Bali', 1980, 70], ['Santorini', 1540, 54], ['Maldives', 980, 34]].map(([city, trips, w]) => (
                <div key={city} className="mb-3">
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium">{city}</span><span className="text-slate-500">{trips}</span></div>
                  <div className="h-1.5 bg-slate-800 rounded-full"><div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: `${w}%` }} /></div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Recent Activity Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-bold text-lg flex items-center gap-2"><Activity size={18} className="text-primary" /> Recent Activity</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">View all <ChevronRight size={14} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="text-left text-xs text-slate-500 uppercase tracking-widest border-b border-white/5">
                  <th className="px-6 py-3">User</th><th className="px-6 py-3">Action</th><th className="px-6 py-3">Time</th><th className="px-6 py-3">Status</th>
                </tr></thead>
                <tbody>
                  {recentActivity.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-sm">{row.user}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{row.action}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{row.time}</td>
                      <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${row.statusColor}`}>{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
