import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, Sparkles, Terminal, ShieldAlert } from 'lucide-react';

export const CodingMentor: React.FC = () => {
  const [code, setCode] = useState(`function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i]; // Bug: Out of bounds access!
  }
  return sum;
}`);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setFeedback(`⚡ AI Code Analysis Feedback:

1. **Logical Bug Found:** In the loop declaration 'i <= arr.length', index 'i' reaches 'arr.length' which returns undefined. Change the comparison to 'i < arr.length'.
2. **Performance Tip:** For high-volume arrays, consider using the native Array.prototype.reduce() method for a cleaner, functional implementation.
3. **Refactored Suggestion:**
\`\`\`javascript
const calculateSum = (arr) => arr.reduce((acc, val) => acc + val, 0);
\`\`\`
`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-success uppercase tracking-widest bg-success/10 px-3 py-1 rounded-full border border-success/20">AI Mentor</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Coding Mentor</h1>
        <p className="text-slate-400 text-sm">Paste your script to locate memory leaks, logic bugs, and syntax improvements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Editor */}
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between">
          <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-850 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>workspace.js</span>
            <button onClick={handleAnalyze} disabled={loading} className="px-3 py-1 bg-success hover:bg-success-dark text-white font-bold rounded-lg transition-colors flex items-center gap-1">
              <Play size={10} /> Analyze Script
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#080d18] p-4 text-xs font-mono text-success focus:outline-none h-80 resize-none leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-left min-h-[300px]">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Terminal className="text-success animate-spin mx-auto" size={32} />
              <h4 className="text-xs text-slate-400 font-medium">Debugging code blocks...</h4>
            </div>
          ) : feedback ? (
            <div className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              {feedback}
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500 text-xs">
              Output will display code audit recommendations and optimized code snippets.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default CodingMentor;
