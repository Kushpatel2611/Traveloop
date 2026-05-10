import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Users, Calendar, Camera, Trash2, Save, ChevronRight, Globe, Shield, Bell } from 'lucide-react';

export default function UserProfile() {
  const [form, setForm] = useState({ name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 234 567 8900', gender: 'Male', age: '28' });
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Profile Header Card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 p-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800')] bg-cover bg-center opacity-10" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-4 border-primary/50 overflow-hidden shadow-2xl bg-slate-800">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={22} className="text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{form.name}</h1>
              <p className="text-slate-300">{form.email}</p>
              <p className="text-sm text-slate-400 mt-1">Member since Jan 2024 · 8 trips completed</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-slate-900/50 p-1 rounded-2xl border border-white/10 w-fit">
          {[['profile', User, 'Profile'], ['security', Shield, 'Security'], ['notifications', Bell, 'Notifications']].map(([tab, Icon, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              <Icon size={16} />{label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-5">
              <h2 className="text-lg font-bold border-b border-white/10 pb-4">Personal Information</h2>

              {[
                { label: 'Full Name', name: 'name', icon: User, type: 'text' },
                { label: 'Email Address', name: 'email', icon: Mail, type: 'email' },
                { label: 'Phone Number', name: 'phone', icon: Phone, type: 'tel' },
              ].map(({ label, name, icon: Icon, type }) => (
                <div key={name} className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Icon size={14} />{label}</label>
                  <input type={type} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Users size={14} /> Gender</label>
                  <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400 flex items-center gap-2"><Calendar size={14} /> Age</label>
                  <input type="number" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </motion.div>

            {/* Password Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-bold border-b border-white/10 pb-4 flex items-center gap-2"><Lock size={18} /> Change Password</h2>
              {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                <div key={label} className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-400">{label}</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              ))}
              <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-colors">Update Password</button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold mb-4 text-slate-300 uppercase text-xs tracking-widest">Travel Stats</h3>
              {[['8', 'Trips Completed', 'text-primary'], ['23', 'Countries Visited', 'text-secondary'], ['47k', 'Miles Traveled', 'text-amber-400']].map(([val, label, cls]) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <span className="text-slate-400 text-sm">{label}</span>
                  <span className={`font-bold text-lg ${cls}`}>{val}</span>
                </div>
              ))}
            </motion.div>

            {/* Settings Links */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-4 space-y-1">
              {[['Language & Region', Globe], ['Privacy Settings', Shield], ['Notifications', Bell]].map(([label, Icon]) => (
                <button key={label} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white">
                  <span className="flex items-center gap-3"><Icon size={16} className="text-slate-500" />{label}</span>
                  <ChevronRight size={16} className="text-slate-600" />
                </button>
              ))}
            </motion.div>

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-red-950/30 border border-red-500/20 rounded-3xl p-6">
              <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2"><Trash2 size={16} /> Danger Zone</h3>
              <p className="text-sm text-slate-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <button className="w-full py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-colors">Delete Account</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
