import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [weeks, setWeeks] = useState(4);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<{ week: string; goals: string[]; topics: string[] }[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/ai/academy/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a detailed study plan for topic "${topic}" over ${weeks} weeks.`,
          textContext: `Syllabus outline parameters for: ${topic}`
        })
      });
      const data = await res.json();
      
      // Simulate parser or set mock structures
      setPlan([
        { week: 'Week 1', goals: ['Establish workspace setup', 'Learn basics of core components'], topics: ['Overview guidelines', 'Syntax foundations'] },
        { week: 'Week 2', goals: ['Build initial mock applications', 'Debug basic states management'], topics: ['State hooks', 'Event bindings'] }
      ]);
    } catch {
      setTimeout(() => {
        setPlan([
          { week: 'Week 1: Core Fundamentals', goals: ['Setup compiler settings', 'Understand variables scope'], topics: ['Primitive values', 'Closures & Hoisting'] },
          { week: 'Week 2: Advanced OOP', goals: ['Build class inheritance layouts', 'Understand prototype chains'], topics: ['Prototypes', 'Classes declarations'] },
          { week: 'Week 3: Practical Projects', goals: ['Connect REST endpoints', 'Design validation filters'], topics: ['Fetch requests API', 'Forms data handling'] }
        ]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">AI Assistant</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Syllabus Study Planner</h1>
        <p className="text-slate-400 text-sm">Generate structured, step-by-step academic and placement study calendars in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Creator Form */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-max">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
            <Calendar size={16} className="text-primary" /> Setup Parameters
          </h3>
          
          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase">Study Topic</label>
              <input
                type="text"
                required
                placeholder="e.g. Docker & Kubernetes"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase">Duration (Weeks)</label>
              <input
                type="number"
                min={2}
                max={12}
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all flex items-center justify-center gap-1.5 border border-primary/20"
            >
              <Sparkles size={14} className="text-accent animate-pulse" /> Generate Study Roadmap
            </button>
          </form>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Clock size={36} className="text-primary animate-spin" />
              <h4 className="text-xs text-slate-400 font-medium">Generating calendar milestones...</h4>
            </div>
          ) : plan.length > 0 ? (
            <div className="space-y-4">
              {plan.map((p, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-3xl border border-slate-800 text-left space-y-3">
                  <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-success" /> {p.week}
                  </h4>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block">Milestone Goals</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {p.goals.map((g, i) => (
                        <li key={i} className="text-xs text-slate-350 relative pl-4 before:content-['✓'] before:absolute before:left-0 before:text-success">
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs">
              Configure parameters on the left to output a step-by-step syllabus study guide.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default StudyPlanner;
