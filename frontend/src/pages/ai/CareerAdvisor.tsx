import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, Award, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const CareerAdvisor: React.FC = () => {
  const [role, setRole] = useState('Full Stack Engineer');
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      setSkills(['React.js', 'Node.js', 'System Design', 'Redis Cache', 'CI/CD Pipelines']);
      setLoading(false);
    }, 1000);
  };

  const marketDemand = [
    { year: '2024', positions: 42000 },
    { year: '2025', positions: 59000 },
    { year: '2026', positions: 78000 }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">AI Advisor</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Career Advisor</h1>
        <p className="text-slate-400 text-sm">Analyze industry trends, compatibility metrics, and prepare high-impact preparation targets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-max">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
            <Briefcase size={16} className="text-primary" /> Target Role
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Job Position</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>
            <button onClick={handlePredict} className="w-full py-2 bg-primary text-white text-xs font-bold rounded-xl border border-primary/20 flex items-center justify-center gap-1">
              <Sparkles size={14} className="text-accent animate-pulse" /> Evaluate Job Profile
            </button>
          </div>
        </div>

        {/* Evaluation Output & Demand */}
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="py-24 text-center text-xs text-slate-400">
              Evaluating compatibility indexes...
            </div>
          ) : skills.length > 0 ? (
            <div className="space-y-6">
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-left space-y-3">
                <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Required Skills Checklist</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-left space-y-3">
                <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">Estimated Market Demand Growth</h4>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketDemand}>
                      <XAxis dataKey="year" stroke="#64748B" fontSize={10} />
                      <YAxis stroke="#64748B" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#131A2E', borderColor: '#1E293B' }} />
                      <Bar dataKey="positions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs">
              Click Evaluate to compute hiring requirements.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default CareerAdvisor;
