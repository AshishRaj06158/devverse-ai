import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Download, History, RefreshCw, Trash2 } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
}

interface AnalysisResult {
  atsScore: number;
  grammarScore: number;
  formattingScore: number;
  keywordMatch: number;
  missingSkills: string[];
  suggestions: Suggestion[];
  suggestedJobRoles: string[];
  roleAnalyzed: string;
  timestamp: string;
}

export const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobRole, setJobRole] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devverse_resume_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a valid PDF file.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF resume file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobRole', jobRole);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/analyze-resume`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. The API server might be starting up or offline.');
      }

      const data = await response.json();
      const analysis: AnalysisResult = {
        ...data,
        roleAnalyzed: jobRole,
        timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setResult(analysis);
      
      // Update history
      const updatedHistory = [analysis, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('devverse_resume_history', JSON.stringify(updatedHistory));
    } catch (err: any) {
      setError(err.message || 'An error occurred during resume analysis.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('devverse_resume_history');
  };

  // Mock download analysis as text file
  const downloadReport = () => {
    if (!result) return;
    const reportText = `DEVVERSE AI - RESUME ANALYSIS REPORT
Role: ${result.roleAnalyzed}
Date: ${result.timestamp}
=========================================
ATS SCORE: ${result.atsScore}/100
Keyword Match: ${result.keywordMatch}%
Grammar Score: ${result.grammarScore}%
Formatting Score: ${result.formattingScore}%

Missing Skills:
${result.missingSkills.map(s => `- ${s}`).join('\n')}

Suggestions:
${result.suggestions.map((s, i) => `${i + 1}. ${s.title}\n   ${s.description}`).join('\n\n')}
=========================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-analysis-${jobRole.toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Module 1</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Resume Analyzer</h1>
        <p className="text-slate-400 text-sm mt-1">Audit your resume for Applicant Tracking Systems (ATS) and unlock tailored recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Upload & Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Analyze Resume</h3>
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              
              {/* Target Job Role */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Target Job Role</label>
                <input
                  type="text"
                  placeholder="e.g. React Developer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                  required
                />
              </div>

              {/* File Dropzone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Upload PDF Resume</label>
                <div className="relative border-2 border-dashed border-slate-800 rounded-2xl hover:border-primary/50 transition-colors p-6 text-center flex flex-col items-center justify-center cursor-pointer bg-[#131A2A]/40">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud size={32} className="text-slate-500 mb-2" />
                  <span className="text-xs font-bold text-white">
                    {file ? file.name : 'Choose PDF file'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">PDF max 10MB</span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-danger/10 border border-danger/20 text-danger rounded-xl text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 transition-all border border-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Run ATS Audit
                  </>
                )}
              </button>

            </form>
          </div>

          {/* History Panel */}
          {history.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
                  <History size={16} /> History
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-slate-500 hover:text-danger p-1 rounded transition-colors"
                  title="Clear history"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {history.map((hist, index) => (
                  <div
                    key={index}
                    onClick={() => setResult(hist)}
                    className="p-3 rounded-xl bg-[#131A2A] border border-slate-900 cursor-pointer hover:border-primary/40 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{hist.roleAnalyzed}</h4>
                      <span className="text-[10px] text-slate-500">{hist.timestamp}</span>
                    </div>
                    <span className="text-xs font-extrabold text-primary">{hist.atsScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Scoring Header */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
                  
                  {/* Circular ATS score */}
                  <div className="sm:col-span-1 flex flex-col items-center justify-center">
                    <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-800 border-glow">
                      {/* Gradient border ring */}
                      <div className="absolute inset-2 rounded-full bg-[#0F172A] flex flex-col items-center justify-center z-10">
                        <span className="text-3xl font-extrabold text-white">{result.atsScore}</span>
                        <span className="text-[9px] uppercase font-bold text-slate-500">ATS Score</span>
                      </div>
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="48" stroke="#1E293B" strokeWidth="6" fill="transparent" />
                        <circle
                          cx="56"
                          cy="56"
                          r="48"
                          stroke="url(#atsScoreGrad)"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={301.6}
                          strokeDashoffset={301.6 - (301.6 * result.atsScore) / 100}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="atsScoreGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Other metrics */}
                  <div className="sm:col-span-3 grid grid-cols-3 gap-4 text-center sm:text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Keyword Match</span>
                      <h4 className="text-xl font-extrabold text-white">{result.keywordMatch}%</h4>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Grammar Score</span>
                      <h4 className="text-xl font-extrabold text-white">{result.grammarScore}%</h4>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Formatting</span>
                      <h4 className="text-xl font-extrabold text-white">{result.formattingScore}%</h4>
                    </div>
                  </div>

                </div>

                {/* Suggestions and missing skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Suggestions list */}
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Key Suggestions</h3>
                    <div className="space-y-3">
                      {result.suggestions.map((sug, i) => (
                        <div key={i} className="flex gap-2">
                          <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={16} />
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">{sug.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{sug.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing skills & job roles */}
                  <div className="space-y-6">
                    {/* Missing Skills */}
                    <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-display">Missing Tech Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map((skill) => (
                          <span key={skill} className="px-3 py-1 rounded-xl text-xs font-medium bg-danger/10 text-danger border border-danger/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suggested Roles */}
                    <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-display">Alternative Matches</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestedJobRoles.map((role) => (
                          <span key={role} className="px-3 py-1 rounded-xl text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Exporter button */}
                <div className="flex justify-end">
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
                  >
                    <Download size={14} /> Download Analysis Report
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[40vh] rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 bg-slate-900/10">
                <FileText size={48} className="text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white">No Resume Analyzed</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Upload your PDF resume on the left and click "Run ATS Audit" to receive AI feedback.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
export default ResumeAnalyzer;
