import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Navigation, ArrowRight, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    start: '',
    place: '',
    startDate: '',
    endDate: ''
  });

  const suggestions = [
    { id: 1, name: 'Eiffel Tower', loc: 'Paris, France', img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Machu Picchu', loc: 'Peru', img: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Santorini', loc: 'Greece', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop' },
    { id: 4, name: 'Grand Canyon', loc: 'USA', img: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=400&auto=format&fit=crop' },
    { id: 5, name: 'Colosseum', loc: 'Rome, Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' },
    { id: 6, name: 'Taj Mahal', loc: 'India', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      <div className="w-full max-w-6xl mx-auto p-6">
        <nav className="flex justify-between items-center mb-8 pb-6 border-b border-[#1E2028]">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Traveloop
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
            A
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Plan a new trip</h2>
              <p className="text-[#8B8DA3]">Fill in the details below to start your next adventure.</p>
            </div>
            
            <div className="bg-[#15171C] p-6 rounded-2xl border border-[#1E2028] space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#8B8DA3] flex items-center gap-2">
                  <Navigation size={16} className="text-primary"/> Start Point
                </label>
                <input 
                  type="text" name="start" value={formData.start} onChange={handleInputChange} placeholder="Where are you leaving from?"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#8B8DA3] flex items-center gap-2">
                  <MapPin size={16} className="text-secondary"/> Destination
                </label>
                <input 
                  type="text" name="place" value={formData.place} onChange={handleInputChange} placeholder="Where do you want to go?"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#8B8DA3] flex items-center gap-2">
                  <Calendar size={16} className="text-primary"/> Start Date
                </label>
                <input 
                  type="date" name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#8B8DA3] flex items-center gap-2">
                  <Calendar size={16} className="text-secondary"/> End Date
                </label>
                <input 
                  type="date" name="endDate" value={formData.endDate} onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <button className="w-full mt-4 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-95">
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Suggestions for Places to Visit</h2>
              <div className="h-px bg-[#2a2a38] w-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {suggestions.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-[#1E2028]">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-white font-bold text-lg mb-1">{item.name}</span>
                    <span className="text-white/80 text-sm flex items-center gap-1"><MapPin size={14}/> {item.loc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;