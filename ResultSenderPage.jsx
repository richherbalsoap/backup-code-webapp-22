
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Upload, FileText, Trash2, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import useAppStore from '@/store/appStore';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const ResultSenderPage = () => {
  const { toast } = useToast();
  const addResult = useAppStore(state => state.addResult);
  const [studentName, setStudentName] = useState('');
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([{ name: '', marks: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', marks: '' }]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 5 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      toast({
        title: 'File Error',
        description: 'File is too large or invalid. Max size: 5MB.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !standard || !section || (subjects.length === 1 && (!subjects[0].name || !subjects[0].marks)) && !file) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all fields and add at least one subject or a file.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addResult({
      studentName,
      standard,
      section,
      subjects: subjects.filter(s => s.name && s.marks),
      fileName: file ? file.name : null,
    });

    toast({
      title: 'Result Sent Successfully!',
      description: `Marks for ${studentName} (Class ${standard} ${section}) have been recorded.`,
    });

    setStudentName('');
    setStandard('');
    setSection('');
    setFile(null);
    setSubjects([{ name: '', marks: '' }]);
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Result Sender - EDULinker</title>
        <meta name="description" content="Manually enter or upload student marks to be sent out." />
      </Helmet>
      <div className="space-y-6 px-4 pb-10 relative z-10">
        <div className="text-center pt-4">
          <h1 className="text-3xl font-bold text-white">Result Sender</h1>
          <p className="text-white/70">Enter or upload student marks</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-2xl p-6 max-w-2xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="sm:col-span-3">
                <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">STUDENT NAME</label>
                <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g., Rohan Kumar" className="w-full p-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40" />
            </div>
            <div className="relative">
                <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">STANDARD</label>
                <select value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full appearance-none p-3 bg-black border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40">
                    <option value="" disabled className="bg-black text-white">Select Standard</option>
                    {standards.map(s => <option key={s} value={s} className="bg-black text-white">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 bottom-3 w-5 h-5 text-[#FFD700]/50 pointer-events-none" />
            </div>
            <div className="relative">
                 <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">CLASS SECTION</label>
                <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full appearance-none p-3 bg-black border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40">
                    <option value="" disabled className="bg-black text-white">Select Section</option>
                    {['A', 'B', 'C', 'D', 'E'].map(s => <option key={s} value={s} className="bg-black text-white">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 bottom-3 w-5 h-5 text-[#FFD700]/50 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60">SUBJECTS & MARKS</label>
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  placeholder="Subject Name (e.g., Maths)"
                  className="flex-1 p-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40"
                />
                <input
                  type="number"
                  value={subject.marks}
                  onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                  placeholder="Marks"
                  className="w-28 p-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40"
                />
                <Button type="button" onClick={() => removeSubject(index)} variant="destructive" className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addSubject} className="text-[#FFD700]/80 hover:text-[#FFD700] bg-black/40 hover:bg-[#FFD700]/10 w-full border border-[#FFD700]/20">
              + Add Another Subject
            </Button>
          </div>

           <div className="text-center text-white/50 my-4 text-sm">OR</div>

            <div>
                <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">UPLOAD RESULT FILE</label>
                <div className="relative border-2 border-dashed border-[#FFD700]/20 rounded-lg p-6 text-center cursor-pointer hover:border-[#FFD700]/40 transition-colors">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0" accept=".pdf,.jpg,.png"/>
                    <div className="flex flex-col items-center justify-center space-y-2 text-white/60">
                        <Upload size={32}/>
                        {file ? (
                             <p>Selected file: {file.name}</p>
                        ) : (
                             <p>Click to upload (PDF, PNG, JPG)</p>
                        )}
                    </div>
                </div>
            </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold text-base py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            {isSubmitting ? 'Submitting...' : <><Send size={20} className="mr-2" /> Send Result</>}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ResultSenderPage;
