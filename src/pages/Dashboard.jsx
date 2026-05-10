import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, Wallet, Plane, Building, Map, ArrowRight, Star, TrendingUp, Heart, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const upcomingTrips = [
    { id: 1, destination: 'Kyoto, Japan', dates: 'Oct 12 - Oct 20', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', status: 'Upcoming' },
    { id: 2, destination: 'Paris, France', dates: 'Dec 5 - Dec 15', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop', status: 'Planning' },
    { id: 3, destination: 'Bali, Indonesia', dates: 'Jan 15 - Jan 25', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop', status: 'Upcoming' },
  ];

  const recommended = [
    { id: 1, name: 'Santorini, Greece', price: '$1,200', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop', rating: 4.9 },
    { id: 2, name: 'Bali, Indonesia', price: '$850', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop', rating: 4.8 },
    { id: 3, name: 'Swiss Alps', price: '$2,100', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=400&auto=format&fit=crop', rating: 4.9 },
  ];

  const quickActions = [
    { icon: Plane, label: 'Flights', color: 'from-blue-500 to-blue-600' },
    { icon: Building, label: 'Hotels', color: 'from-emerald-500 to-emerald-600' },
    { icon: Map, label: 'Explore', color: 'from-purple-500 to-purple-600' },
    { icon: Wallet, label: 'Budget', color: 'from-orange-500 to-orange-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6 pb-20 md:pb-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Alex! 👋</h1>
          <p className="text-[#8B8DA3] mt-1">You have 3 trips planned this year.</p>
        </div>
        <Link to="/create-trip" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg">
          <Plus size={20} /> Plan New Trip
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <motion.button 
                key={idx} 
                variants={itemVariants}
                className="flex flex-col items-center justify-center gap-3 p-5 bg-[#15171C] rounded-2xl hover:bg-[#1C1E26] border border-[#1E2028] transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} text-white flex items-center justify-center shadow-lg`}>
                  <action.icon size={24} />
                </div>
                <span className="text-sm font-semibold text-[#8B8DA3]">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="show">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-white">Your Trips</h2>
              <Link to="/trips" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-[#1E2028]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img 
                    src={trip.image} 
                    alt={trip.destination}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      trip.status === 'Upcoming' 
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                        : 'bg-pink-500/20 text-pink-400 border-pink-500/30'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <h3 className="text-xl font-bold text-white mb-2">{trip.destination}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar size={14} /> {trip.dates}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#15171C] rounded-2xl p-6 border border-[#1E2028]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Wallet size={20} className="text-primary" /> Budget Overview
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-[#8B8DA3] text-sm mb-1">Total Spent This Year</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-4xl font-extrabold text-white">$3,450</h2>
                  <span className="flex items-center text-sm font-medium text-emerald-400 mb-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    <TrendingUp size={14} className="mr-1" /> 12%
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Flights', amount: '$1,200', percent: 45, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
                  { label: 'Hotels', amount: '$1,500', percent: 35, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600' },
                  { label: 'Activities', amount: '$750', percent: 20, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#8B8DA3]">{item.label}</span>
                      <span className="font-semibold text-white">{item.amount}</span>
                    </div>
                    <div className="w-full bg-[#1C1E26] rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#15171C] rounded-2xl p-6 border border-[#1E2028]"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin size={20} className="text-secondary" /> Recommended
              </h3>
              <button className="text-primary text-sm font-medium hover:underline">See All</button>
            </div>

            <div className="space-y-4">
              {recommended.map((item) => (
                <div key={item.id} className="flex gap-4 items-center p-3 rounded-xl bg-[#1C1E26] hover:bg-[#2a2a38] transition-colors cursor-pointer group border border-transparent hover:border-[#2a2a38]">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium text-[#8B8DA3]">{item.price} <span className="text-xs font-normal">/ person</span></span>
                      <span className="flex items-center text-xs font-bold text-amber-400">
                        <Star size={12} className="fill-amber-400 mr-1" /> {item.rating}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-[#2a2a38] text-[#8B8DA3] hover:text-red-500 hover:bg-red-500/10 transition-colors">
                    <Heart size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Link to="/create-trip">
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-xl z-50"
        >
          <Plus size={28} />
        </motion.button>
      </Link>
    </div>
  );
};

export default Dashboard;