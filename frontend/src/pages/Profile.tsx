import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Key, Save, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateUserProfileState } = useAuth();
  
  const [displayName, setDisplayName] = useState(user?.displayName || 'Ashish Raj');
  const [customKey, setCustomKey] = useState(localStorage.getItem('devverse_gemini_key') || '');
  const [activeRole, setActiveRole] = useState<'Student' | 'Admin'>(user?.role || 'Student');

  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [achievements, setAchievements] = useState(user?.achievements?.join(', ') || '');
  const [certificates, setCertificates] = useState(user?.certificates?.join(', ') || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [github, setGithub] = useState(user?.github || '');

  // Load custom firebase config from localStorage
  const getInitialFirebaseConfig = () => {
    try {
      const data = localStorage.getItem('devverse_firebase_config');
      if (data) {
        const parsed = JSON.parse(data);
        return {
          apiKey: parsed.apiKey || '',
          projectId: parsed.projectId || ''
        };
      }
    } catch (_) {}
    return { apiKey: '', projectId: '' };
  };

  const initialFirebase = getInitialFirebaseConfig();
  const [fbApiKey, setFbApiKey] = useState(initialFirebase.apiKey);
  const [fbProjectId, setFbProjectId] = useState(initialFirebase.projectId);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      // Save details to auth context
      await updateUserProfileState({
        displayName,
        role: activeRole,
        bio,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        achievements: achievements.split(',').map(s => s.trim()).filter(Boolean),
        certificates: certificates.split(',').map(s => s.trim()).filter(Boolean),
        phone,
        linkedin,
        github
      });

      // Save key override to localStorage if any
      if (customKey.trim()) {
        localStorage.setItem('devverse_gemini_key', customKey.trim());
      } else {
        localStorage.removeItem('devverse_gemini_key');
      }

      // Save Firebase config override
      if (fbApiKey.trim() && fbProjectId.trim()) {
        const configObj = {
          apiKey: fbApiKey.trim(),
          projectId: fbProjectId.trim()
        };
        localStorage.setItem('devverse_firebase_config', JSON.stringify(configObj));
      } else {
        localStorage.removeItem('devverse_firebase_config');
      }

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white font-display">Workspace Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure profile details, manage access permissions, and override model settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Avatar Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-primary/20 mb-4">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-base font-bold text-white font-display">{displayName}</h3>
            <span className="text-xs text-slate-500">{user?.email}</span>

            <div className="mt-4 px-3 py-1 rounded-xl text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400 border border-slate-700/65">
              Role: {user?.role || 'Student'}
            </div>

            <div className="flex items-center gap-1.5 mt-6 text-xs text-slate-400 bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-850">
              <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
              <span>Mock Sandbox Mode active</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form details */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            
            {/* Status alerts */}
            <AnimatePresence mode="wait">
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-success/10 border border-success/20 text-success text-xs flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  <span>Profile updated successfully.</span>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs flex items-center gap-2"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">General Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Email Address (ReadOnly)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-500 focus:outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Short Bio / Tagline</label>
                  <textarea
                    placeholder="Brief description about your background..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary h-20 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Skills Stack (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Node.js, CSS"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Achievements (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Won Hackathon 2026, Solved 300+ Problems"
                      value={achievements}
                      onChange={(e) => setAchievements(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Certificates (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Google Cloud Architect, Meta React Developer"
                      value={certificates}
                      onChange={(e) => setCertificates(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Phone / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">LinkedIn Username / Link</label>
                    <input
                      type="text"
                      placeholder="linkedin.com/in/ashish-raj"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">GitHub Username / Link</label>
                    <input
                      type="text"
                      placeholder="github.com/ashishraj"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Role settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
                <Shield size={16} className="text-primary" /> Role & Permissions
              </h3>
              <p className="text-[11px] text-slate-500">Choose between Student or Administrator role. Admins unlock analytical dashboards and global stat panels.</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveRole('Student')}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    activeRole === 'Student'
                      ? 'bg-primary/10 border-primary text-white'
                      : 'bg-[#131A2A] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Student Developer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('Admin')}
                  className={`py-2 rounded-xl text-xs font-semibold border ${
                    activeRole === 'Admin'
                      ? 'bg-secondary/10 border-secondary text-white'
                      : 'bg-[#131A2A] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Administrator
                </button>
              </div>
            </div>

            {/* Optional Client-Side Firebase Override */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
                <Shield size={16} className="text-primary" /> Firebase Config Override
              </h3>
              <p className="text-[11px] text-slate-500">Provide custom client credentials to connect the auth state to your own Firebase project.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Firebase API Key"
                  value={fbApiKey}
                  onChange={(e) => setFbApiKey(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Firebase Project ID"
                  value={fbProjectId}
                  onChange={(e) => setFbProjectId(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Optional Client-Side Gemini Key */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
                <Key size={16} className="text-secondary" /> Gemini AI Key Override
              </h3>
              <p className="text-[11px] text-slate-500">Provide an optional client-side Gemini key if you want to bypass the server's default configuration.</p>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all border border-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={14} />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Settings
                </>
              )}
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
export default Profile;
