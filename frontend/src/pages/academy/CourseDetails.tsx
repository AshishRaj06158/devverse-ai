import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAcademy } from '../../context/AcademyContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, FileText, CheckCircle2, ChevronDown, ChevronUp, Star, Globe, Clock, ShieldCheck, Zap } from 'lucide-react';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, enrollInCourse, enrolledCourses } = useAcademy();
  const navigate = useNavigate();

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'm-1-1': true // Expand first by default
  });

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-white">Course not found</h2>
        <Link to="/academy" className="text-primary mt-2 inline-block">Return to Academy Home</Link>
      </div>
    );
  }

  const isEnrolled = enrolledCourses.includes(course.id);
  const discountedPrice = Math.round(course.price * (1 - course.discount / 100));

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnroll = () => {
    enrollInCourse(course.id);
    navigate(`/academy/player/${course.id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Return button */}
      <Link to="/academy" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={14} /> Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Description */}
          <div className="space-y-4">
            <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {course.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display text-glow">
              {course.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 pt-2">
              <span className="flex items-center gap-1"><Star size={14} className="text-warning fill-warning" /> {course.rating} Rating</span>
              <span className="flex items-center gap-1"><Globe size={14} /> Lang: {course.language}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> Level: {course.level}</span>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">What you'll learn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.outcomes.map((out, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Curriculum Accordion */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Course Curriculum</h3>
            <div className="space-y-3">
              {course.modules.map(mod => {
                const isOpen = !!expandedModules[mod.id];
                return (
                  <div key={mod.id} className="border border-slate-850 bg-[#131A2A]/40 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full px-5 py-4 bg-slate-900/40 hover:bg-slate-900/80 transition-colors flex justify-between items-center text-left"
                    >
                      <div>
                        <span className="text-xs font-bold text-white font-display block">{mod.title}</span>
                        <span className="text-[10px] text-slate-500">{mod.lessons.length} study topics</span>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 py-2 border-t border-slate-850 bg-[#0F172A]/20 divide-y divide-slate-850/40">
                        {mod.lessons.map(les => (
                          <div key={les.id} className="py-3 flex justify-between items-center text-xs">
                            <span className="flex items-center gap-2 text-slate-300 font-medium">
                              {les.type === 'Video' ? <Play size={14} className="text-primary fill-primary/10" /> : <FileText size={14} className="text-secondary" />}
                              {les.title}
                            </span>
                            <span className="text-slate-500 font-mono text-[10px]">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Requirements</h3>
            <ul className="space-y-1">
              {course.requirements.map((req, idx) => (
                <li key={idx} className="text-xs text-slate-400 relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-secondary">
                  {req}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Side Pricing Card Checkout Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-6 p-6 text-left">
            <div className="h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">₹{discountedPrice}</span>
                <span className="text-xs text-slate-500 line-through">₹{course.price}</span>
                <span className="text-[10px] bg-red-950 border border-red-900 text-red-400 font-bold px-1.5 py-0.5 rounded">
                  {course.discount}% OFF
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Includes Lifetime Access, Assignments, Certificates, and Gemini AI assistant help.</p>
            </div>

            {isEnrolled ? (
              <Link
                to={`/academy/player/${course.id}`}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-success to-primary hover:shadow-lg hover:shadow-success/20 text-center block transition-all"
              >
                Go to Lesson Player
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Zap size={14} className="fill-white" /> Enroll & Start Learning
              </button>
            )}

            <div className="border-t border-slate-850 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck size={14} className="text-success" /> Verified Dynamic Certification
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default CourseDetails;
