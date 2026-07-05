import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Award,
  Zap,
  Clock,
  Sparkles,
  ArrowUpRight,
  FileSearch,
  FileCode,
  Mail,
  Mic,
  BookOpen,
  Github,
  Bell
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock progress data for charts
  const studyData = [
    { name: 'Mon', minutes: 45, problems: 2 },
    { name: 'Tue', minutes: 80, problems: 5 },
    { name: 'Wed', minutes: 30, problems: 1 },
    { name: 'Thu', minutes: 90, problems: 4 },
    { name: 'Fri', minutes: 120, problems: 7 },
    { name: 'Sat', minutes: 60, problems: 3 },
    { name: 'Sun', minutes: 75, problems: 4 }
  ];

  const quickActions = [
    { title: 'Analyze Resume', path: '/resume-analyzer', icon: <FileSearch size={20} className="text-primary" />, desc: 'Check ATS score and keywords' },
    { title: 'Resume Builder', path: '/resume-builder', icon: <FileCode size={20} className="text-secondary" />, desc: 'Write PDF resume with AI' },
    { title: 'Interview Coach', path: '/interview-coach', icon: <Mic size={20} className="text-success" />, desc: 'Mock interview practice' },
    { title: 'Notes Summarizer', path: '/notes-summarizer', icon: <BookOpen size={20} className="text-warning" />, desc: 'Flashcards & quizzes generator' },
  ];

  const recentActivity = [
    { id: '1', type: 'Resume', msg: 'Analyzed Frontend Engineer resume', detail: 'ATS Score: 84%', time: '2 hours ago' },
    { id: '2', type: 'Interview', msg: 'Completed Backend Developer mock session', detail: 'Overall Rating: 78/100', time: '1 day ago' },
    { id: '3', type: 'Study', msg: 'Summarized Notes PDF: Database Systems', detail: 'Generated 12 flashcards', time: '3 days ago' },
    { id: '4', type: 'Coding', msg: 'Logged progress on LeetCode problems', detail: 'Solved 3 Medium, 1 Hard', time: '4 days ago' }
  ];

  const notifications = [
    { id: 'n1', title: 'Resume Analysis Tip', text: 'Consider adding "Docker" and "CI/CD" to match recent backend roles.' },
    { id: 'n2', title: 'Weekly Recap', text: 'You completed all 5 of your daily coding goals. Keep the streak alive!' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Premium Welcome Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-glow-banner animate-mesh-shift p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-2 text-left z-10">
          <div className="inline-flex items-center gap-1 bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            <Sparkles size={12} className="text-accent animate-pulse" /> Career Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Welcome back, <span className="bg-gradient-to-r from-white via-slate-100 to-accent bg-clip-text text-transparent">{user?.displayName || 'Developer'}</span>!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            "Your workspace is ready. Today is a great day to audit your resume, practice mock coding interviews, or summarize heavy academic notes."
          </p>
        </div>
        
        {/* Streak Stats Visual Card */}
        <div className="flex items-center gap-4 bg-[#0F172A]/80 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl z-10 shadow-xl shrink-0 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning shrink-0">
            <Zap size={24} className="fill-warning animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Daily Streak</span>
            <span className="text-lg font-black text-white">{user?.streak || 5} Days Logged</span>
            <span className="text-[9px] font-medium text-success block">Keep the momentum going!</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Metric 1 */}
        <motion.div whileHover={{ y: -2 }} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume ATS Rating</p>
            <h3 className="text-2xl font-extrabold text-white">84%</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/15 text-success border border-success/20">Optimal</span>
          </div>
          <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <FileSearch size={22} />
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div whileHover={{ y: -2 }} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interview Score</p>
            <h3 className="text-2xl font-extrabold text-white">78/100</h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-warning/15 text-warning border border-warning/20">Average</span>
          </div>
          <div className="p-3.5 rounded-xl bg-success/10 border border-success/20 text-success">
            <Mic size={22} />
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div whileHover={{ y: -2 }} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Problems Solved</p>
            <h3 className="text-2xl font-extrabold text-white">
              {(user?.solvedCount?.easy || 45) + (user?.solvedCount?.medium || 28) + (user?.solvedCount?.hard || 8)}
            </h3>
            <span className="text-[10px] text-slate-400">Mock GitHub Synced</span>
          </div>
          <div className="p-3.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary">
            <Award size={22} />
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div whileHover={{ y: -2 }} className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Study Time logged</p>
            <h3 className="text-2xl font-extrabold text-white">500m</h3>
            <span className="text-[10px] text-slate-400">This week</span>
          </div>
          <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/20 text-accent">
            <Clock size={22} />
          </div>
        </motion.div>

      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Charts & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Charts section */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Study minutes & Coding Practice</h3>
                <p className="text-xs text-slate-500">Weekly tracking of focus sessions and problems solved</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Focus Time
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Problems
                </span>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 8, color: '#fff' }} />
                  <Area type="monotone" dataKey="minutes" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMinutes)" strokeWidth={2} />
                  <Area type="monotone" dataKey="problems" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorProblems)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-display">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.path}
                  className="glass-panel glass-panel-hover p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 group-hover:scale-105 transition-transform">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{action.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Profile details & Notifications */}
        <div className="space-y-8">
          
          {/* Developer Profile card (About Section) */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={user?.displayName || 'Avatar'}
                className="w-12 h-12 rounded-full border-2 border-primary/40 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">{user?.displayName || 'Developer'}</h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{user?.role || 'Student'}</span>
              </div>
            </div>

            {user?.bio && (
              <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-primary/40 pl-3 py-0.5">
                "{user.bio}"
              </p>
            )}

            {user?.skills && user.skills.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Skills Stack</span>
                <div className="flex flex-wrap gap-1">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-[10px] text-slate-350">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user?.achievements && user.achievements.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Achievements</span>
                <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                  {user.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

            {user?.certificates && user.certificates.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Certificates</span>
                <div className="flex flex-wrap gap-1">
                  {user.certificates.map((cert, idx) => (
                    <span key={idx} className="bg-primary/10 border border-primary/15 px-2 py-0.5 rounded text-[9px] text-primary font-semibold">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Target Milestone Progress */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Target Milestones</h3>
            <div className="space-y-3.5">
              
              {/* Milestone 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Resume Optimization</span>
                  <span className="text-white">84% / 90% Target</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Mock Interview Score</span>
                  <span className="text-white">78% / 85% Target</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">LeetCode Solved Target</span>
                  <span className="text-white">
                    {((user?.solvedCount?.easy || 45) + (user?.solvedCount?.medium || 28) + (user?.solvedCount?.hard || 8))} / 150 Solved
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{
                      width: `${Math.min(100, ((((user?.solvedCount?.easy || 45) + (user?.solvedCount?.medium || 28) + (user?.solvedCount?.hard || 8)) / 150) * 100))}%`
                    }}
                  ></div>
                </div>
              </div>

            </div>
          </div>

          {/* Notifications Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-primary" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Notifications</h3>
            </div>
            <div className="space-y-3">
              {notifications.map((note) => (
                <div key={note.id} className="p-3 rounded-xl bg-[#131A2A] border border-slate-900 flex flex-col gap-1">
                  <span className="text-xs font-bold text-white">{note.title}</span>
                  <p className="text-xs text-slate-400 leading-normal">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex justify-between items-start gap-2 pb-3 border-b border-slate-900 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{act.msg}</h4>
                    <span className="text-[10px] text-slate-500 leading-none mt-1 inline-block">{act.detail}</span>
                  </div>
                  <span className="text-[10px] text-slate-600 shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Module Grid shortcut */}
          <div className="p-6 rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
            <Github size={28} className="text-slate-400 mb-2" />
            <h4 className="text-sm font-semibold text-white">More Modules</h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">Access PYQ Analysis, Coding Trackers, and custom portfolios via navigation.</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Link to="/pyq-analyzer" className="py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors">PYQ Prep</Link>
              <Link to="/coding-tracker" className="py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors">Code Log</Link>
              <Link to="/portfolio-builder" className="py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors">Portfolio</Link>
              <Link to="/profile" className="py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors">Profile</Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default Dashboard;
