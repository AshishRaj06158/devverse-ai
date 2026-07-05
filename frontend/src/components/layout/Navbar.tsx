import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Star, LayoutDashboard, User, LogOut, ShieldAlert, Sparkles, Settings, GraduationCap, Briefcase, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks: { name: string; path: string; icon?: React.ReactNode }[] = user
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Academy', path: '/academy', icon: <GraduationCap size={18} /> },
        { name: 'Careers', path: '/academy/careers', icon: <Briefcase size={18} /> },
        { name: 'Community', path: '/academy/community', icon: <MessageSquare size={18} /> },
        { name: 'About', path: '/about', icon: <User size={18} /> },
        { name: 'Settings', path: '/profile', icon: <Settings size={18} /> },
      ]
    : [
        { name: 'Features', path: '/#features' },
        { name: 'How It Works', path: '/#how-it-works' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'FAQ', path: '/#faq' },
      ];

  if (user && user.role === 'Admin') {
    navLinks.push({ name: 'Admin Panel', path: '/admin', icon: <ShieldAlert size={18} /> });
  }

  // Smooth scroll helper for landing page anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const id = path.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        // Delayed scroll after navigation
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      navigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-xl font-bold tracking-wider text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/30">
                <Sparkles size={18} className="text-white" />
              </span>
              <span className="bg-gradient-to-r from-white via-slate-200 to-primary bg-clip-text text-transparent font-display">
                DevVerse <span className="text-secondary font-bold">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e: any) => handleAnchorClick(e, link.path)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-300'
                }`}
              >
                {link.icon && link.icon}
                {link.name}
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || 'Avatar'}
                    className="w-8 h-8 rounded-full border border-secondary"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight">{user.displayName}</p>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary/15 text-secondary border border-secondary/20">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-danger hover:bg-danger/10 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth?mode=login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="relative group overflow-hidden px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-800 bg-[#0F172A]"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e: any) => handleAnchorClick(e, link.path)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {link.icon && link.icon}
                  {link.name}
                </a>
              ))}

              {user ? (
                <div className="pt-4 mt-4 border-t border-slate-800 px-3">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={user.photoURL || ''}
                      alt={user.displayName || 'Avatar'}
                      className="w-10 h-10 rounded-full border border-secondary"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{user.displayName}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-danger/10 hover:bg-danger/20 border border-danger/25 transition-all"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800 px-3">
                  <Link
                    to="/auth?mode=login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
