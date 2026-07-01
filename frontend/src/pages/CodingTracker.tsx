import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Github, Plus, Zap, Award, Target, Flame } from 'lucide-react';

interface SolvedProblem {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platform: string;
  date: string;
}

export const CodingTracker: React.FC = () => {
  const { user, updateUserProfileState } = useAuth();
  
  const [problemTitle, setProblemTitle] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [platform, setPlatform] = useState('LeetCode');
  
  const [dailyGoal, setDailyGoal] = useState(3);
  const [solvedList, setSolvedList] = useState<SolvedProblem[]>([
    { title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', date: '2026-06-28' },
    { title: 'Add Two Numbers', difficulty: 'Medium', platform: 'LeetCode', date: '2026-06-29' },
    { title: 'Merge k Sorted Lists', difficulty: 'Hard', platform: 'LeetCode', date: '2026-06-29' }
  ]);

  // Handle manual log submission
  const handleLogProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle.trim()) return;

    const newProblem: SolvedProblem = {
      title: problemTitle,
      difficulty,
      platform,
      date: new Date().toISOString().split('T')[0]
    };

    setSolvedList([newProblem, ...solvedList]);
    setProblemTitle('');

    // Update global counters in user context
    const currentSolved = user?.solvedCount || { easy: 0, medium: 0, hard: 0 };
    const diffLower = difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
    
    updateUserProfileState({
      solvedCount: {
        ...currentSolved,
        [diffLower]: currentSolved[diffLower] + 1
      },
      streak: (user?.streak || 0) + 1
    });
  };

  // Mock calendar heatmap squares (last 30 days)
  const heatmapSquares = Array.from({ length: 35 }).map((_, idx) => {
    const solvedCount = idx % 5 === 0 ? 0 : idx % 3 === 0 ? 3 : idx % 2 === 0 ? 1 : 5;
    let bgColor = 'bg-slate-800'; // 0 solved
    if (solvedCount === 1) bgColor = 'bg-emerald-950 border border-emerald-900/60';
    if (solvedCount === 3) bgColor = 'bg-emerald-700';
    if (solvedCount === 5) bgColor = 'bg-emerald-500';

    return { id: idx, count: solvedCount, colorClass: bgColor };
  });

  // Recharts difficulty chart data
  const chartData = [
    { name: 'Easy', count: user?.solvedCount?.easy || 45, fill: '#10B981' },
    { name: 'Medium', count: user?.solvedCount?.medium || 28, fill: '#F59E0B' },
    { name: 'Hard', count: user?.solvedCount?.hard || 8, fill: '#EF4444' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Module 7</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Coding Goal Tracker</h1>
        <p className="text-slate-400 text-sm mt-1">Log solved coding problems, configure focus targets, and trace your daily streak progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & Goal Settings */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Logger */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <Plus size={18} className="text-primary" /> Log Solved Problem
            </h3>
            
            <form onSubmit={handleLogProblem} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Problem Title</label>
                <input
                  type="text"
                  placeholder="e.g. Reverse Linked List"
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e: any) => setDifficulty(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Platform</label>
                  <select
                    value={platform}
                    onChange={(e: any) => setPlatform(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="LeetCode">LeetCode</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-colors border border-primary/20 flex items-center justify-center gap-1.5"
              >
                Log Problem Progress
              </button>
            </form>
          </div>

          {/* Goal Manager */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <Target size={18} className="text-secondary" /> Daily Goal Target
            </h3>
            <div className="flex justify-between items-center bg-[#131A2A] border border-slate-900 p-3 rounded-xl">
              <span className="text-xs text-slate-400">Solved today:</span>
              <span className="text-xs font-extrabold text-white">
                {solvedList.filter(s => s.date === new Date().toISOString().split('T')[0]).length} / {dailyGoal}
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500">Modify Target</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="bg-[#131A2A] border border-slate-800 rounded-lg px-2 py-1 text-xs text-white w-20 text-center"
                />
                <span className="text-[11px] text-slate-500 self-center">problems per day</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Heatmap & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Heatmap calendar */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
                <Flame size={18} className="text-warning fill-warning" /> Activity Heatmap
              </h3>
              <span className="text-xs text-slate-500 font-medium">Streak: {user?.streak || 5} days</span>
            </div>
            
            {/* Squares grid */}
            <div className="flex flex-wrap gap-2 p-4 bg-slate-900/30 rounded-2xl border border-slate-900/80">
              {heatmapSquares.map((sq) => (
                <div
                  key={sq.id}
                  className={`w-6 h-6 rounded-md transition-transform hover:scale-110 cursor-pointer ${sq.colorClass}`}
                  title={`${sq.count} problems solved`}
                />
              ))}
            </div>

            {/* Legend indicators */}
            <div className="flex gap-4 mt-4 text-[10px] text-slate-500 font-bold justify-end px-1">
              <span>Less</span>
              <span className="w-3.5 h-3.5 rounded bg-slate-800"></span>
              <span className="w-3.5 h-3.5 rounded bg-emerald-950"></span>
              <span className="w-3.5 h-3.5 rounded bg-emerald-700"></span>
              <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
              <span>More</span>
            </div>
          </div>

          {/* Recharts chart and Solve history logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stats Chart */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
                <Award size={18} className="text-success" /> Difficulty Summary
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 8 }} />
                    <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Solved Problems Feed */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Solved History</h3>
              <div className="space-y-3 max-h-[14rem] overflow-y-auto pr-1">
                {solvedList.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-[#131A2A] border border-slate-900 rounded-xl">
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
                      <span className="text-[10px] text-slate-500">{item.platform}</span>
                    </div>
                    <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded border ${
                      item.difficulty === 'Easy'
                        ? 'bg-success/10 text-success border-success/20'
                        : item.difficulty === 'Medium'
                        ? 'bg-warning/10 text-warning border-warning/20'
                        : 'bg-danger/10 text-danger border-danger/20'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
export default CodingTracker;
