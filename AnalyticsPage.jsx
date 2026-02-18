
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';
import useAppStore from '@/store/appStore';

function AnalyticsPage() {
  const results = useAppStore(state => state.results);
  const students = useAppStore(state => state.students);
  const complaints = useAppStore(state => state.complaints);
  const homework = useAppStore(state => state.homework);

  const subjectPerformance = useMemo(() => {
    const subjectMap = {};
    results.forEach(result => {
      if (result.subjects && Array.isArray(result.subjects)) {
        result.subjects.forEach(sub => {
          const name = sub.name || sub.subject;
          const marks = parseInt(sub.marks) || 0;
          if (!subjectMap[name]) subjectMap[name] = { total: 0, count: 0 };
          subjectMap[name].total += marks;
          subjectMap[name].count += 1;
        });
      }
    });
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-cyan-500', 'bg-red-500', 'bg-indigo-500'];
    return Object.entries(subjectMap).map(([subject, data], index) => ({
      subject,
      avgScore: Math.round(data.total / data.count),
      color: colors[index % colors.length],
    }));
  }, [results]);

  const classPerformance = useMemo(() => {
    const classMap = {};
    results.forEach(result => {
      const key = `${result.standard}-${result.section}`;
      if (!classMap[key]) classMap[key] = { totalMarks: 0, subjectCount: 0, studentCount: 0, students: new Set() };
      if (result.subjects && Array.isArray(result.subjects)) {
        result.subjects.forEach(sub => {
          classMap[key].totalMarks += parseInt(sub.marks) || 0;
          classMap[key].subjectCount += 1;
        });
      }
      classMap[key].students.add(result.studentName);
    });
    return Object.entries(classMap).map(([cls, data]) => ({
      class: cls,
      avgScore: data.subjectCount > 0 ? Math.round(data.totalMarks / data.subjectCount) : 0,
      students: data.students.size,
    })).sort((a, b) => b.avgScore - a.avgScore);
  }, [results]);

  const overallAvg = useMemo(() => {
    if (subjectPerformance.length === 0) return 0;
    const total = subjectPerformance.reduce((sum, s) => sum + s.avgScore, 0);
    return Math.round(total / subjectPerformance.length);
  }, [subjectPerformance]);

  const topClass = useMemo(() => {
    if (classPerformance.length === 0) return '--';
    return classPerformance[0].class;
  }, [classPerformance]);

  const hasData = results.length > 0;

  return (
    <>
      <Helmet>
        <title>Analytics - EDULinker</title>
        <meta name="description" content="View school performance analytics and statistics" />
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-[#FFD700]" />
              <p className="text-white/60 text-sm">Total Students</p>
            </div>
            <p className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              {students.length}
            </p>
          </div>

          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Award size={20} className="text-[#FFD700]" />
              <p className="text-white/60 text-sm">Overall Average</p>
            </div>
            <p className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              {hasData ? `${overallAvg}%` : '--'}
            </p>
          </div>

          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={20} className="text-[#FFD700]" />
              <p className="text-white/60 text-sm">Top Class</p>
            </div>
            <p className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              {topClass}
            </p>
          </div>

          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={20} className="text-[#FFD700]" />
              <p className="text-white/60 text-sm">Results Recorded</p>
            </div>
            <p className="text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              {results.length}
            </p>
          </div>
        </div>

        {hasData ? (
          <>
            {subjectPerformance.length > 0 && (
              <div
                className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-[#FFD700] mb-6">Subject-wise Performance</h2>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={subject.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{subject.subject}</span>
                        <span className="text-[#FFD700] font-semibold">{subject.avgScore}%</span>
                      </div>
                      <div className="w-full bg-[#FFD700]/10 rounded-full h-3 overflow-hidden">
                        <div
                          style={{ width: `${Math.min(subject.avgScore, 100)}%` }}
                          className={`h-full ${subject.color} shadow-lg`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {classPerformance.length > 0 && (
              <div
                className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-[#FFD700] mb-6">Class-wise Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classPerformance.map((cls, index) => (
                    <div
                      key={cls.class}
                      className="bg-black/40 backdrop-blur-sm border border-[#FFD700]/20 rounded-lg p-4 hover:border-[#FFD700]/40 hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300"
                    >
                      <h3 className="text-white font-semibold text-lg mb-2">Class {cls.class}</h3>
                      <div className="space-y-1">
                        <p className="text-white/60 text-sm">Average Score</p>
                        <p className="text-2xl font-bold text-[#FFD700]">{cls.avgScore}%</p>
                        <p className="text-white/50 text-xs">{cls.students} student{cls.students !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className="bg-black/30 backdrop-blur-md border border-[#FFD700]/20 rounded-xl p-12 text-center"
          >
            <BookOpen size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg">No analytics data yet.</p>
            <p className="text-white/30 text-sm mt-2">Add student results from the Result Sender page to see performance analytics here.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AnalyticsPage;
