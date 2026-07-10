import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, BookOpen, Send, Clipboard } from 'lucide-react';

export const ResearchAssistant: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleSearch = () => {
    if (!topic.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setResults(`📚 Academic Research Summary: "${topic}"

### Abstract Summary
The recent shifts in engineering design patterns focus heavily on Client-Side Hydration optimizations and Edge compute layouts to achieve fast page load speeds.

### Key Recommended Citations
1. **Verma et al. (2025):** "State Machines in React Frameworks." *Journal of Software Design*, Vol. 12, pp. 45-56.
2. **Kaur & Raj (2026):** "Scaling Serverless REST Deployments." *ACM Transactions on Cloud Systems*, pp. 102-114.
`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">AI Research</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Research Assistant</h1>
        <p className="text-slate-400 text-sm">Summarize literature publications, search references, and assemble bibliography drafts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Topic Input */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-max">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Thesis / Topic</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="e.g. Edge Compute caching"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
            />
            <button onClick={handleSearch} className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl border border-primary/20 flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-accent animate-pulse" /> Research Literature
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="py-24 text-center text-xs text-slate-500 animate-pulse">
              Compiling academic abstracts database...
            </div>
          ) : results ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left space-y-4 font-mono text-xs text-slate-350 leading-relaxed whitespace-pre-line relative">
              <button 
                onClick={() => navigator.clipboard.writeText(results)} 
                className="absolute right-4 top-4 p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white"
                title="Copy to clipboard"
              >
                <Clipboard size={14} />
              </button>
              {results}
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs">
              Search a research topic to compile citation references.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default ResearchAssistant;
