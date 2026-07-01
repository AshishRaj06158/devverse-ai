import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Sparkles, Download, RefreshCw, Eye, Edit2 } from 'lucide-react';

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  bullets: string;
}

interface Project {
  id: string;
  title: string;
  technologies: string;
  description: string;
}

export const ResumeBuilder: React.FC = () => {
  // Resume Form State
  const [personal, setPersonal] = useState({
    name: 'Ashish Raj',
    role: 'Full Stack Engineer',
    email: 'ashish@example.com',
    github: 'github.com/ashishraj',
    linkedin: 'linkedin.com/in/ashishraj',
    summary: 'Detail-oriented Full Stack Developer with hands-on experience designing and building modular web applications and AI-integrated microservices.'
  });

  const [experience, setExperience] = useState<WorkExperience[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      role: 'Frontend Intern',
      duration: 'June 2025 - Present',
      bullets: 'Implemented reusable component libraries using React and Tailwind CSS.\nImproved client-side performance, reducing page load times by 20%.'
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'DevVerse AI platform',
      technologies: 'React, Node.js, Express, Gemini API',
      description: 'Built a modular SaaS platform featuring career tools, mock interviews, and PDF summaries.'
    }
  ]);

  const [education, setEducation] = useState({
    school: 'State University',
    degree: 'B.S. in Computer Science',
    gpa: '3.8/4.0',
    year: '2022 - 2026'
  });

  const [skills, setSkills] = useState('React, TypeScript, JavaScript, Node.js, CSS, HTML, Firebase, Python, Git');
  const [selectedTemplate, setSelectedTemplate] = useState<'minimal' | 'professional'>('minimal');
  const [loadingAi, setLoadingAi] = useState<string | null>(null);

  // Form Handlers
  const addExperience = () => {
    setExperience([
      ...experience,
      { id: Date.now().toString(), company: '', role: '', duration: '', bullets: '' }
    ]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string) => {
    setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { id: Date.now().toString(), title: '', technologies: '', description: '' }
    ]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  // AI Improver API Call
  const improveBullet = async (expId: string, originalText: string) => {
    if (!originalText.trim()) return;
    setLoadingAi(expId);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/improve-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: originalText, role: personal.role })
      });
      if (!response.ok) throw new Error('AI Rewrite failed');
      const data = await response.json();
      updateExperience(expId, 'bullets', data.improvedContent);
    } catch (err) {
      console.error(err);
      alert('AI Rewrite failed. Operating in fallback mode.');
      // Local fallback rewrite
      const fallbackText = `Successfully optimized ${personal.role} experience, generating quantitative metrics and improving overall modular efficiency.`;
      updateExperience(expId, 'bullets', fallbackText);
    } finally {
      setLoadingAi(null);
    }
  };

  // PDF Download (Print Method)
  const downloadResume = () => {
    const printContent = document.getElementById('resume-preview-sheet');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '', 'height=800,width=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Resume</title>');
      printWindow.document.write('<style>');
      printWindow.document.write(`
        body { font-family: Arial, sans-serif; color: #1E293B; margin: 40px; line-height: 1.5; font-size: 14px; }
        h1 { font-size: 26px; margin-bottom: 2px; font-weight: bold; color: #0F172A; }
        h2 { font-size: 16px; border-bottom: 1px solid #CBD5E1; padding-bottom: 3px; margin-top: 20px; font-weight: bold; color: #1E293B; text-transform: uppercase; }
        .contact { font-size: 12px; color: #475569; margin-bottom: 15px; }
        .item-title { display: flex; justify-content: space-between; font-weight: bold; margin-top: 8px; }
        .subtitle { font-style: italic; color: #475569; }
        ul { margin-top: 4px; padding-left: 20px; }
        li { margin-bottom: 3px; }
        .tech { font-weight: bold; font-size: 12px; }
      `);
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Module 2</span>
          <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Resume Builder</h1>
          <p className="text-slate-400 text-sm mt-1">Design a job-winning resume with real-time editing and integrated Gemini-powered content revisions.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTemplate}
            onChange={(e: any) => setSelectedTemplate(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none"
          >
            <option value="minimal">Template: Minimal Clean</option>
            <option value="professional">Template: Corporate Professional</option>
          </select>
          <button
            onClick={downloadResume}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            <Download size={14} /> Export Resume PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Forms */}
        <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
          
          {/* Personal Info */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
              <Edit2 size={16} /> Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={personal.name}
                onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
              <input
                type="text"
                placeholder="Job Role / Tagline"
                value={personal.role}
                onChange={(e) => setPersonal({ ...personal, role: e.target.value })}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={personal.email}
                onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
              <input
                type="text"
                placeholder="GitHub Profile"
                value={personal.github}
                onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
              />
            </div>
            <textarea
              placeholder="Professional Summary (2-3 sentences)"
              value={personal.summary}
              onChange={(e) => setPersonal({ ...personal, summary: e.target.value })}
              className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary text-white h-20 resize-none"
            />
          </div>

          {/* Experience */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Work Experience</h3>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary hover:text-white"
              >
                <Plus size={14} /> Add Experience
              </button>
            </div>

            {experience.map((exp) => (
              <div key={exp.id} className="p-4 rounded-2xl bg-[#131A2A]/40 border border-slate-850 space-y-3 relative group">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 2025 - Present)"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                
                {/* Description and AI improve */}
                <div className="space-y-1 relative">
                  <textarea
                    placeholder="Describe achievements (one per line or standard paragraph)..."
                    value={exp.bullets}
                    onChange={(e) => updateExperience(exp.id, 'bullets', e.target.value)}
                    className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-24 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => improveBullet(exp.id, exp.bullets)}
                    disabled={loadingAi === exp.id}
                    className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-white bg-secondary/80 hover:bg-secondary border border-secondary/20 transition-all"
                  >
                    {loadingAi === exp.id ? (
                      <RefreshCw size={10} className="animate-spin" />
                    ) : (
                      <Sparkles size={10} />
                    )}
                    AI Improve
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Projects</h3>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary hover:text-white"
              >
                <Plus size={14} /> Add Project
              </button>
            </div>

            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-[#131A2A]/40 border border-slate-850 space-y-3 relative">
                <button
                  onClick={() => removeProject(p.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-danger"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={p.title}
                    onChange={(e) => updateProject(p.id, 'title', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (e.g. React, node)"
                    value={p.technologies}
                    onChange={(e) => updateProject(p.id, 'technologies', e.target.value)}
                    className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <textarea
                  placeholder="Describe your project tasks and achievements..."
                  value={p.description}
                  onChange={(e) => updateProject(p.id, 'description', e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-20 resize-none"
                />
              </div>
            ))}
          </div>

          {/* Education & Skills */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Education</h4>
              <input
                type="text"
                placeholder="College / School"
                value={education.school}
                onChange={(e) => setEducation({ ...education, school: e.target.value })}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Degree"
                value={education.degree}
                onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="GPA"
                  value={education.gpa}
                  onChange={(e) => setEducation({ ...education, gpa: e.target.value })}
                  className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Timeline"
                  value={education.year}
                  onChange={(e) => setEducation({ ...education, year: e.target.value })}
                  className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Skills</h4>
              <textarea
                placeholder="Comma separated tools (e.g. React, Node, CSS)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white h-24 resize-none"
              />
            </div>

          </div>

        </div>

        {/* Right Side: Live Preview Panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Eye size={14} /> Live PDF Preview
          </div>

          <div
            id="resume-preview-sheet"
            className="w-full rounded-2xl bg-white text-slate-900 p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[70vh] text-left"
          >
            {/* Header info */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{personal.name || 'Your Name'}</h1>
              <p className="text-xs font-semibold text-primary">{personal.role || 'Job Role'}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-slate-500 font-medium">
                {personal.email && <span>Email: {personal.email}</span>}
                {personal.github && <span>GitHub: {personal.github}</span>}
                {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            {personal.summary && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1.5">Profile</h2>
                <p className="text-[11px] text-slate-600 leading-normal">{personal.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.some(e => e.company) && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1.5">Experience</h2>
                <div className="space-y-3">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start text-[11px] font-bold text-slate-800">
                        <span>{exp.company} — {exp.role}</span>
                        <span className="font-medium text-slate-500">{exp.duration}</span>
                      </div>
                      {exp.bullets && (
                        <ul className="list-disc pl-4 text-[10px] text-slate-600 mt-1 space-y-1">
                          {exp.bullets.split('\n').map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.some(p => p.title) && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1.5">Projects</h2>
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id}>
                      <div className="flex justify-between items-baseline text-[11px] font-bold text-slate-800">
                        <span>{p.title}</span>
                        <span className="text-[9px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{p.technologies}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mt-1 leading-normal">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {(education.school || education.degree) && (
              <div className="mb-4">
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1.5">Education</h2>
                <div className="flex justify-between items-start text-[11px] font-bold text-slate-800">
                  <div>
                    <span>{education.school}</span>
                    <p className="font-normal text-slate-500 text-[10px] mt-0.5">{education.degree} (GPA: {education.gpa})</p>
                  </div>
                  <span className="font-medium text-slate-500">{education.year}</span>
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-1 mb-1.5">Skills</h2>
                <p className="text-[10px] text-slate-600 leading-normal font-medium">{skills}</p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
export default ResumeBuilder;
