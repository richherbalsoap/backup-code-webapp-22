
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAppStore from '@/store/appStore';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function ComplaintSenderPage() {
  const { toast } = useToast();
  const allStudents = useAppStore(state => state.students);
  const addComplaint = useAppStore(state => state.addComplaint);

  const [formData, setFormData] = useState({
    studentName: '',
    standard: '',
    class: '',
    description: '',
  });

  const classes = ['A', 'B', 'C', 'D', 'E'];

  const filteredStudents = useMemo(() => {
    return allStudents.filter(s => {
      if (formData.standard && formData.class) {
        return s.standard === formData.standard && s.section === formData.class;
      }
      if (formData.standard) return s.standard === formData.standard;
      return true;
    });
  }, [allStudents, formData.standard, formData.class]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.standard || !formData.class || !formData.studentName || !formData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    addComplaint({
      studentName: formData.studentName,
      standard: formData.standard,
      section: formData.class,
      description: formData.description,
    });
    toast({
      title: "Complaint Registered!",
      description: `Your complaint regarding ${formData.studentName} has been submitted.`,
    });
    setFormData({ studentName: '', standard: '', class: '', description: '' });
  };

  return (
    <>
      <Helmet>
        <title>Log a Complaint - EDULinker</title>
        <meta name="description" content="Log a complaint about a student." />
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Log a Complaint</h1>

        <div
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">
                  STANDARD *
                </label>
                <Select value={formData.standard} onValueChange={value => setFormData({ ...formData, standard: value, studentName: '' })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300">
                        <SelectValue placeholder="Select Standard" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                        {standards.map((std) => <SelectItem key={std} value={std} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{std}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">
                  CLASS *
                </label>
                <Select value={formData.class} onValueChange={value => setFormData({ ...formData, class: value, studentName: '' })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                        {classes.map((cls) => <SelectItem key={cls} value={cls} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{cls}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">
                STUDENT NAME *
              </label>
              {filteredStudents.length > 0 ? (
                <Select value={formData.studentName} onValueChange={value => setFormData({ ...formData, studentName: value })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition-all duration-300">
                        <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                        {filteredStudents.map((student) => <SelectItem key={student.id} value={student.name} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{student.name}</SelectItem>)}
                    </SelectContent>
                </Select>
              ) : (
                <p className="text-white/40 text-sm py-3">No students found. Add students first from the Student Management page.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#FFD700]/60 mb-2">
                COMPLAINT DETAILS *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/40 border border-[#FFD700]/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40 transition-all duration-300 resize-none"
                placeholder="Describe the issue clearly..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              <AlertTriangle size={20} className="mr-2" />
              Send Complaint
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ComplaintSenderPage;
