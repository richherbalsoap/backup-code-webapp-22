
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

function Header({ toggleSidebar }) {
  const { logout, userName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#FFD700]/20">
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg border border-[#FFD700]/20 bg-black/30 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700]/40 active:bg-[#FFD700]/20 transition-colors duration-200"
            >
              <Menu size={18} />
            </button>
            <h2 className="text-lg font-bold text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
              EDULinker School System
            </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded-lg border border-[#FFD700]/20">
            <div className="w-7 h-7 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
              <User size={14} className="text-[#FFD700]" />
            </div>
            <span className="text-white/90 text-sm font-medium hidden sm:block">{userName}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FFD700]/20 bg-black/30 text-white/90 text-sm hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-colors duration-200"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
