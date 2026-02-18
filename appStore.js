import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      students: [],
      homework: [],
      complaints: [],
      results: [],
      announcements: [],

      addStudent: (student) => set((state) => ({
        students: [...state.students, { ...student, id: student.id || Date.now().toString() }]
      })),

      updateStudent: (id, updatedData) => set((state) => ({
        students: state.students.map(s => s.id === id ? { ...s, ...updatedData } : s)
      })),

      deleteStudent: (id) => set((state) => ({
        students: state.students.filter(s => s.id !== id)
      })),

      addHomework: (hw) => set((state) => ({
        homework: [...state.homework, { ...hw, id: hw.id || Date.now().toString(), createdAt: new Date().toISOString() }]
      })),

      addComplaint: (complaint) => set((state) => ({
        complaints: [...state.complaints, { ...complaint, id: complaint.id || Date.now().toString(), createdAt: new Date().toISOString() }]
      })),

      addResult: (result) => set((state) => ({
        results: [...state.results, { ...result, id: result.id || Date.now().toString(), createdAt: new Date().toISOString() }]
      })),

      addAnnouncement: (announcement) => set((state) => ({
        announcements: [...state.announcements, { ...announcement, id: announcement.id || Date.now().toString(), createdAt: new Date().toISOString() }]
      })),

      getStudentsByClass: (standard, section) => {
        const state = get();
        return state.students.filter(s => {
          if (standard && section) return s.standard === standard && s.section === section;
          if (standard) return s.standard === standard;
          return true;
        });
      },

      getResultsByStudent: (studentName) => {
        const state = get();
        return state.results.filter(r => r.studentName?.toLowerCase() === studentName?.toLowerCase());
      },
    }),
    {
      name: 'edulinker-storage',
    }
  )
);

export default useAppStore;
