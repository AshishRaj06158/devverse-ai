import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileSearch,
  FileCode,
  Mail,
  Mic,
  BookOpen,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export const Landing: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const modules = [
    {
      icon: <FileSearch className="text-primary" size={28} />,
      title: 'AI Resume Analyzer',
      desc: 'Instant ATS scoring, keyword density checks, grammar audits, and actionable feedback based on target roles.',
      badge: 'ATS Checker'
    },
    {
      icon: <FileCode className="text-secondary" size={28} />,
      title: 'Resume Builder',
      desc: 'Generate slick resumes, select beautiful templates, and use AI to automatically rephrase experience bullet points.',
      badge: 'PDF Ready'
    },
    {
      icon: <Mail className="text-accent" size={28} />,
      title: 'Cover Letter Gen',
      desc: 'Craft highly customized, role-specific cover letters by matching job descriptions with your uploaded resume.',
      badge: 'AI Writer'
    },
    {
      icon: <Mic className="text-success" size={28} />,
      title: 'AI Interview Coach',
      desc: 'Simulate mock technical and behavioral interviews. Get granular scores on grammar, metrics, and technical correctness.',
      badge: 'Audio Ready'
    },
    {
      icon: <BookOpen className="text-warning" size={28} />,
      title: 'Notes Summarizer',
      desc: 'Convert heavy study PDFs into smart key chapters, interactive flashcards, AI quizzes, and conceptual mind maps.',
      badge: 'Study Tool'
    },
    {
      icon: <TrendingUp className="text-danger" size={28} />,
      title: 'PYQ Analyzer',
      desc: 'Upload Previous Year Question papers to identify repeated questions, analyze difficulty trends, and view predictions.',
      badge: 'Exam Prep'
    },
    {
      icon: <Award className="text-primary" size={28} />,
      title: 'Coding Tracker',
      desc: 'Log problems solved, set coding goals, view streaks, and visualize your daily progress with interactive heatmaps.',
      badge: 'Progress'
    },
    {
      icon: <Sparkles className="text-secondary" size={28} />,
      title: 'Portfolio Builder',
      desc: 'Input your skills and projects to immediately compile and download custom, deployment-ready HTML portfolios.',
      badge: 'SEO Ready'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full Stack Engineer at Stripe',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      quote: 'The AI Resume Analyzer scored my resume and recommended keywords I was missing. Two weeks later, I passed the ATS screening and landed an interview at Stripe!',
      rating: 5
    },
    {
      name: 'Rohan Sharma',
      role: 'Computer Science Student',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      quote: 'The Notes Summarizer is my favorite. Uploading an 80-page textbook PDF and getting short chapters, flashcards, and quizzes made studying for my finals so much faster.',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'Junior Frontend Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      quote: 'Mock interviews with the AI Coach helped me build confidence. The feedback on communication and how to structure my coding answers was spot-on.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'How does the AI Resume Analyzer evaluate my ATS score?',
      a: 'It scans your resume text (via PDF upload or text pasting) and compares it against industry standards and specific job roles using Google Gemini. It checks for relevant tech keywords, metrics, formatting errors, and grammar.'
    },
    {
      q: 'Do I need a Firebase or Gemini key to test the application?',
      a: 'No! If you do not provide keys, the application automatically enters a fully-featured Demo Sandbox Mode with mock fallback data. You can inspect the entire user experience immediately.'
    },
    {
      q: 'Can I export my generated resume and cover letter?',
      a: 'Absolutely. The Resume Builder and Cover Letter modules let you download professional PDF files directly to your device.'
    },
    {
      q: 'How does the PYQ Analyzer predict exam questions?',
      a: 'It parses uploaded Previous Year Question PDFs, counts question repetitions, classifies topics, and uses Gemini to analyze recurring academic patterns to predict high-probability questions.'
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-mesh">
      
      {/* Decorative Neon Auroras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-60 z-0">
        <div className="absolute -top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-primary/15 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[5%] right-[15%] w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-[25%] left-[35%] w-[300px] h-[300px] rounded-full bg-accent/15 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 text-xs font-semibold text-primary mb-6 shadow-lg shadow-primary/5"
          >
            <Zap size={14} className="animate-pulse text-accent" />
            Empowering Next-Gen Engineers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 font-display"
          >
            Learn. Build.{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Get Hired.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            DevVerse AI brings together career accelerators, interview coaches, automated portfolios, study assistants, and coding trackers into a single, cohesive developer workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/auth?mode=signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 border border-primary/20"
            >
              Start Free Today
              <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-all duration-300"
            >
              Explore Modules
            </a>
          </motion.div>

          {/* Floating dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 relative mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-[#1E293B]/40 p-3 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-30 blur-lg"></div>
            <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-[#0F172A]">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                <span className="w-3 h-3 rounded-full bg-danger/80"></span>
                <span className="w-3 h-3 rounded-full bg-warning/80"></span>
                <span className="w-3 h-3 rounded-full bg-success/80"></span>
                <span className="text-[11px] text-slate-500 ml-4 font-mono">https://devverse.ai/dashboard</span>
              </div>
              {/* Fake dashboard content */}
              <div className="p-6 text-left grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 p-5 rounded-lg border border-slate-800 bg-[#1E293B]/30 space-y-4">
                  <div className="h-4 bg-slate-800 rounded w-1/3 skeleton-shimmer"></div>
                  <div className="h-28 bg-slate-800/50 rounded skeleton-shimmer"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-primary/20 border border-primary/30 rounded w-24"></div>
                    <div className="h-8 bg-slate-800 rounded w-24"></div>
                  </div>
                </div>
                <div className="p-5 rounded-lg border border-slate-800 bg-[#1E293B]/30 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-800 rounded w-1/2 skeleton-shimmer"></div>
                    <div className="h-3 bg-slate-800 rounded w-3/4 skeleton-shimmer"></div>
                  </div>
                  <div className="flex items-end justify-between mt-6">
                    <span className="text-3xl font-extrabold text-white">87%</span>
                    <span className="text-xs text-primary font-semibold">ATS Score</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Modules Section */}
      <section id="features" className="py-20 bg-slate-900/30 border-y border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
              8 Powerful Modules in One Workspace
            </h2>
            <p className="text-slate-400">
              No more hopping between five different tools. DevVerse AI gives you a unified ecosystem to study, practice, build portfolios, and polish resumes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700/60 group-hover:scale-110 transition-transform">
                      {mod.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display">{mod.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{mod.desc}</p>
                </div>
                <Link
                  to="/auth"
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-secondary transition-colors"
                >
                  Launch Module
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">How It Works</h2>
            <p className="text-slate-400">Deploying AI to supercharge your developer journey is extremely straightforward.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 -z-10"></div>
            
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up with Google or Email. Instantly unlock the customizable dashboard.' },
              { step: '02', title: 'Feed the AI', desc: 'Upload your notes PDFs, resumes, cover letters, or past year papers.' },
              { step: '03', title: 'Practice & Adapt', desc: 'Review ATS scores, mock-quiz yourself, track coding streaks, and refine code.' },
              { step: '04', title: 'Download & Deploy', desc: 'Export your cover letters, generate PDF resumes, and host your HTML portfolio.' }
            ].map((item, index) => (
              <div key={item.step} className="text-center flex flex-col items-center">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-primary/40 text-sm font-extrabold text-primary mb-4 shadow-lg shadow-primary/10">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-display">{item.title}</h3>
                <p className="text-sm text-slate-400 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">Loved by Developers</h2>
            <p className="text-slate-400">See how students and junior engineers have optimized their workflow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test) => (
              <div key={test.name} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-warning mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-warning" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed mb-6">"{test.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full border border-slate-700" />
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{test.name}</h4>
                    <p className="text-xs text-slate-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing UI */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">Simple, Student-Friendly Pricing</h2>
            <p className="text-slate-400">Start for free and upgrade only when you need heavy AI processing capacity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between relative">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">Developer Free</h3>
                <p className="text-sm text-slate-500 mb-6">Perfect for sandbox testing and core templates.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-slate-500">/ forever</span>
                </div>
                <ul className="space-y-4 text-sm text-slate-400 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> 10 Resume Analyses per month</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Basic Resume Templates</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Manual Coding Tracker</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Basic Notes Summarizer</li>
                </ul>
              </div>
              <Link
                to="/auth?mode=signup"
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="glass-panel p-8 rounded-2xl border-2 border-secondary flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary to-secondary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-primary/30">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">DevVerse Pro</h3>
                <p className="text-sm text-slate-400 mb-6">Unlimited AI tokens and voice integration features.</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">$9</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="space-y-4 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Unlimited Resume Analyses & Improvements</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Unlimited AI Mock Interviews</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Premium PDF templates & hosting</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> Advanced PYQ predictions with reports</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-secondary" /> 24/7 Priority support & updates</li>
                </ul>
              </div>
              <Link
                to="/auth?mode=signup"
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 border border-primary/20"
              >
                Upgrade to Pro
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/30 border-t border-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 font-display">Frequently Asked Questions</h2>
            <p className="text-slate-400">Everything you need to know about DevVerse AI.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden border border-slate-800/80 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white focus:outline-none hover:bg-slate-800/30"
                >
                  <span className="font-semibold text-slate-200 text-sm md:text-base flex items-center gap-2">
                    <HelpCircle size={18} className="text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center glass-panel p-12 rounded-3xl border border-slate-800">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-display">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Create an account in 30 seconds. Build resumes, track coding streaks, summary notes, and practice interviews today.
          </p>
          <Link
            to="/auth?mode=signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
};
export default Landing;
