
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Bell, 
  BarChart3, 
  Bot, 
  TrendingUp, 
  Settings,
  X,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const teacherTools = [
    { path: '/homework', icon: BookOpen, label: 'Homework Sender' },
    { path: '/complaints', icon: MessageSquare, label: 'Complaint Sender' },
    { path: '/results', icon: FileText, label: 'Result Sender' },
];

const principalTools = [
    { path: '/students', icon: Users, label: 'Student Management' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-chatbot', icon: Bot, label: 'AI Insight Chatbot' },
    { path: '/promotion', icon: TrendingUp, label: 'Promotion Panel' },
    { path: '/fees', icon: DollarSign, label: 'Fees Reminder' },
];

const NavItem = ({ item, onClick }) => (
  <li>
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg
        transition-colors duration-200 group
        ${isActive 
          ? 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)]' 
          : 'text-white/70 hover:bg-[#FFD700]/5 hover:text-white border border-transparent'
        }
      `}
    >
      <item.icon size={20} />
      <span className="font-medium text-sm">{item.label}</span>
    </NavLink>
  </li>
);

const CollapsibleSection = ({ title, icon: Icon, items, onClick }) => {
  const [isSectionOpen, setIsSectionOpen] = React.useState(true);

  return (
    <div>
      <button 
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-[#FFD700]/50 hover:text-[#FFD700]/80 transition-colors duration-200 uppercase tracking-wider"
      >
        <span className="flex items-center gap-2">
          <Icon size={14} />
          {title}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isSectionOpen ? 'rotate-180' : ''}`} />
      </button>
      {isSectionOpen && (
        <ul className="space-y-1 pl-2 pt-1">
          {items.map((item) => (
            <NavItem key={item.path} item={item} onClick={onClick} />
          ))}
        </ul>
      )}
    </div>
  )
}

function Sidebar({ isOpen, toggleSidebar }) {
  const { userName } = useAuth();

  const handleLinkClick = () => {
    toggleSidebar();
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-200"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] z-50 
          bg-[#0a0a0a]/95 border-r border-[#FFD700]/20 
          flex flex-col 
          transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-5 border-b border-[#FFD700]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center">
                  <GraduationCap size={22} className="text-[#FFD700]"/>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-[#FFD700]">EDULinker</h1>
                    <p className="text-xs text-white/40">{userName}</p>
                </div>
            </div>
             <button onClick={toggleSidebar} className="p-1.5 rounded-lg text-white/50 hover:text-[#FFD700] hover:bg-[#FFD700]/10 border border-transparent hover:border-[#FFD700]/20 transition-colors duration-200">
                <X size={20} />
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-3">
          <ul className="space-y-1">
            <NavItem item={{ path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }} onClick={handleLinkClick} />
          </ul>

          <CollapsibleSection title="TEACHER TOOLS" icon={BookOpen} items={teacherTools} onClick={handleLinkClick} />
          <CollapsibleSection title="PRINCIPAL TOOLS" icon={Users} items={principalTools} onClick={handleLinkClick} />
          
          <ul className="space-y-1 pt-3 border-t border-[#FFD700]/10">
             <NavItem item={{ path: '/settings', icon: Settings, label: 'Settings' }} onClick={handleLinkClick} />
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default React.memo(Sidebar);
