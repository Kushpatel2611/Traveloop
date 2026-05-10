import { motion } from 'framer-motion';
import { Calendar, DollarSign, Plus, User, MapPin, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const BuildItinerary = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Arrival & Check-in', desc: 'Flight lands at CDG. Transfer to hotel in Montmartre. Rest and freshen up before heading out.', date: 'Mar 15 - Mar 16', budget: '$350' },
    { id: 2, title: 'Eiffel & Seine Tour', desc: 'Morning visit to the Eiffel Tower. Afternoon river cruise along the Seine. Dinner at Le Jules Verne.', date: 'Mar 17 - Mar 18', budget: '$420' },
    { id: 3, title: 'Louvre & Culture', desc: 'Full day exploring the Louvre Museum. Evening walk around the Latin Quarter.', date: 'Mar 19 - Mar 20', budget: '$180' }
  ]);

  const [expandedId, setExpandedId] = useState(1);

  const totalDays = sections.length;
  const totalBudget = sections.reduce((sum, s) => sum + parseInt(s.budget.replace('$', '')), 0);

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([...sections, { id: newId, title: 'New Activity', desc: 'Add your activity details here...', date: '', budget: '$0' }]);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white">
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center pb-4 border-b border-[#1E2028]">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Traveloop
          </Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
            A
          </div>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#1E2028] pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Build Itinerary</h1>
            <p className="text-[#8B8DA3] flex items-center gap-2"><MapPin size={16}/> Trip to Paris, France</p>
          </div>
          <div className="bg-[#15171C] px-6 py-3 rounded-2xl border border-[#1E2028] flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-[#8B8DA3] font-medium uppercase tracking-wider">Total Days</p>
              <p className="font-bold text-lg text-primary">{totalDays} Days</p>
            </div>
            <div className="w-px h-8 bg-[#2a2a38]"></div>
            <div className="text-center">
              <p className="text-xs text-[#8B8DA3] font-medium uppercase tracking-wider">Total Est.</p>
              <p className="font-bold text-lg text-secondary">${totalBudget}</p>
            </div>
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-4">
          
          {sections.map((section, idx) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#15171C] border border-[#1E2028] rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
            >
              {/* Section Header */}
              <button 
                onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-[#1C1E26] transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-white">{section.title}</h2>
                    <p className="text-[#8B8DA3] text-sm flex items-center gap-2 mt-0.5">
                      <Calendar size={12} /> {section.date || 'No date set'}
                      <span className="text-[#2a2a38]">·</span>
                      <DollarSign size={12} className="text-secondary" />{section.budget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSections(sections.filter(s => s.id !== section.id)); }}
                    className="p-2 text-[#8B8DA3] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === section.id ? <ChevronUp size={20} className="text-[#8B8DA3]" /> : <ChevronDown size={20} className="text-[#8B8DA3]" />}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === section.id && (
                <div className="px-5 pb-5 border-t border-[#1E2028]">
                  <div className="pt-4 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-[#8B8DA3] block mb-2">Activity Title</label>
                      <input 
                        type="text" 
                        defaultValue={section.title}
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                        placeholder="Enter activity title..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#8B8DA3] block mb-2">Description</label>
                      <textarea 
                        defaultValue={section.desc}
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all resize-none"
                        placeholder="Describe this activity..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-[#8B8DA3] block mb-2">Date Range</label>
                        <input 
                          type="text" 
                          defaultValue={section.date}
                          className="w-full px-4 py-3 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                          placeholder="e.g., Mar 15 - Mar 16"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-[#8B8DA3] block mb-2">Budget</label>
                        <input 
                          type="text" 
                          defaultValue={section.budget}
                          className="w-full px-4 py-3 rounded-xl bg-[#1C1E26] border border-[#2a2a38] text-white placeholder-[#6b7280] focus:outline-none focus:border-primary transition-all"
                          placeholder="$0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm">
                        Save Changes
                      </button>
                      <button className="px-5 py-2 bg-[#1C1E26] border border-[#2a2a38] text-[#8B8DA3] rounded-xl hover:bg-[#2a2a38] transition-colors text-sm">
                        Add Sub-activity
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {/* Add Another Section Button */}
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={addSection}
            className="w-full py-4 border-2 border-dashed border-[#2a2a38] rounded-2xl text-[#8B8DA3] font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <div className="p-1 rounded-full bg-[#1C1E26]">
              <Plus size={20} />
            </div>
            Add another Activity / Section
          </motion.button>

        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-[#1E2028]">
          <Link to="/itinerary-view" className="px-6 py-3 bg-[#1C1E26] border border-[#2a2a38] text-[#8B8DA3] rounded-xl hover:bg-[#2a2a38] transition-colors font-medium">
            View Full Itinerary
          </Link>
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all">
            Save & Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default BuildItinerary;