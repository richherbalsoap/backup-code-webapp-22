
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, MessageSquare, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';

function DashboardPage() {
  const navigate = useNavigate();
  const { homework, complaints, results } = useAppStore();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = [
    { icon: BookOpen, label: 'Homework Sender', value: homework.length, color: 'from-[#FFD700] to-[#FFA500]', path: '/homework' },
    { icon: MessageSquare, label: 'Complaint Sender', value: complaints.length, color: 'from-[#FFD700] to-[#DAA520]', path: '/complaints' },
    { icon: FileText, label: 'Result Sender', value: results.length, color: 'from-[#DAA520] to-[#FFD700]', path: '/results' },
  ];

  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setSelectedDate(new Date(currentYear, currentMonth + 1, 1));

  return (
    <>
      <Helmet>
        <title>Dashboard - EDULinker</title>
        <meta name="description" content="View your school dashboard statistics and overview" />
      </Helmet>

      <div className="space-y-6 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative flex flex-col sm:flex-row sm:justify-center items-center w-full gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
          
          <div className="sm:absolute sm:right-0">
            <select className="w-full sm:w-auto px-4 py-2 bg-black/40 backdrop-blur-md border border-[#FFD700]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 transition-all duration-300 appearance-none cursor-pointer">
              <option className="bg-black text-white">Academic Year 2025-26</option>
              <option className="bg-black text-white">Academic Year 2024-25</option>
              <option className="bg-black text-white">Academic Year 2023-24</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              onClick={() => navigate(stat.path)}
              className="relative group cursor-pointer"
            >
              <div className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] hover:border-[#FFD700]/40 transition-all duration-300 text-center">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-[0_0_15px_rgba(255,215,0,0.3)]`}>
                  <stat.icon size={24} className="text-black" />
                </div>
                
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Welcome back, Admin!</h2>
            <p className="text-white/60">
              Here's an overview of your school management system. Navigate through the sidebar to access different modules.
            </p>
          </div>

          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar size={20} className="text-[#FFD700]" />
                Calendar
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={prevMonth} className="p-1 rounded hover:bg-[#FFD700]/10 text-[#FFD700] transition-colors">&lt;</button>
                <span className="text-white text-sm font-medium">{monthNames[currentMonth]} {currentYear}</span>
                <button onClick={nextMonth} className="p-1 rounded hover:bg-[#FFD700]/10 text-[#FFD700] transition-colors">&gt;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="text-[#FFD700]/60 font-semibold py-1">{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                return (
                  <div
                    key={day}
                    className={`py-1.5 rounded cursor-pointer transition-all duration-200 text-sm
                      ${isToday ? 'bg-[#FFD700] text-black font-bold shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'text-white/70 hover:bg-[#FFD700]/10 hover:text-white'}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
