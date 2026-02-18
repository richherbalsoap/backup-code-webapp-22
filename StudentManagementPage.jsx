
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, X, Upload, User, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAppStore from '@/store/appStore';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D', 'E'];

const getSortableClassIndex = (classVal) => {
    const standard = classVal.replace('Class ', '');
    const index = standards.indexOf(standard);
    return index === -1 ? Infinity : index;
};

const StudentModal = ({ isOpen, onClose, onSave, student }) => {
    const [formData, setFormData] = useState(
        student || {
            name: '',
            standard: '',
            section: '',
            parentName: '',
            parentContact: '',
            avatar: null,
        }
    );
    const [fileName, setFileName] = useState('');

    React.useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({ name: '', standard: '', section: '', parentName: '', parentContact: '', avatar: null });
        }
        setFileName('');
    }, [student, isOpen]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSave = () => {
        onSave(formData);
    };

  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
        onClick={onClose}
    >
        <div
            className="bg-black/90 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-[#FFD700]/30 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-2xl font-bold text-[#FFD700] mb-6">{student ? 'Edit Student' : 'Add Student'}</h2>
            <Button onClick={onClose} className="absolute top-4 right-4 bg-transparent hover:bg-[#FFD700]/10 p-2 h-auto rounded-full">
                <X className="text-white/70" size={20}/>
            </Button>

            <div className="space-y-5">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-28 h-28 rounded-full bg-black/40 border-2 border-dashed border-[#FFD700]/30 flex items-center justify-center overflow-hidden">
                        {formData.avatar ? (
                            <img src={formData.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} className="text-[#FFD700]/40" />
                        )}
                    </div>
                    <div className="relative">
                         <Button asChild variant="outline" className="bg-black/40 border-[#FFD700]/20 hover:bg-[#FFD700]/10 text-white/80">
                            <div>
                                <Upload size={16} className="mr-2"/> Upload Photo
                            </div>
                        </Button>
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                    </div>
                    {fileName && <p className="text-xs text-white/50">{fileName}</p>}
                </div>

                <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-black/40 rounded-lg text-white placeholder:text-white/40 border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40" />
                <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.standard} onValueChange={value => setFormData(prev => ({...prev, standard: value}))}>
                        <SelectTrigger className="w-full p-3 bg-black/40 rounded-lg text-white border border-[#FFD700]/20 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40">
                            <SelectValue placeholder="Standard" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                            {standards.map(s => <SelectItem key={s} value={s} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Select value={formData.section} onValueChange={value => setFormData(prev => ({...prev, section: value}))}>
                        <SelectTrigger className="w-full p-3 bg-black/40 rounded-lg text-white border border-[#FFD700]/20 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                            {sections.map(s => <SelectItem key={s} value={s} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <input type="text" placeholder="Parent's Name" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full p-3 bg-black/40 rounded-lg text-white placeholder:text-white/40 border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40" />
                <input type="text" placeholder="Parent's Contact" value={formData.parentContact} onChange={e => setFormData({...formData, parentContact: e.target.value})} className="w-full p-3 bg-black/40 rounded-lg text-white placeholder:text-white/40 border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40" />
                
                <Button onClick={handleSave} className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold py-3 shadow-[0_0_20px_rgba(255,215,0,0.3)]">Save Changes</Button>
            </div>
        </div>
    </div>
  );
}

