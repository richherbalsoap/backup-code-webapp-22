
import React from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, Bell, BarChart2, Settings, User, FileText, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const mainFeatures = [
    { name: 'Student Management', icon: User, color: 'text-[#FFD700]', path: '/students' },
    { name: 'Homework Sender', icon: BookOpen, color: 'text-[#FFD700]', path: '/homework' },
    { name: 'Result Sender', icon: FileText, color: 'text-[#FFD700]', path: '/results' },
    { name: 'Complaint Sender', icon: MessageSquare, color: 'text-[#FFD700]', path: '/complaints' },
  ];
  
  const secondaryFeatures = [
    { name: 'Announcements', icon: Bell, color: 'text-[#FFD700]', path: '/announcements' },
    { name: 'Fees Reminder', icon: Send, color: 'text-[#FFD700]', path: '/fees' },
    { name: 'Analytics', icon: BarChart2, color: 'text-[#FFD700]', path: '/analytics' },
    { name: 'Settings', icon: Settings, color: 'text-[#FFD700]', path: '/settings' },
  ]

  const FeatureCard = ({ feature, index }) => (
    <div
      className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:bg-[#FFD700]/5 hover:border-[#FFD700]/40 transition-colors cursor-pointer"
      onClick={() => navigate(feature.path)}
    >
      <feature.icon size={40} className={`${feature.color} mb-3`} />
      <h2 className="text-md sm:text-lg font-semibold text-white">{feature.name}</h2>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - EDULinker</title>
      </Helmet>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, Administrator</h1>
          <p className="text-white/70 mt-1">Here's a quick overview of your school system.</p>
        </div>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </div>

        <div className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button onClick={() => navigate('/homework')} className="bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/20">Send Homework</Button>
                <Button onClick={() => navigate('/announcements')} className="bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/20">Announcement</Button>
                <Button onClick={() => navigate('/complaints')} className="bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/20">Log Complaint</Button>
                <Button onClick={() => navigate('/students')} className="bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/20">Add Student</Button>
            </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">More Tools</h2>
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {secondaryFeatures.map((feature, index) => (
              <FeatureCard key={feature.name} feature={feature} index={index + mainFeatures.length} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export default HomePage;
