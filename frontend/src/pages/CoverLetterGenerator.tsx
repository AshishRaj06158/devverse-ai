import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Download, Clipboard, Check, FileText } from 'lucide-react';

export const CoverLetterGenerator: React.FC = () => {
  const [role, setRole] = useState('Full Stack Engineer');
  const [companyName, setCompanyName] = useState('Stripe');
  const [jobDescription, setJobDescription] = useState('We are looking for a developer to help scale core payment gateways, build modular dashboard APIs in React and TypeScript, and optimize performance.');
  const [resumeText, setResumeText] = useState('Ashish Raj is a software engineer skilled in React, TypeScript, Node.js, and Google Gemini AI integration.');
  
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !companyName) return;

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/cover-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, companyName, jobDescription, resumeText })
      });
      if (!response.ok) throw new Error('Cover letter generation failed');
      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (err) {
      console.error(err);
      // Mock Fallback cover letter
      const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${companyName}. With my solid foundation in software development, combined with my hands-on experience building full-stack applications, I am confident in my ability to make an immediate impact on your engineering team.

In my previous projects, I have demonstrated a strong command of modern web technologies, designing highly modular architectures and optimizing client-side performance. The opportunity to contribute to ${companyName}'s vision is incredibly exciting to me, as I align closely with your dedication to innovation and engineering excellence.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my skills and background align with the needs of your team.

Sincerely,
[Your Name]`;
      setCoverLetter(letter);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCoverLetter = () => {
    if (!coverLetter) return;
    const printWindow = window.open('', '', 'height=800,width=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Cover Letter</title>');
      printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #1E293B; font-size: 14px; white-space: pre-wrap; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(coverLetter);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">Module 3</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Cover Letter Generator</h1>
        <p className="text-slate-400 text-sm mt-1">Produce customized, job-specific cover letters using Google Gemini, matching target descriptions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-fit">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Configure Job Details</h3>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Target Role</label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Job Description</label>
              <textarea
                placeholder="Paste key responsibilities..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-24 resize-none focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Your Resume Highlights</label>
              <textarea
                placeholder="Skills, experience summary to reference..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-24 resize-none focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all border border-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Drafting Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate AI Cover Letter
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Results */}
        <div className="space-y-4">
          
          {/* Header Controls */}
          {coverLetter && (
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
              >
                {copied ? <Check size={14} className="text-success" /> : <Clipboard size={14} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={downloadCoverLetter}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          )}

          {/* Letter Body */}
          <div className="h-full min-h-[55vh]">
            <AnimatePresence mode="wait">
              {coverLetter ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel p-8 rounded-3xl border border-slate-800 h-full text-left"
                >
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full h-[45vh] bg-transparent resize-none border-none text-slate-200 text-sm leading-relaxed focus:outline-none scrollbar-thin"
                  />
                </motion.div>
              ) : (
                <div className="h-full min-h-[50vh] rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 bg-slate-900/10">
                  <FileText size={48} className="text-slate-600 mb-3" />
                  <h3 className="text-base font-bold text-white">No Cover Letter Generated</h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">Configure your role, company name, and click "Generate" to create a custom cover letter.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};
export default CoverLetterGenerator;