function StudentManagementPage() {
  const students = useAppStore(state => state.students);
  const addStudent = useAppStore(state => state.addStudent);
  const updateStudent = useAppStore(state => state.updateStudent);
  const deleteStudentFromStore = useAppStore(state => state.deleteStudent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    deleteStudentFromStore(id);
    toast({ title: "Success", description: "Student record deleted." });
  };

  const handleSaveStudent = (studentData) => {
    if (studentData.id) {
      updateStudent(studentData.id, studentData);
      toast({ title: "Success", description: "Student details updated." });
    } else {
      addStudent({ ...studentData, id: Date.now().toString() });
      toast({ title: "Success", description: "New student added." });
    }
    setIsModalOpen(false);
  };
  
  const allAvailableClasses = useMemo(() => standards.map(s => `Class ${s}`).sort((a, b) => getSortableClassIndex(a) - getSortableClassIndex(b)), []);
  const allAvailableSections = useMemo(() => [...sections].sort(), []);

  const filteredStudents = useMemo(() => {
      return students
          .filter(s => selectedClass === 'All Classes' || `Class ${s.standard}` === selectedClass)
          .filter(s => selectedSection === 'All Sections' || s.section === selectedSection)
          .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [students, selectedClass, selectedSection, searchTerm]);

  const groupedStudents = useMemo(() => {
      const groups = filteredStudents.reduce((acc, student) => {
          const classKey = `Class ${student.standard}`;
          if (!acc[classKey]) {
              acc[classKey] = [];
          }
          acc[classKey].push(student);
          return acc;
      }, {});
      return Object.keys(groups).sort((a, b) => getSortableClassIndex(a) - getSortableClassIndex(b)).reduce((acc, key) => {
          acc[key] = groups[key];
          return acc;
      }, {});
  }, [filteredStudents]);

  return (
    <>
      <Helmet>
        <title>Student Management - EDULinker</title>
      </Helmet>
      
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Manage Student Records</h1>
            <Button onClick={handleAddStudent} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <Plus size={20} className="mr-2" />
                Add Student
            </Button>
        </div>

        <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-2xl p-6 w-full mx-auto space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">CLASS</label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-full px-4 py-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40">
                            <SelectValue placeholder="All Classes" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                            <SelectItem value="All Classes" className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">All Classes</SelectItem>
                            {allAvailableClasses.map(c => <SelectItem key={c} value={c} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                     <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">SECTION</label>
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger className="w-full px-4 py-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40">
                            <SelectValue placeholder="All Sections" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-[#FFD700]/20 max-h-60 overflow-y-auto">
                            <SelectItem value="All Sections" className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">All Sections</SelectItem>
                            {allAvailableSections.map(s => <SelectItem key={s} value={s} className="text-white focus:bg-[#FFD700]/10 focus:text-[#FFD700]">{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-xs font-bold tracking-wider text-[#FFD700]/60 mb-2">STUDENT NAME</label>
                     <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 bg-black/40 border-[#FFD700]/20 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40"/>
                </div>
            </div>
        </div>

        {filteredStudents.length > 0 ? (
            Object.keys(groupedStudents).map(classGroup => (
                <div key={classGroup}>
                    <h2 className="text-white text-2xl font-bold mb-4 px-2">{classGroup}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupedStudents[classGroup].map(student => (
                        <div 
                            key={student.id} 
                            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-2xl p-5 space-y-4 flex flex-col hover:border-[#FFD700]/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 flex-grow">
                            <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center text-[#FFD700] text-2xl font-bold overflow-hidden flex-shrink-0 border border-[#FFD700]/20">
                              {student.avatar ? (
                                 <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                 student.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{student.name}</h3>
                              <div className="flex gap-2 text-xs mt-1">
                                <span className="bg-[#FFD700]/10 text-[#FFD700]/80 px-2 py-0.5 rounded border border-[#FFD700]/20">Section {student.section}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-black/40 p-4 rounded-lg space-y-2 text-white/80 text-sm mt-4 border border-[#FFD700]/10">
                              <div className="flex items-center gap-3">
                                  <User size={16} className="text-[#FFD700]/50" />
                                  <span>Parent: {student.parentName}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <Phone size={16} className="text-[#FFD700]/50" />
                                  <span>{student.parentContact}</span>
                              </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <Button onClick={() => handleEditStudent(student)} variant="outline" className="w-full bg-black/40 hover:bg-[#FFD700]/10 border-[#FFD700]/20 text-white">
                              <Edit size={16} className="mr-2"/>
                              Edit
                            </Button>
                            <Button onClick={() => handleDeleteStudent(student.id)} variant="destructive" className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400">
                              <Trash2 size={16} className="mr-2"/>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
            ))
          ) : (
            <div className="text-center py-16">
                <p className="text-white/50 text-lg">No students found.</p>
                <p className="text-white/40">Add students using the "Add Student" button above.</p>
            </div>
          )
        }
      </div>

      <StudentModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveStudent} 
          student={editingStudent} 
      />
    </>
  );
}

export default StudentManagementPage;
