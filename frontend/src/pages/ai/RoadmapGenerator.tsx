import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Zap, Sparkles, BookOpen, ChevronRight, Check } from 'lucide-react';

export const RoadmapGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState<{ step: number; title: string; desc: string; tools: string[] }[]>([]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setNodes([
        { step: 1, title: 'Basics & Environment Setup', desc: 'Install packages, learn compiler settings, configure configs.', tools: ['Node.js', 'VS Code'] },
        { step: 2, title: 'Syntax & Data Control Flows', desc: 'Variables, scoping, loops, array manipulation filters.', tools: ['Arrays', 'Functions'] },
        { step: 3, title: 'Network Integrations & APIs', desc: 'Fetching endpoints, REST principles, JSON data binding models.', tools: ['Axios', 'Fetch API'] },
        { step: 4, title: 'System Deployments', desc: 'Build configurations, static headers management, web hosting CDN.', tools: ['Render.com', 'Netlify'] }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">AI Assistant</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Learning Roadmap Generator</h1>
        <p className="text-slate-400 text-sm">Visualize complete master pathways from novice foundations to senior engineer level.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings column */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-max">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1">
            <Map size={16} className="text-secondary" /> Setup Pathway
          </h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Technology / Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Next.js Frontend Dev"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-secondary"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-secondary text-white text-xs font-bold rounded-xl border border-secondary/20 flex items-center justify-center gap-1">
              <Sparkles size={14} className="text-accent animate-pulse" /> Build Roadmap Flow
            </button>
          </form>
        </div>

        {/* Visual Map Flow */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Zap size={36} className="text-secondary animate-pulse" />
              <h4 className="text-xs text-slate-400 font-bold">Assembling visual nodes map...</h4>
            </div>
          ) : nodes.length > 0 ? (
            <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
              {nodes.map((node) => (
                <motion.div
                  key={node.step}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: node.step * 0.1 }}
                  className="relative p-5 bg-[#131A2A] border border-slate-850 rounded-2xl flex flex-col sm:flex-row gap-4 items-start"
                >
                  {/* Step Bubble */}
                  <span className="absolute -left-10 top-5 w-6 h-6 rounded-full bg-secondary border border-secondary/35 text-[10px] font-black text-white flex items-center justify-center">
                    {node.step}
                  </span>

                  <div className="space-y-2 flex-grow">
                    <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">{node.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{node.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {node.tools.map((t, i) => (
                        <span key={i} className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs">
              Enter target role to compile the path nodes.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default RoadmapGenerator;
