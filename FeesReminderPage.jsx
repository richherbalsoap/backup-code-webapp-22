
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import useAppStore from '@/store/appStore';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const FeesReminderPage = () => {
  const { toast } = useToast();
  const allStudents = useAppStore(state => state.students);

  const [standard, setStandard] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [student, setStudent] = useState('');
  const [message, setMessage] = useState('');

  const classes = ['A', 'B', 'C', 'D', 'E'];

  const filteredStudents = useMemo(() => {
    return allStudents.filter(s => {
      if (standard && selectedClass) return s.standard === standard && s.section === selectedClass;
      if (standard) return s.standard === standard;
      return true;
    });
  }, [allStudents, standard, selectedClass]);

  const quickTemplates = [
    `Fees due on ${new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString()}`,
    'Please submit fees for this month',
    'Fees pending. Please clear immediately.',
    'Fees received. Thank you!',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!standard || !selectedClass || !student || !message) {
        toast({
            title: "Incomplete Information",
            description: "Please select standard, class, student and enter a message.",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Fees Reminder Sent!",
      description: `Reminder has been sent to the parent of ${student}.`,
    });
    setStandard('');
    setSelectedClass('');
    setStudent('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Fees Reminder - EDULinker</title>
        <meta name="description" content="Send fees reminders to parents" />
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">Fees Reminder</h1>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">STANDARD *</label>
                <select
                  value={standard}
                  onChange={(e) => { setStandard(e.target.value); setStudent(''); }}
                  required
                  className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                >
                  <option value="" className="bg-black text-white">Select Standard</option>
                  {standards.map(std => <option key={std} value={std} className="bg-black text-white">{std}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">CLASS *</label>
                <select
                  value={selectedClass}
                  onChange={(e) => { setSelectedClass(e.target.value); setStudent(''); }}
                  required
                  className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                >
                  <option value="" className="bg-black text-white">Select Class</option>
                  {classes.map(cls => <option key={cls} value={cls} className="bg-black text-white">{cls}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">SELECT STUDENT *</label>
              {filteredStudents.length > 0 ? (
                <select
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300"
                >
                  <option value="" className="bg-black text-white">Choose student</option>
                  {filteredStudents.map(s => <option key={s.id} value={s.name} className="bg-black text-white">{s.name}</option>)}
                </select>
              ) : (
                <p className="text-white/40 text-sm py-3">No students found. Add students first from the Student Management page.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">QUICK TEMPLATES</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {quickTemplates.map(template => (
                  <Button
                    key={template}
                    type="button"
                    variant="outline"
                    onClick={() => setMessage(template)}
                    className="text-xs text-center bg-black/40 border-[#FFD700]/20 hover:bg-[#FFD700]/10 text-white/80"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">MESSAGE *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40 transition-all duration-300 resize-none"
                placeholder="Type your message..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2"
            >
              <DollarSign size={20} />
              Send Reminder
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeesReminderPage;
