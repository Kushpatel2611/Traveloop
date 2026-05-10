import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, Heart, Settings, LogOut, Plus, Calendar, Plane, Wallet } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Map, label: 'My Trips', path: '/trips' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
  ];

  return (
    <aside className="w-72 h-screen bg-[#12141A] border-r border-[#1E2028] flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-[#1E2028]">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Traveloop
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border-l-[3px] border-primary'
                  : 'text-[#8B8DA3] hover:bg-[#1C1E26] hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1E2028]">
        <NavLink to="/create-trip" className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl mb-3 hover:opacity-90 transition-opacity">
          <Plus size={18} /> Create Trip
        </NavLink>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#8B8DA3] hover:bg-[#1C1E26] hover:text-white rounded-xl transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      <div className="p-4 mx-4 mb-4 rounded-xl bg-[#15171C] border border-[#1E2028]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Alex Morgan</p>
            <p className="text-[#8B8DA3] text-xs">Premium Member</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#1C1E26] rounded-lg p-2">
            <div className="flex items-center justify-center text-primary mb-1"><Calendar size={14} /></div>
            <p className="text-white text-xs font-semibold">12</p>
            <p className="text-[#8B8DA3] text-[10px]">Trips</p>
          </div>
          <div className="bg-[#1C1E26] rounded-lg p-2">
            <div className="flex items-center justify-center text-secondary mb-1"><Plane size={14} /></div>
            <p className="text-white text-xs font-semibold">8</p>
            <p className="text-[#8B8DA3] text-[10px]">Countries</p>
          </div>
          <div className="bg-[#1C1E26] rounded-lg p-2">
            <div className="flex items-center justify-center text-emerald-500 mb-1"><Wallet size={14} /></div>
            <p className="text-white text-xs font-semibold">$4K</p>
            <p className="text-[#8B8DA3] text-[10px]">Saved</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;