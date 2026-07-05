import React, { useState } from 'react';
import { useAcademy, Course } from '../../context/AcademyContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, BarChart3, Users, DollarSign, BookOpen, ChevronRight, Sparkles, AlertCircle, Save, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const InstructorDashboard: React.FC = () => {
  const { addCourse } = useAcademy();

  // Create course form states
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('React');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [price, setPrice] = useState(1999);
  const [description, setDescription] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [requirements, setRequirements] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Mock revenue analytics
  const revenueData = [
    { name: 'Jan', revenue: 12000 },
    { name: 'Feb', revenue: 18500 },
    { name: 'Mar', revenue: 24000 },
    { name: 'Apr', revenue: 22000 },
    { name: 'May', revenue: 31000 },
    { name: 'Jun', revenue: 45000 }
  ];

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim() || !description.trim()) {
      setErrorMsg('Course title and description are required.');
      return;
    }

    const newCourse: Course = {
      id: `c-${Date.now()}`,
      title: courseTitle,
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      instructor: 'Lead Instructor (You)',
      rating: 5.0,
      studentCount: 0,
      language: 'English',
      level,
      duration: '8 hrs',
      price: Number(price),
      discount: 10,
      category,
      outcomes: outcomes.split('\n').map(o => o.trim()).filter(Boolean),
      requirements: requirements.split('\n').map(r => r.trim()).filter(Boolean),
      description,
      modules: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Section 1: General Core Course Outline',
          lessons: [
            {
              id: `l-${Date.now()}-1`,
              title: '1.1 Foundations & Setup guidelines',
              type: 'Article',
              duration: '10 min',
              articleBody: 'Welcome to this course module. Make sure to download resources files.'
            }
          ]
        }
      ],
      reviews: [],
      faqs: []
    };

    addCourse(newCourse);
    setSuccessMsg('Course created successfully! Initial module curriculum populated.');
    setCourseTitle('');
    setDescription('');
    setOutcomes('');
    setRequirements('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Return button */}
      <Link to="/academy" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ChevronRight size={14} className="rotate-180" /> Back to Academy
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Earnings Card */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Instructor Earnings</span>
            <h3 className="text-2xl font-black text-white">₹1,52,500.00</h3>
            <span className="text-[10px] text-success font-bold">+18.4% monthly growth</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center text-success border border-success/30">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Student Enrollments */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Subscribers</span>
            <h3 className="text-2xl font-black text-white">5,310 Students</h3>
            <span className="text-[10px] text-primary font-bold">Across all active courses</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <Users size={24} />
          </div>
        </div>

        {/* Courses Created */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Course Catalog</span>
            <h3 className="text-2xl font-black text-white">4 Active Classes</h3>
            <span className="text-[10px] text-slate-400">All modules running smoothly</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30">
            <BookOpen size={24} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Revenue Analytics charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
              <BarChart3 size={18} className="text-primary" /> Revenue Streams
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: 8, color: '#fff' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Course Creator Form */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <Plus size={18} className="text-secondary" /> Create New Course
            </h3>

            {successMsg && (
              <div className="p-3 bg-success/15 border border-success/30 text-success text-xs rounded-xl flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-danger/10 border border-danger/20 text-danger text-xs rounded-xl flex items-center gap-1.5">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master System Design"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="React">React</option>
                    <option value="DSA">DSA</option>
                    <option value="Python">Python</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Brief Description</label>
                <textarea
                  required
                  placeholder="Explain learning outputs and modules..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Save size={14} /> Save & Build Course
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
export default InstructorDashboard;
