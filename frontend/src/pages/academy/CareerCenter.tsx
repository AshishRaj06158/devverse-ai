import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, ShieldAlert, Award, FileText, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

export const CareerCenter: React.FC = () => {
  const { jobs, applyForJob, jobApplications } = useAcademy();
  const [activeTab, setActiveTab] = useState<'listings' | 'tracker'>('listings');

  const handleApply = (id: string) => {
    applyForJob(id);
  };

  // Get applications for tracker columns
  const getAppliedJobsByStatus = (status: string) => {
    return Object.entries(jobApplications)
      .filter(([_, value]) => value === status)
      .map(([key, _]) => jobs.find(j => j.id === key))
      .filter((j): j is NonNullable<typeof j> => !!j);
  };

  const columns = [
    { label: 'Applied / In Review', status: 'applied', color: 'border-primary text-primary bg-primary/5' },
    { label: 'Interview Scheduled', status: 'interview', color: 'border-warning text-warning bg-warning/5' },
    { label: 'Selected / Offer Received', status: 'accepted', color: 'border-success text-success bg-success/5' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Return link */}
      <Link to="/academy" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ChevronRight size={14} className="rotate-180" /> Back to Academy
      </Link>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">Career Center</span>
          <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Developer Placement Cell</h1>
          <p className="text-slate-400 text-sm">Submit resumes, secure internal referrals, and monitor job application pipelines.</p>
        </div>

        {/* Tab buttons */}
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'listings' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Job Vacancies
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'tracker' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Application Tracker
          </button>
        </div>
      </div>

      {activeTab === 'listings' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => {
            const hasApplied = !!jobApplications[job.id];
            return (
              <div key={job.id} className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between items-start gap-4">
                <div className="space-y-3 w-full text-left">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1.5 shrink-0 border border-slate-800">
                        <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-white leading-tight font-display">{job.title}</h3>
                        <span className="text-xs text-slate-500 font-semibold">{job.company}</span>
                      </div>
                    </div>
                    {job.referralAvailable && (
                      <span className="bg-success/15 border border-success/35 text-success px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                        Referral Active
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-[10px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                  </div>
                </div>

                {hasApplied ? (
                  <div className="w-full py-2.5 bg-success/15 border border-success/30 rounded-xl text-center text-xs font-bold text-success flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} /> Resume Submitted Successfully
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all border border-primary/20 flex items-center justify-center gap-1.5"
                  >
                    <FileText size={12} /> Apply with Resume Builder CV
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* KANBAN APPLICATION STATUS TRACKER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(col => {
            const list = getAppliedJobsByStatus(col.status);
            return (
              <div key={col.status} className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 min-h-[50vh]">
                <div className={`px-3 py-2 border rounded-xl font-display text-xs font-black uppercase tracking-widest ${col.color}`}>
                  {col.label} ({list.length})
                </div>
                
                <div className="space-y-3 overflow-y-auto max-h-[60vh] scrollbar-thin">
                  {list.length > 0 ? (
                    list.map(job => (
                      <div key={job.id} className="p-4 bg-[#131A2A] border border-slate-850 rounded-2xl text-left space-y-2">
                        <h4 className="text-xs font-bold text-white leading-tight font-display">{job.title}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{job.company}</p>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[9px] font-mono text-slate-400">{job.location}</span>
                          <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-400 font-bold px-1.5 py-0.5 rounded">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-xs text-slate-600">
                      No active listings under this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
export default CareerCenter;
