import { Menu, User, Bell, Sun, Moon, Search, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="h-16 bg-[#12141A] border-b border-[#1E2028] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-[#8B8DA3] hover:bg-[#1C1E26] hover:text-white rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center bg-[#1C1E26] rounded-xl px-4 py-2 w-80 border border-[#2a2a38]">
          <Search size={18} className="text-[#8B8DA3] mr-3" />
          <input 
            type="text" 
            placeholder="Search destinations, trips..." 
            className="bg-transparent border-none outline-none text-sm text-white placeholder-[#6b7280] w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-2 text-[#8B8DA3] hover:bg-[#1C1E26] hover:text-white rounded-lg transition-colors">
          <Bell size={20} />
        </button>
        
        <Link to="/settings" className="p-2 text-[#8B8DA3] hover:bg-[#1C1E26] hover:text-white rounded-lg transition-colors">
          <Settings size={20} />
        </Link>

        <Link to="/profile" className="ml-2 w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity">
          A
        </Link>
      </div>
    </header>
  );
};

export default Navbar;