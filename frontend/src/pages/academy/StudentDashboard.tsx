import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAcademy } from '../../context/AcademyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, BookOpen, Clock, Calendar, ShieldCheck, Download, 
  Sparkles, CheckCircle2, User, ChevronRight, Zap, Target
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const StudentDashboard: React.FC = () => {
  const { enrolledCourses, completedLessons, courses, studentCertificates, studentXP } = useAcademy();
  
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  // Calculate stats
  const totalLessonsCount = courses.reduce((acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0), 0);
  const lessonsCompletedCount = completedLessons.length;
  
  const activeCert = studentCertificates.find(c => c.id === activeCertId);

  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completed = completedLessons.filter(k => k.startsWith(`${courseId}_`)).length;
    return Math.round((completed / totalLessons) * 100);
  };

  // Recharts stats data
  const analyticData = [
    { name: 'Mon', hours: 1.5 },
    { name: 'Tue', hours: 2.2 },
    { name: 'Wed', hours: 0.8 },
    { name: 'Thu', hours: 3.5 },
    { name: 'Fri', hours: 1.8 },
    { name: 'Sat', hours: 4.0 },
    { name: 'Sun', hours: 2.5 }
  ];

  const handlePrintCert = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Return link */}
      <Link to="/academy" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ChevronRight size={14} className="rotate-180" /> Back to Academy Home
      </Link>

      {/* Header Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* XP Points Card */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between bg-gradient-to-tr from-primary/10 to-secondary/10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Student Reputation</span>
            <h3 className="text-2xl font-black text-white">{studentXP} XP Points</h3>
            <span className="text-[10px] text-primary font-bold">Level 3 Scholar</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <Sparkles size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Progress metrics</span>
            <h3 className="text-2xl font-black text-white">{lessonsCompletedCount} / {totalLessonsCount} Completed</h3>
            <span className="text-[10px] text-slate-400">Total lectures watched</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center text-success border border-success/30">
            <CheckCircle2 size={24} />
          </div>
        </div>

        {/* Certificates Earned */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Graduations</span>
            <h3 className="text-2xl font-black text-white">{studentCertificates.length} Certificates</h3>
            <span className="text-[10px] text-secondary font-bold">Shareable on LinkedIn</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30">
            <Award size={24} />
          </div>
        </div>

        {/* Study Goals tracker */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Daily Goals target</span>
            <h3 className="text-2xl font-black text-white">2.5 hrs / day</h3>
            <span className="text-[10px] text-warning font-bold">Weekly objective: 15 hrs</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-warning/20 flex items-center justify-center text-warning border border-warning/30">
            <Target size={24} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Learning Analytics & Certificates */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Charts panel */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <Clock size={16} className="text-primary" /> Study Hours Analytics (Weekly)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: 8, color: '#fff' }} />
                  <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enrolled Courses catalog */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display">My Enrolled Courses ({enrolledCourses.length})</h3>
            
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses.map(id => {
                  const course = courses.find(c => c.id === id);
                  if (!course) return null;
                  const progress = getCourseProgress(id);
                  return (
                    <div key={id} className="glass-panel p-5 rounded-2xl border border-slate-800 text-left space-y-4 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded uppercase tracking-wider block w-max">{course.category}</span>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{course.title}</h4>
                        <span className="text-[10px] text-slate-500 block">Progress: {progress}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
                      </div>

                      <Link
                        to={`/academy/player/${id}`}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-center text-xs font-bold text-white rounded-xl transition-colors border border-slate-700/60 block"
                      >
                        Enter Player Workspace
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-slate-800 rounded-3xl text-slate-500 text-xs">
                No active enrollments. Enroll in courses to start learning!
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Certificates Ledger & Verification Portal */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <Award size={18} className="text-secondary" /> Study Certifications
            </h3>
            
            {studentCertificates.length > 0 ? (
              <div className="space-y-3">
                {studentCertificates.map(cert => (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCertId(cert.id)}
                    className="w-full p-4 bg-[#131A2A] border border-slate-850 hover:border-secondary transition-colors rounded-2xl text-left flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{cert.courseName}</h4>
                      <span className="text-[9px] text-slate-500">Graduation Date: {cert.completionDate}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-500" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                Certificates are unlocked when courses are 100% completed.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Dynamic Printing PDF Certificate Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm print:relative print:p-0 print:bg-white print:backdrop-blur-none">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111728] border border-slate-800 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative print:border-none print:bg-white print:text-black print:shadow-none print:w-full print:max-w-none"
            >
              {/* Close (hide during print) */}
              <button 
                onClick={() => setActiveCertId(null)} 
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white print:hidden"
              >
                ✕
              </button>

              {/* Certificate Frame */}
              <div className="border-4 border-double border-secondary/40 p-6 rounded-2xl text-center space-y-6 bg-[#0c101d] print:border-black print:bg-white print:text-black">
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest block print:text-black">DEVVERSE ACADEMY CERTIFICATE OF COMPLETION</span>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 block">PROUDLY PRESENTED TO:</span>
                  <h2 className="text-2xl font-black text-white font-display uppercase tracking-wide print:text-black">{activeCert.studentName}</h2>
                </div>

                <p className="text-xs text-slate-350 max-w-md mx-auto leading-relaxed print:text-black">
                  For successfully demonstrating professional mastery and finishing all lectures, quizzes, and projects within the program:
                </p>

                <h3 className="text-lg font-black text-primary font-display print:text-black">{activeCert.courseName}</h3>

                <div className="flex justify-between items-end border-t border-slate-900 pt-6 max-w-md mx-auto text-xs text-slate-500 print:border-black print:text-black">
                  <div className="text-left space-y-1">
                    <span className="block text-[10px] font-bold text-slate-600">INSTRUCTOR:</span>
                    <span className="font-semibold text-slate-300 print:text-black">{activeCert.instructorName}</span>
                  </div>
                  
                  {/* QR Code Placeholder */}
                  <div className="w-16 h-16 bg-white p-1 rounded border border-slate-800 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-slate-800 to-black rounded opacity-80"></div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="block text-[10px] font-bold text-slate-600">VERIFICATION ID:</span>
                    <span className="font-mono text-[9px] text-slate-300 print:text-black">{activeCert.verificationId}</span>
                  </div>
                </div>
              </div>

              {/* Action commands (hidden during print) */}
              <div className="flex justify-between items-center print:hidden pt-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck size={14} className="text-success" /> Secure Blockchain Verified
                </div>
                <button
                  onClick={handlePrintCert}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Download size={14} /> Download Certificate (PDF)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default StudentDashboard;
