
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function SettingsPage() {
  const { toast } = useToast();
  const { userName, updateUserName } = useAuth();
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  });
  const [email, setEmail] = useState('');
  const [newName, setNewName] = useState(userName);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirm password must be the same.",
        variant: "destructive",
      });
      return;
    }
    if (!passwords.new) {
        toast({
            title: "Password cannot be empty",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Password Changed Successfully!",
      description: "Your password has been updated.",
    });
    setPasswords({ new: '', confirm: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email cannot be empty",
        description: "Please enter a new email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Email Change Request Sent",
      description: `A confirmation link has been sent to ${email}.`,
    });
    setEmail('');
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast({
        title: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    updateUserName(newName);
    toast({
      title: "Name Updated Successfully!",
      description: `Your name has been changed to ${newName}.`,
    });
  };


  return (
    <>
      <Helmet>
        <title>Settings - EDULinker</title>
        <meta name="description" content="Manage your account settings and preferences" />
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Settings</h1>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
              <User size={20} className="text-[#FFD700]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Name</h2>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                placeholder="Enter your new name"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Update Name
            </Button>
          </form>
        </div>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
              <Lock size={20} className="text-[#FFD700]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                placeholder="Confirm new password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Update Password
            </Button>
          </form>
        </div>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
              <Mail size={20} className="text-[#FFD700]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Email ID</h2>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                placeholder="Enter new email address"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
            >
              Update Email
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
