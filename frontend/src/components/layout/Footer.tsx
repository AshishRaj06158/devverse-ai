import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B0F19] border-t border-slate-900 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-secondary">
                <Sparkles size={12} className="text-white" />
              </span>
              <span className="font-display">DevVerse AI</span>
            </div>
            <p className="text-sm text-slate-500">
              The premium, all-in-one AI platform tailored to help developers and students master their studies, track coding progress, build beautiful portfolios, and land top-tier developer jobs.
            </p>
            <div className="flex items-center space-x-3 text-slate-500">
              <a href="#" className="hover:text-primary transition-colors"><Github size={18} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 font-display">Modules</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/auth" className="hover:text-slate-300 transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/auth" className="hover:text-slate-300 transition-colors">AI Interview Coach</Link></li>
              <li><Link to="/auth" className="hover:text-slate-300 transition-colors">Portfolio Builder</Link></li>
              <li><Link to="/auth" className="hover:text-slate-300 transition-colors">Notes Summarizer</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 font-display">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-slate-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 font-display">Stay Updated</h4>
            <p className="text-sm text-slate-500">Subscribe to our newsletter for technical tips and career strategies.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="developer@email.com"
                className="w-full bg-[#131A2A] border border-slate-800 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900/60 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} DevVerse AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={10} className="text-danger fill-danger" /> for the future of developer tooling.
          </p>
        </div>
      </div>
    </footer>
  );
};
