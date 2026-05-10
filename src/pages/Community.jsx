import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, MessageCircle, Share2, MapPin, Bookmark, Search, TrendingUp, Globe, Link2, Copy, Twitter, Facebook, Mail, ChevronRight, Calendar, Map, Eye, Copy as CopyIcon } from 'lucide-react';

const sharedTrips = [
  { id: 1, user: 'Sofia Martinez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', destination: 'Santorini, Greece', days: 7, time: '2h ago', likes: 284, comments: 42, img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop', caption: 'Sunsets here are absolutely unreal. Day 3 in Santorini and I still can\'t believe this view is real!', cities: 3, budget: '$2,400' },
  { id: 2, user: 'James Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', destination: 'Kyoto, Japan', days: 10, time: '5h ago', likes: 512, comments: 88, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', caption: 'Cherry blossom season in Kyoto is something you have to experience once in your life. The temples, the colors, the serenity.', cities: 5, budget: '$3,800' },
  { id: 3, user: 'Amara Osei', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop', destination: 'Masai Mara, Kenya', days: 5, time: '1d ago', likes: 731, comments: 95, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop', caption: 'Witnessed the Great Migration! Over a million wildebeest crossing the Mara River. An experience I\'ll carry with me forever.', cities: 2, budget: '$4,200' },
];

const trending = ['#Santorini2025', '#JapanInSpring', '#Bali', '#SoloTravel', '#BudgetTravel', '#EuropeTrip'];

const ShareModal = ({ trip, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `traveloop.app/trip/${trip.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-[#15171C] rounded-2xl border border-[#1E2028] p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-4">Share Trip</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#8B8DA3] mb-2 block">Trip Link</label>
            <div className="flex gap-2">
              <input readOnly value={`https://${shareUrl}`} className="flex-1 px-4 py-3 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white text-sm" />
              <button onClick={copyLink} className="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium flex items-center gap-2">
                {copied ? <CopyIcon size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#8B8DA3] mb-2 block">Share via</label>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[#1C1E26] border border-[#2a2a38] rounded-xl text-white hover:bg-[#2a2a38] transition-all flex items-center justify-center gap-2">
                <Twitter size={18} className="text-blue-400" /> Twitter
              </button>
              <button className="flex-1 py-3 bg-[#1C1E26] border border-[#2a2a38] rounded-xl text-white hover:bg-[#2a2a38] transition-all flex items-center justify-center gap-2">
                <Facebook size={18} className="text-blue-600" /> Facebook
              </button>
              <button className="flex-1 py-3 bg-[#1C1E26] border border-[#2a2a38] rounded-xl text-white hover:bg-[#2a2a38] transition-all flex items-center justify-center gap-2">
                <Mail size={18} className="text-red-400" /> Email
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1E2028]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#2a2a38] bg-[#1C1E26] accent-primary" />
              <span className="text-sm text-[#8B8DA3]">Allow others to copy this trip</span>
            </label>
          </div>
        </div>

        <button onClick={onClose} className="mt-6 w-full py-3 bg-[#1C1E26] border border-[#2a2a38] rounded-xl text-[#8B8DA3] hover:text-white transition-colors">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function Community() {
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [shareModal, setShareModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrips = sharedTrips.filter(trip => 
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pb-20">
      {shareModal && <ShareModal trip={shareModal} onClose={() => setShareModal(null)} />}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold flex items-center gap-2"><Globe size={28} className="text-primary" /> Shared Trips</h1>
                <p className="text-[#8B8DA3] mt-1">Explore and copy trips from fellow travelers</p>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8DA3]" />
                <input 
                  placeholder="Search destinations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#1C1E26] border border-[#2a2a38] rounded-xl text-sm focus:outline-none focus:border-primary w-48" 
                />
              </div>
            </div>

            {/* Shared Trips */}
            {filteredTrips.map((trip, i) => (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-[#15171C] border border-[#1E2028] rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
                {/* Trip Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img src={trip.avatar} alt={trip.user} className="w-11 h-11 rounded-full object-cover border-2 border-primary/30" />
                    <div>
                      <p className="font-bold text-sm">{trip.user}</p>
                      <p className="text-[#8B8DA3] text-xs flex items-center gap-1"><MapPin size={10} /> {trip.destination} · {trip.time}</p>
                    </div>
                  </div>
                  <button onClick={() => setShareModal(trip)} className="p-2 text-[#8B8DA3] hover:text-white hover:bg-[#1C1E26] rounded-lg transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>

                {/* Trip Image */}
                <div className="relative h-64 overflow-hidden">
                  <img src={trip.img} alt={trip.destination} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white flex items-center gap-1">
                      <Calendar size={12} /> {trip.days} days
                    </span>
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white flex items-center gap-1">
                      <Map size={12} /> {trip.cities} cities
                    </span>
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <span>$</span> {trip.budget}
                    </span>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="p-4 space-y-4">
                  <p className="text-[#8B8DA3] text-sm leading-relaxed">{trip.caption}</p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1E2028]">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setLiked(p => p.includes(trip.id) ? p.filter(x => x !== trip.id) : [...p, trip.id])}
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors ${liked.includes(trip.id) ? 'text-red-400' : 'text-[#8B8DA3] hover:text-red-400'}`}>
                        <Heart size={18} fill={liked.includes(trip.id) ? 'currentColor' : 'none'} />
                        {liked.includes(trip.id) ? trip.likes + 1 : trip.likes}
                      </button>
                      <button className="flex items-center gap-2 text-[#8B8DA3] hover:text-white text-sm font-semibold transition-colors">
                        <MessageCircle size={18} />{trip.comments}
                      </button>
                    </div>
                    <button 
                      onClick={() => setShareModal(trip)}
                      className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
                    >
                      <Link2 size={14} /> Get Link
                    </button>
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Copy size={16} /> Copy This Trip
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Community Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#15171C] border border-[#1E2028] rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Users size={18} className="text-primary" /> Community</h3>
              <div className="grid grid-cols-2 gap-3">
                {[['48.2k', 'Travelers'], ['1.2M', 'Posts'], ['320', 'Countries'], ['4.9★', 'Avg Rating']].map(([val, label]) => (
                  <div key={label} className="bg-[#1C1E26] rounded-2xl p-3 text-center">
                    <p className="font-extrabold text-xl text-primary">{val}</p>
                    <p className="text-[#8B8DA3] text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trending Tags */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#15171C] border border-[#1E2028] rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-secondary" /> Trending</h3>
              <div className="flex flex-wrap gap-2">
                {trending.map(tag => (
                  <button key={tag} className="text-xs font-semibold px-3 py-1.5 bg-[#1C1E26] hover:bg-primary/20 border border-[#2a2a38] hover:border-primary/40 rounded-full text-[#8B8DA3] hover:text-primary transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Suggested Travelers */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#15171C] border border-[#1E2028] rounded-2xl p-6">
              <h3 className="font-bold mb-4">Suggested Travelers</h3>
              {sharedTrips.map(trip => (
                <div key={trip.id} className="flex items-center justify-between py-3 border-b border-[#1E2028] last:border-0">
                  <div className="flex items-center gap-3">
                    <img src={trip.avatar} alt={trip.user} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{trip.user}</p>
                      <p className="text-[#8B8DA3] text-xs">{trip.destination}</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:underline">Follow</button>
                </div>
              ))}
            </motion.div>

            {/* Quick Share Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Share2 size={18} className="text-primary" /> Share Your Trip</h3>
              <p className="text-[#8B8DA3] text-sm mb-4">Share your travel plans publicly or with friends. Others can copy your itinerary!</p>
              <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">
                Create Public Link
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}