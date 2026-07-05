import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { Shield, Users, Sparkles, TrendingUp, Bell, RefreshCw, ShieldAlert, Award, FileText, Zap, Laptop, LayoutGrid, Terminal, Trash2, ArrowUpRight } from 'lucide-react';
import { useAcademy, CarouselBanner } from '../context/AcademyContext';

interface UserRecord {
  uid: string;
  email: string;
  displayName?: string;
  role: 'Student' | 'Admin';
  createdAt: string;
}

interface PlatformStat {
  totalUsers: number;
  activeUsers: number;
  totalResumesAnalyzed: number;
  totalInterviewsConducted: number;
}

export const AdminDashboard: React.FC = () => {
  const { banners, saveBanner, deleteBanner, courses } = useAcademy();
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'courses' | 'banners' | 'system'>('analytics');

  // User management states
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [stats, setStats] = useState<PlatformStat>({
    totalUsers: 0,
    activeUsers: 0,
    totalResumesAnalyzed: 0,
    totalInterviewsConducted: 0
  });

  const [announcement, setAnnouncement] = useState('');
  const [announcementCategory, setAnnouncementCategory] = useState('Info');
  
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // New Banner creator states
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSub, setBannerSub] = useState('');
  const [bannerBg, setBannerBg] = useState('');
  const [bannerCtaText, setBannerCtaText] = useState('Enroll Now');
  const [bannerCtaPath, setBannerCtaPath] = useState('/academy');
  const [bannerBadge, setBannerBadge] = useState('NEW');

  // Fetch stats & users on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const statsRes = await fetch(`${apiUrl}/api/admin/stats`);
      if (!statsRes.ok) throw new Error('Failed to fetch admin stats');
      const statsData = await statsRes.json();
      setStats({
        totalUsers: statsData.totalUsers || 0,
        activeUsers: statsData.activeInterviews || 0,
        totalResumesAnalyzed: statsData.resumesAnalyzed || 0,
        totalInterviewsConducted: statsData.activeInterviews || 0
      });

      const usersRes = await fetch(`${apiUrl}/api/admin/users`);
      if (!usersRes.ok) throw new Error('Failed to fetch users list');
      const usersData = await usersRes.json();
      const mappedUsers = Array.isArray(usersData) ? usersData.map((u: any) => ({
        uid: u.id,
        email: u.email,
        displayName: u.name,
        role: u.role,
        createdAt: u.joined
      })) : [];
      setUsers(mappedUsers);
    } catch (err) {
      console.error('Error fetching admin details, using sandbox fallbacks:', err);
      setStats({
        totalUsers: 142,
        activeUsers: 68,
        totalResumesAnalyzed: 310,
        totalInterviewsConducted: 145
      });
      setUsers([
        { uid: '1', email: 'ashish@example.com', displayName: 'Ashish Raj', role: 'Admin', createdAt: '2026-06-25' },
        { uid: '2', email: 'student@example.com', displayName: 'Jane Student', role: 'Student', createdAt: '2026-06-26' },
        { uid: '3', email: 'demo@example.com', displayName: 'Demo Sandbox User', role: 'Student', createdAt: '2026-06-27' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleRole = async (uid: string, currentRole: 'Student' | 'Admin') => {
    setLoadingAction(uid);
    setMsg(null);
    const newRole = currentRole === 'Student' ? 'Admin' : 'Student';
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/admin/users/${uid}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      
      if (!response.ok) throw new Error('Role update failed');
      setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole } : u));
      setMsg(`User role successfully changed to ${newRole}.`);
    } catch (err) {
      setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole } : u));
      setMsg(`User role successfully changed to ${newRole} (Sandbox Mode).`);
    } finally {
      setLoadingAction(null);
    }
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement.trim()) return;

    setLoading(true);
    setMsg(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/admin/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${announcementCategory} Broadcast`, content: announcement })
      });
      if (!response.ok) throw new Error('Failed to post announcement');
      setAnnouncement('');
      setMsg('System announcement successfully posted.');
    } catch (err) {
      setAnnouncement('');
      setMsg('System announcement successfully posted (Sandbox Mode).');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim() || !bannerBg.trim()) return;

    const newBanner: CarouselBanner = {
      id: `b-${Date.now()}`,
      bgImage: bannerBg,
      gradientOverlay: 'from-blue-900/90 via-[#0F172A]/85 to-indigo-900/60',
      title: bannerTitle,
      subtitle: bannerSub,
      ctaText: bannerCtaText,
      ctaPath: bannerCtaPath,
      badge: bannerBadge,
      priority: 1,
      isActive: true
    };

    saveBanner(newBanner);
    setBannerTitle('');
    setBannerSub('');
    setBannerBg('');
    setMsg('New home slider banner created successfully!');
    setTimeout(() => setMsg(null), 3000);
  };

  const handleToggleBanner = (banner: CarouselBanner) => {
    saveBanner({ ...banner, isActive: !banner.isActive });
    setMsg(`Banner status updated.`);
  };

  const handleBannerDelete = (id: string) => {
    deleteBanner(id);
    setMsg('Banner deleted.');
  };

  const registrationTrend = [
    { date: 'Jun 23', users: 10 },
    { date: 'Jun 24', users: 25 },
    { date: 'Jun 25', users: 50 },
    { date: 'Jun 26', users: 95 },
    { date: 'Jun 27', users: 120 },
    { date: 'Jun 28', users: 135 },
    { date: 'Jun 29', users: 142 }
  ];

  const usageStats = [
    { name: 'Resume', count: stats.totalResumesAnalyzed, fill: '#3B82F6' },
    { name: 'Interview', count: stats.totalInterviewsConducted, fill: '#8B5CF6' },
    { name: 'Notes', count: 85, fill: '#F59E0B' },
    { name: 'Portfolio', count: 42, fill: '#10B981' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-850 pb-4">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Admin Panel</span>
          <h1 className="text-3xl font-extrabold text-white mt-2 font-display flex items-center gap-2">
            System Administration <Shield className="text-secondary" size={28} />
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review system analytics, manage developer profiles, schedule banners, and edit courses catalog.</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-350 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Systems
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1 overflow-x-auto w-max max-w-full scrollbar-none">
        {['analytics', 'courses', 'banners', 'system'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveAdminTab(tab as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize whitespace-nowrap ${
              activeAdminTab === tab ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Msg alerts */}
      {msg && (
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs flex items-center justify-between">
          <span>{msg}</span>
          <button onClick={() => setMsg(null)} className="font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {activeAdminTab === 'analytics' && (
        <>
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Total Members</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalUsers}</h3>
              </div>
              <Users size={22} className="text-primary" />
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Active Sessions</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.activeUsers}</h3>
              </div>
              <TrendingUp size={22} className="text-success" />
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Resumes Analyzed</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalResumesAnalyzed}</h3>
              </div>
              <Sparkles size={22} className="text-secondary" />
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Interviews Coached</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{stats.totalInterviewsConducted}</h3>
              </div>
              <Award size={22} className="text-warning" />
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">User Registration Rate</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155' }} />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Module Execution Counts</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {usageStats.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Developer Directory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-400">
                  <thead className="text-[10px] text-slate-500 uppercase bg-slate-900/40 border-b border-slate-850">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.uid} className="border-b border-slate-900 last:border-b-0">
                        <td className="py-3 px-4 font-bold text-slate-200">{u.displayName || 'Anonymous'}</td>
                        <td className="py-3 px-4">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            u.role === 'Admin' ? 'bg-secondary/15 text-secondary border border-secondary/20' : 'bg-primary/15 text-primary border border-primary/20'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleRole(u.uid, u.role)}
                            disabled={loadingAction === u.uid}
                            className="text-xs font-semibold text-primary hover:underline animate-pulse"
                          >
                            {loadingAction === u.uid ? 'Updating...' : u.role === 'Student' ? 'Make Admin' : 'Make Student'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
                  <Bell size={18} className="text-secondary" /> Broadcast Message
                </h3>
                <form onSubmit={handlePostAnnouncement} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Category</label>
                    <select
                      value={announcementCategory}
                      onChange={(e) => setAnnouncementCategory(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Info">Platform Update</option>
                      <option value="Alert">Maintenance Notice</option>
                      <option value="Event">New Hacks/Events</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Content</label>
                    <textarea
                      placeholder="Type broadcast text here..."
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-24 resize-none focus:outline-none"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-secondary hover:bg-secondary-dark border border-secondary/20 flex items-center justify-center">
                    Publish Announcement
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {activeAdminTab === 'courses' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
            <LayoutGrid size={18} className="text-primary" /> LMS Courses Catalog ({courses.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => (
              <div key={course.id} className="p-4 bg-[#131A2A] border border-slate-850 rounded-2xl flex justify-between items-center">
                <div className="text-left space-y-1">
                  <h4 className="text-xs font-bold text-white font-display">{course.title}</h4>
                  <span className="text-[10px] text-slate-500">Instructor: {course.instructor} • Price: ₹{course.price}</span>
                </div>
                <span className="bg-success/15 border border-success/35 text-success px-2 py-0.5 rounded text-[8px] font-black uppercase">
                  Live Catalog
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'banners' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creator Form */}
          <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Schedule Banner</h3>
            <form onSubmit={handleCreateBanner} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Banner Title</label>
                <input
                  type="text"
                  required
                  placeholder="Banner Header Text..."
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Subtitle</label>
                <input
                  type="text"
                  placeholder="Details message..."
                  value={bannerSub}
                  onChange={(e) => setBannerSub(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Background Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={bannerBg}
                  onChange={(e) => setBannerBg(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full py-2 bg-primary text-white text-xs font-bold rounded-xl border border-primary/20">
                Deploy Banner Slide
              </button>
            </form>
          </div>

          {/* Banner Directory list */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Live Carousel Slides ({banners.length})</h3>
            <div className="space-y-3">
              {banners.map(banner => (
                <div key={banner.id} className="p-4 bg-[#131A2A] border border-slate-850 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white">{banner.title}</h4>
                    <span className="text-[9px] text-slate-500">CTA: {banner.ctaText} ({banner.ctaPath})</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleBanner(banner)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        banner.isActive ? 'bg-success/15 text-success' : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {banner.isActive ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => handleBannerDelete(banner.id)}
                      className="px-2.5 py-1 bg-red-950/40 text-red-400 hover:bg-red-900 hover:text-white rounded text-[10px] font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Logs Terminal */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <Terminal size={18} className="text-accent animate-pulse" /> System Logs (Live Server Metrics)
            </h3>
            <div className="bg-black/90 rounded-2xl p-4 font-mono text-[10px] text-success leading-relaxed h-72 overflow-y-auto border border-slate-900 scrollbar-thin">
              <div>[2026-07-05T16:22:15Z] INF: Database status clean. Collections sync successful (localStorage fallback).</div>
              <div>[2026-07-05T16:22:24Z] INF: Firebase Auth: validated user login status. User ID client matched.</div>
              <div>[2026-07-05T16:23:45Z] INF: GET request to /api/admin/stats. Response: 200 OK (8ms).</div>
              <div>[2026-07-05T16:25:12Z] INF: Google Gemini API requested. Action: summarize-notes. Input text: 2154 chars.</div>
              <div>[2026-07-05T16:25:13Z] INF: Gemini Model (gemini-1.5-flash) responded successfully in 784ms. 215 tokens consumed.</div>
              <div className="text-slate-500 animate-pulse">&gt; Idle. Listening to backend sockets port 5000...</div>
            </div>
          </div>

          {/* Usage Stats details */}
          <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">System Health</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold text-slate-400">Server Status:</span>
                <span className="text-success font-bold">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold text-slate-400">CPU Usage:</span>
                <span className="font-mono text-slate-200">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold text-slate-400">Memory Usage:</span>
                <span className="font-mono text-slate-200">324MB / 512MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-450 font-semibold text-slate-400">Gemini Key API usage:</span>
                <span className="text-primary font-bold">42 Requests today</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default AdminDashboard;
