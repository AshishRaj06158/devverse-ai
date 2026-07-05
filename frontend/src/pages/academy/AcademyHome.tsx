import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAcademy } from '../../context/AcademyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, BookOpen, Clock, Star, Zap, Award, Sparkles, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'Java', 'C++',
  'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'Firebase', 'MongoDB', 'SQL',
  'System Design', 'Operating Systems', 'DBMS', 'Computer Networks', 'DSA', 'Competitive Programming',
  'Cloud Computing', 'DevOps', 'Cyber Security', 'Android Development', 'Web Development', 'UI/UX',
  'Interview Preparation', 'Aptitude', 'Soft Skills', 'Placement Preparation', 'Resume Building', 'Career Guidance'
];

export const AcademyHome: React.FC = () => {
  const { courses, banners, enrolledCourses, completedLessons } = useAcademy();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  
  // Banner slider logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef<any>(null);
  const activeBanners = banners.filter(b => b.isActive);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeBanners.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    if (activeBanners.length > 1) {
      sliderInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % activeBanners.length);
      }, 6000);
    }
  };

  const stopAutoSlide = () => {
    if (sliderInterval.current) {
      clearInterval(sliderInterval.current);
    }
  };

  const handleNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide(prev => (prev + 1) % activeBanners.length);
    startAutoSlide();
  };

  const handlePrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
    startAutoSlide();
  };

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Calculate course completion progress
  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const completed = completedLessons.filter(k => k.startsWith(`${courseId}_`)).length;
    return Math.round((completed / totalLessons) * 100);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-12">
      
      {/* Platform Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Module 9</span>
          <h1 className="text-3xl font-extrabold text-white mt-2 font-display flex items-center gap-2">
            DevVerse Academy <GraduationCap className="text-secondary animate-bounce" size={28} style={{ animationDuration: '3s' }} />
          </h1>
          <p className="text-slate-400 text-sm mt-1">Master premium tech stacks, practice coding interfaces, and download certifications.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/academy/dashboard" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#131A2A] border border-slate-800 text-slate-300 hover:text-white hover:border-primary transition-all duration-300 flex items-center gap-1.5 shadow-md">
            <Award size={14} className="text-primary" /> Student Dashboard
          </Link>
          <Link to="/academy/instructor" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#131A2A] border border-slate-800 text-slate-300 hover:text-white hover:border-secondary transition-all duration-300 flex items-center gap-1.5 shadow-md">
            <Sparkles size={14} className="text-secondary" /> Instructor Hub
          </Link>
        </div>
      </div>

      {/* Hero Banner Carousel Slider */}
      {activeBanners.length > 0 && (
        <div className="relative h-[280px] sm:h-[350px] w-full rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeBanners[currentSlide].bgImage})` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${activeBanners[currentSlide].gradientOverlay} flex flex-col justify-center p-6 sm:p-12 text-left`}>
                <div className="max-w-2xl space-y-4">
                  {activeBanners[currentSlide].badge && (
                    <span className="inline-block bg-primary border border-primary/30 px-3 py-1 rounded-full text-[9px] font-black text-white tracking-widest uppercase">
                      {activeBanners[currentSlide].badge}
                    </span>
                  )}
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-display text-glow-purple">
                    {activeBanners[currentSlide].title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-base font-medium line-clamp-2">
                    {activeBanners[currentSlide].subtitle}
                  </p>
                  
                  {/* Banner Countdown Offering */}
                  {activeBanners[currentSlide].countdownDate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-950/65 border border-red-900/60 text-red-400 font-mono text-[10px] sm:text-xs">
                      <Clock size={12} className="animate-spin" style={{ animationDuration: '4s' }} /> Countdown offer ends: {new Date(activeBanners[currentSlide].countdownDate!).toLocaleDateString()}
                    </div>
                  )}

                  <div className="pt-2">
                    <Link
                      to={activeBanners[currentSlide].ctaPath}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 text-xs sm:text-sm font-bold text-white transition-all duration-300 border border-primary/20"
                    >
                      {activeBanners[currentSlide].ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Arrow Controllers */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700/50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700/50"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { stopAutoSlide(); setCurrentSlide(idx); startAutoSlide(); }}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-primary w-5' : 'bg-slate-655 bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Continue Learning dashboard component (If enrolled in courses) */}
      {enrolledCourses.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display flex items-center gap-1.5">
            <BookOpen size={16} className="text-primary" /> Continue Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map(id => {
              const course = courses.find(c => c.id === id);
              if (!course) return null;
              const progress = getCourseProgress(id);
              return (
                <div key={id} className="p-4 bg-[#131A2A]/60 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{course.title}</h4>
                    <span className="text-[10px] text-primary font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <Link
                    to={`/academy/player/${id}`}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-center text-[10px] font-bold text-white rounded-lg transition-colors border border-slate-700/60 block"
                  >
                    Resume Study
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Course search & filtering panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search academy courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131A2A] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 self-stretch md:self-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
            <SlidersHorizontal size={14} /> Filters:
          </span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedLevel === lvl
                  ? 'bg-primary text-white border border-primary/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Horizontal Scrolling List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Browse Top Fields</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Subjects
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Catalog Display Grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white font-display">Available Courses ({filteredCourses.length})</h3>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <motion.div
                key={course.id}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between group"
              >
                {/* Cover Frame */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#0F172A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-[9px] font-bold text-primary uppercase">
                    {course.category}
                  </div>
                </div>

                {/* Details Info */}
                <div className="p-5 text-left space-y-3 flex-grow">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{course.level} • {course.duration}</span>
                  <h4 className="text-sm font-bold text-white font-display line-clamp-2 min-h-[40px] leading-tight">
                    {course.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">Instructor: <span className="text-slate-300 font-semibold">{course.instructor}</span></p>

                  <div className="flex justify-between items-center pt-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-warning">
                      <Star size={12} className="fill-warning" /> {course.rating} ({course.studentCount} students)
                    </span>
                  </div>
                </div>

                {/* Bottom Pricing Row */}
                <div className="p-5 border-t border-slate-850 bg-[#131A2A]/40 flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-xs text-slate-500 line-through">₹{course.price}</span>
                    <h5 className="text-base font-black text-white">
                      ₹{Math.round(course.price * (1 - course.discount / 100))}
                    </h5>
                  </div>
                  <Link
                    to={`/academy/course/${course.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-colors border border-primary/20"
                  >
                    View Curriculum
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 border-2 border-dashed border-slate-800 rounded-3xl text-center space-y-2">
            <BookOpen size={36} className="text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No courses match your query</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">Try clearing selected filters or enter a different key search term.</p>
          </div>
        )}
      </div>

    </div>
  );
};
export default AcademyHome;
