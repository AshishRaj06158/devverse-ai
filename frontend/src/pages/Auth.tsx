import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, Sparkles } from 'lucide-react';

export const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Student' | 'Admin'>('Student');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync state with URL search params (e.g. ?mode=signup)
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  // If already logged in, go to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    
    if (!email) {
      setError('Please fill in your email address.');
      return;
    }

    if (isForgotPassword) {
      setLoading(true);
      try {
        // Mock password recovery
        setTimeout(() => {
          setSuccessMsg('If this email is registered, a password recovery link has been sent.');
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'Failed to send recovery email.');
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        navigate('/dashboard');
      } else {
        await registerWithEmail(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-mesh">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl relative"
      >
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary mb-4 shadow-lg shadow-primary/30">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create DevVerse Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isForgotPassword
              ? 'Enter your email to receive recovery instructions.'
              : isLogin
              ? 'Access your developer workspace and AI tools.'
              : 'Join developers mastering their skills and career.'}
          </p>
        </div>

        {/* Error / Success Alerts */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-2 p-3.5 mb-5 rounded-xl bg-danger/10 border border-danger/25 text-danger text-xs leading-normal"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-2 p-3.5 mb-5 rounded-xl bg-success/10 border border-success/25 text-success text-xs leading-normal"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Sign Up Only) */}
          {!isLogin && !isForgotPassword && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                required
              />
            </div>
          </div>

          {/* Password (Login & SignUp Only) */}
          {!isForgotPassword && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                  required
                />
              </div>
            </div>
          )}

          {/* Role selector (Sign Up Only) */}
          {!isLogin && !isForgotPassword && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('Student')}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    role === 'Student'
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-[#131A2A] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Student / Developer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Admin')}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    role === 'Admin'
                      ? 'bg-secondary/10 border-secondary text-white'
                      : 'bg-[#131A2A] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all border border-primary/25 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : isForgotPassword ? (
              'Send Recovery Link'
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Divider (only for auth screen) */}
        {!isForgotPassword && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1E293B] px-3 text-slate-500 font-medium">Or Continue With</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate-200 border border-slate-800 hover:bg-slate-800/40 transition-colors"
            >
              <svg className="w-4 h-4 mr-1 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google Account
            </button>
          </>
        )}

        {/* Footer Switching links */}
        <div className="text-center mt-6 text-xs text-slate-500 font-medium">
          {isForgotPassword ? (
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setIsLogin(true);
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-primary hover:underline font-semibold"
            >
              Back to Login
            </button>
          ) : isLogin ? (
            <span>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-primary hover:underline font-semibold"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="text-primary hover:underline font-semibold"
              >
                Log In
              </button>
            </span>
          )}
        </div>

      </motion.div>
    </div>
  );
};
export default Auth;
