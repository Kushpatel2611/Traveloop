import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar, Trash2, Edit3, Eye, Loader2, Plane } from 'lucide-react';
import { tripService } from '../services/tripService';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const fetchedTrips = await tripService.getTrips();
      const sortedTrips = fetchedTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setTrips(sortedTrips);
    } catch (err) {
      setError('Failed to fetch trips. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      try {
        await tripService.deleteTrip(tripId);
        setTrips(trips.filter(t => t.id !== tripId));
      } catch (err) {
        alert('Failed to delete trip.');
        console.error(err);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <Loader2 size={48} className="animate-spin text-primary mb-4" />
        <h2 className="text-xl font-semibold text-white">Loading your adventures...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <div className="p-4 bg-red-500/10 text-red-400 rounded-xl max-w-md text-center border border-red-500/30">
          <p>{error}</p>
          <button onClick={fetchTrips} className="mt-4 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Trips</h1>
          <p className="text-[#8B8DA3] mt-1">Manage all your upcoming and past adventures.</p>
        </div>
        <Link to="/create-trip" className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90 shadow-lg">
          <Plus size={20} /> Plan New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-[#2a2a38] bg-[#15171C]"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <Plane size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No trips planned yet</h2>
          <p className="text-[#8B8DA3] max-w-md text-center mb-8">
            The world is waiting for you! Start building your dream itinerary right now.
          </p>
          <Link to="/create-trip" className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg">
            Create Your First Trip
          </Link>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {trips.map((trip) => (
            <motion.div 
              key={trip.id} 
              variants={itemVariants}
              className="bg-[#15171C] rounded-2xl overflow-hidden group flex flex-col border border-[#1E2028] hover:border-primary/30 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={trip.coverImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'} 
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 z-20">
                  <span className={`px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold border ${
                    trip.status === 'Planning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                    trip.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  }`}>
                    {trip.status || 'Upcoming'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{trip.destination}</h3>
                
                <div className="flex items-center gap-2 text-sm text-[#8B8DA3] mb-4">
                  <Calendar size={16} />
                  <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-[#8B8DA3] mb-6 bg-[#1C1E26] p-2 rounded-lg inline-flex w-fit">
                  <MapPin size={16} className="text-primary" />
                  <span>0 Destinations</span>
                </div>

                <div className="mt-auto pt-4 border-t border-[#1E2028] flex justify-between items-center">
                  <button 
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-[#8B8DA3] hover:text-white transition-colors"
                  >
                    <Eye size={18} /> View
                  </button>
                  <div className="w-px h-5 bg-[#2a2a38] mx-2" />
                  <button 
                    onClick={() => navigate(`/edit-trip/${trip.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-[#8B8DA3] hover:text-white transition-colors"
                  >
                    <Edit3 size={18} /> Edit
                  </button>
                  <div className="w-px h-5 bg-[#2a2a38] mx-2" />
                  <button 
                    onClick={() => handleDelete(trip.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Trips;