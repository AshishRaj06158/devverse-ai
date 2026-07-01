import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, Download, Clipboard, Check, Plus, Trash2 } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  desc: string;
  tech: string;
  link: string;
}

interface PortfolioTimeline {
  id: string;
  year: string;
  company: string;
  role: string;
}

export const PortfolioBuilder: React.FC = () => {
  const [name, setName] = useState('Ashish Raj');
  const [role, setRole] = useState('Full Stack Engineer');
  const [bio, setBio] = useState('Passionate about clean code, UI/UX, and AI integrations.');
  const [email, setEmail] = useState('ashish@example.com');
  const [github, setGithub] = useState('github.com/ashishraj');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, Express, CSS, Firebase');
  
  const [projects, setProjects] = useState<PortfolioProject[]>([
    { id: '1', title: 'DevVerse AI Hub', desc: 'All-in-one productivity and career dashboard.', tech: 'React, Node, Gemini', link: '#' }
  ]);
  
  const [timeline, setTimeline] = useState<PortfolioTimeline[]>([
    { id: '1', year: '2025 - Present', company: 'TechCorp', role: 'Frontend Intern' }
  ]);

  const [copied, setCopied] = useState(false);

  const addProject = () => {
    setProjects([...projects, { id: Date.now().toString(), title: '', desc: '', tech: '', link: '' }]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof PortfolioProject, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addTimeline = () => {
    setTimeline([...timeline, { id: Date.now().toString(), year: '', company: '', role: '' }]);
  };

  const removeTimeline = (id: string) => {
    setTimeline(timeline.filter(t => t.id !== id));
  };

  const updateTimeline = (id: string, field: keyof PortfolioTimeline, value: string) => {
    setTimeline(timeline.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Generate self-contained SEO-optimized HTML code
  const generateHTMLCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - ${role} | Portfolio</title>
    <meta name="description" content="${bio}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #0F172A; color: #F8FAFC; font-family: sans-serif; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between">
    <nav class="max-w-5xl mx-auto w-full px-6 py-6 flex justify-between items-center border-b border-slate-800">
        <span class="text-xl font-bold tracking-tight text-white">${name}</span>
        <a href="mailto:${email}" class="text-sm font-semibold text-blue-500 hover:underline">Contact</a>
    </nav>

    <main class="max-w-3xl mx-auto px-6 py-16 space-y-16">
        <!-- Hero -->
        <section class="space-y-4 text-center">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white">${name}</h1>
            <p class="text-lg text-blue-500 font-semibold">${role}</p>
            <p class="text-slate-400 max-w-xl mx-auto">${bio}</p>
        </section>

        <!-- Skills -->
        <section class="space-y-4">
            <h2 class="text-lg font-bold text-white uppercase tracking-wider border-b border-slate-850 pb-2">Skills</h2>
            <div class="flex flex-wrap gap-2">
                ${skills.split(',').map(s => `<span class="bg-slate-800 px-3 py-1 rounded-xl text-xs font-semibold text-slate-300 border border-slate-700/50">${s.trim()}</span>`).join('\n                ')}
            </div>
        </section>

        <!-- Projects -->
        <section class="space-y-6">
            <h2 class="text-lg font-bold text-white uppercase tracking-wider border-b border-slate-850 pb-2">Projects</h2>
            <div class="grid grid-cols-1 gap-6">
                ${projects.map(p => `
                <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h3 class="text-base font-bold text-white">${p.title}</h3>
                    <p class="text-xs text-slate-450">${p.desc}</p>
                    <div class="flex justify-between items-center pt-2">
                        <span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">${p.tech}</span>
                        <a href="${p.link}" class="text-xs text-blue-500 hover:underline">View Project &rarr;</a>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Timeline -->
        <section class="space-y-6">
            <h2 class="text-lg font-bold text-white uppercase tracking-wider border-b border-slate-850 pb-2">Timeline</h2>
            <div class="space-y-4">
                ${timeline.map(t => `
                <div class="flex justify-between text-xs pb-3 border-b border-slate-850">
                    <div>
                        <span class="font-bold text-slate-200">${t.company}</span>
                        <p class="text-slate-400">${t.role}</p>
                    </div>
                    <span class="text-slate-500 font-medium">${t.year}</span>
                </div>
                `).join('')}
            </div>
        </section>
    </main>

    <footer class="max-w-5xl mx-auto w-full px-6 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>
    </footer>
</body>
</html>`;
  };

  const handleCopy = () => {
    const code = generateHTMLCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTMLFile = () => {
    const code = generateHTMLCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Module 8</span>
          <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Portfolio Builder</h1>
          <p className="text-slate-400 text-sm mt-1">Configure profile data, compile custom responsive templates, and download hosting-ready static HTML files.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
          >
            {copied ? <Check size={14} className="text-success" /> : <Clipboard size={14} />}
            {copied ? 'Copied!' : 'Copy HTML Code'}
          </button>
          <button
            onClick={downloadHTMLFile}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-colors border border-primary/20"
          >
            <Download size={14} /> Export HTML File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
          
          {/* Personal Details */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Basic Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                placeholder="GitHub Profile link"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <textarea
              placeholder="Short bio description..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-20 resize-none"
            />
            <input
              type="text"
              placeholder="Skills (comma separated, e.g. React, Node)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          {/* Projects */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Manage Projects</h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary hover:text-white"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-[#131A2A]/40 border border-slate-850 space-y-2 relative">
                <button
                  onClick={() => removeProject(p.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={p.title}
                    onChange={(e) => updateProject(p.id, 'title', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Tech (e.g. React, CSS)"
                    value={p.tech}
                    onChange={(e) => updateProject(p.id, 'tech', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="View / Live project link"
                  value={p.link}
                  onChange={(e) => updateProject(p.id, 'link', e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <textarea
                  placeholder="Short project summary..."
                  value={p.desc}
                  onChange={(e) => updateProject(p.id, 'desc', e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-20 resize-none"
                />
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Timeline</h3>
              <button
                onClick={addTimeline}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary hover:text-white"
              >
                <Plus size={14} /> Add Timeline
              </button>
            </div>

            {timeline.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-[#131A2A]/40 border border-slate-850 space-y-2 relative">
                <button
                  onClick={() => removeTimeline(t.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Duration"
                    value={t.year}
                    onChange={(e) => updateTimeline(t.id, 'year', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={t.company}
                    onChange={(e) => updateTimeline(t.id, 'company', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={t.role}
                    onChange={(e) => updateTimeline(t.id, 'role', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Eye size={14} /> Render Mockup Preview
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 h-[68vh] overflow-y-auto text-left space-y-8 bg-[#0F172A]/70">
            <div className="border-b border-slate-800 pb-6 mb-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{name || 'Your Name'}</h2>
              <span className="text-xs font-semibold text-primary">{role || 'Job Role'}</span>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-md">{bio}</p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.split(',').map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Projects</h3>
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-white">{p.title || 'Project Name'}</h4>
                    <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-primary font-bold">{p.tech}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Timeline</h3>
              {timeline.map((t) => (
                <div key={t.id} className="flex justify-between text-xs pb-2.5 border-b border-slate-850">
                  <div>
                    <span className="font-bold text-slate-200">{t.company || 'Company'}</span>
                    <p className="text-slate-400">{t.role || 'Role'}</p>
                  </div>
                  <span className="text-slate-500">{t.year}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
export default PortfolioBuilder;
