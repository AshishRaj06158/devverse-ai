import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Linkedin, Github, Mail, Send, Copy, Check, MessageSquare, AlertCircle } from 'lucide-react';

export const About: React.FC = () => {
  // Loading dynamic authentication and profile context values
  const { user } = useAuth();

  // State managers for copy action, feedback message form, and alerts
  const [copied, setCopied] = useState<string | null>(null);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Dynamic user data variables with clean default fallbacks (Ashish Raj profile)
  const name = user?.displayName || 'Ashish Raj';
  const role = user?.role === 'Admin' ? 'Lead Systems Administrator' : 'Full Stack Developer';
  const email = user?.email || 'ashishraj@gmail.com';
  const bio = user?.bio || 'Passionate software developer building interactive web applications, AI tools, and sleek user interfaces.';
  const phone = user?.phone || '+91 9771596801';
  
  // Format social links with prefix checker
  const cleanLink = (link: string, prefix: string) => {
    if (!link) return '';
    if (link.startsWith('http://') || link.startsWith('https://')) return link;
    return `${prefix}${link}`;
  };

  const linkedinUrl = cleanLink(user?.linkedin || 'https://www.linkedin.com/in/ashish-raj-17b8a8396', 'https://');
  const githubUrl = cleanLink(user?.github || 'https://github.com/AshishRaj06158', 'https://');
  
  // WhatsApp dynamic URL builder
  const cleanPhoneDigits = phone.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhoneDigits.replace('+', '')}?text=Hi%20Ashish,%20I%2527d%20love%20to%20connect%20with%20you!`;

  // Click to Copy utility
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Handle mock message/comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) return;

    setIsSubmitting(true);
    
    // Simulate API delay for message submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setCommentName('');
      setCommentEmail('');
      setCommentText('');

      // Auto-hide success alert after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-left">
      
      {/* Premium Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="cyber-glow-banner animate-mesh-shift p-6 sm:p-8 rounded-3xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-2 text-left z-10">
          <span className="inline-flex items-center gap-1 bg-primary/20 border border-primary/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            <User size={12} className="text-accent" /> Developer Info
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            About & Contact Details
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
            Get in touch, view work platforms, and establish direct channels of communication.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Card: Avatar & Bio */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center text-center relative overflow-hidden">
            {/* Header Gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-primary/20 mb-4 object-cover mt-4">
              {name.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-lg font-bold text-white font-display">{name}</h2>
            <span className="text-xs text-primary font-semibold mt-0.5">{role}</span>

            <div className="w-full border-t border-slate-800/80 my-5"></div>

            <p className="text-xs text-slate-350 leading-relaxed italic">
              "{bio}"
            </p>
          </div>
        </div>

        {/* Right Cards: Contact Channels and Message/Comment Form */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Card 1: Communication Channels */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Communication Channels</h3>
            
            <div className="grid grid-cols-1 gap-3">
              
              {/* Phone / Mobile */}
              <div className="p-4 bg-[#131A2A] border border-slate-900 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Mobile / WhatsApp</span>
                    <span className="text-xs font-semibold text-white">{phone}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => copyToClipboard(phone, 'phone')}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copied === 'phone' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  </button>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-success/10 border border-success/20 text-success hover:bg-success/20 transition-colors flex items-center justify-center"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare size={14} />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-[#131A2A] border border-slate-900 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">Email ID</span>
                    <span className="text-xs font-semibold text-white">{email}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => copyToClipboard(email, 'email')}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copied === 'email' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  </button>
                  <a 
                    href={`mailto:${email}`}
                    className="p-1.5 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary hover:bg-secondary/20 transition-colors flex items-center justify-center"
                    title="Send Email"
                  >
                    <Send size={14} />
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-4 bg-[#131A2A] border border-slate-900 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">LinkedIn Profile</span>
                    <span className="text-xs font-semibold text-white truncate max-w-[200px] block">{user?.linkedin || 'linkedin.com/in/ashish-raj-17b8a8396'}</span>
                  </div>
                </div>
                <a 
                  href={linkedinUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-[#0077B5]/10 border border-[#0077B5]/20 text-[#0077B5] hover:bg-[#0077B5]/20 transition-colors flex items-center justify-center"
                  title="Visit LinkedIn"
                >
                  <Send size={14} />
                </a>
              </div>

              {/* GitHub */}
              <div className="p-4 bg-[#131A2A] border border-slate-900 rounded-2xl flex items-center justify-between group hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">GitHub Account</span>
                    <span className="text-xs font-semibold text-white truncate max-w-[200px] block">{user?.github || 'github.com/AshishRaj06158'}</span>
                  </div>
                </div>
                <a 
                  href={githubUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  title="Visit GitHub"
                >
                  <Send size={14} />
                </a>
              </div>

            </div>
          </div>

          {/* Card 2: Comments / Send Message Form */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <MessageSquare size={16} className="text-primary" /> Leave a Message / Comment
            </h3>
            
            <AnimatePresence mode="wait">
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-success/10 border border-success/20 text-success text-xs rounded-xl flex items-center gap-2"
                >
                  <Check size={16} />
                  <span>Message sent successfully! Thank you for connecting.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Message / Comment</label>
                <textarea
                  required
                  placeholder="Write your comment or message here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary h-24 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary hover:bg-primary-dark disabled:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
export default About;
