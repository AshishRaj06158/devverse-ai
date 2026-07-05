import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, ChevronRight, Award, Zap } from 'lucide-react';

export const EventsModule: React.FC = () => {
  const { events, registerForEvent, eventRegistrations } = useAcademy();

  const handleRegister = (id: string) => {
    registerForEvent(id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Return button */}
      <Link to="/academy" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ChevronRight size={14} className="rotate-180" /> Back to Academy
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Events Calendar</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Competitions & Live Classes</h1>
        <p className="text-slate-400 text-sm">Register for upcoming global hackathons, competitive coding tournaments, and expert webinars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => {
          const registered = eventRegistrations.includes(event.id);
          return (
            <div key={event.id} className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between items-start gap-4">
              <div className="space-y-3 text-left">
                <span className="inline-flex items-center gap-1 bg-secondary/15 border border-secondary/25 px-2.5 py-1 rounded-full text-[9px] font-bold text-secondary uppercase tracking-wider">
                  {event.type}
                </span>
                
                <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">{event.title}</h3>
                
                <p className="text-slate-400 text-xs leading-relaxed">{event.description}</p>
                
                <div className="flex gap-4 text-[10px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1"><CalendarIcon size={12} /> {event.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                </div>
              </div>

              {registered ? (
                <div className="w-full py-2.5 bg-success/15 border border-success/30 rounded-xl text-center text-xs font-bold text-success flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} /> You are Registered!
                </div>
              ) : (
                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full py-2.5 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all border border-primary/20 flex items-center justify-center gap-1.5"
                >
                  <Zap size={12} className="fill-white" /> Complete RSVP Registration
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
export default EventsModule;
