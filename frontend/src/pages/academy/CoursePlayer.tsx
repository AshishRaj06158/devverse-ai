import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAcademy, Lesson, QuizQuestion } from '../../context/AcademyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, FileText, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Send,
  Cpu, Award, GraduationCap, Clock, HelpCircle, Code, Save, RefreshCw
} from 'lucide-react';

export const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, completedLessons, completeLesson, submitQuizResult, quizScores, claimCertificate, studentCertificates } = useAcademy();

  const course = courses.find(c => c.id === courseId);
  
  // Lesson progression states
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  // AI assistant states
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Hello! I am your DevVerse AI tutor. I can summarize this lesson, explain concepts, create cheat sheets, or generate coding exercises. Ask me anything!' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Coding environment states
  const [codeDraft, setCodeDraft] = useState('');
  const [codeConsole, setCodeConsole] = useState('');
  const [codeSuccess, setCodeSuccess] = useState(false);

  // Quiz running states
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizTimer, setQuizTimer] = useState(60); // 1 min timer
  const [quizRunning, setQuizRunning] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const quizTimerRef = useRef<any>(null);

  if (!course) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-white">Course not found</h2>
        <Link to="/academy" className="text-primary mt-2">Return to Academy</Link>
      </div>
    );
  }

  const activeModule = course.modules[activeModuleIdx];
  const activeLesson = activeModule?.lessons[activeLessonIdx];

  // Sync code template
  useEffect(() => {
    if (activeLesson && activeLesson.type === 'Code' && activeLesson.codeTemplate) {
      setCodeDraft(activeLesson.codeTemplate);
      setCodeConsole('');
      setCodeSuccess(false);
    }
  }, [activeLessonIdx, activeModuleIdx]);

  // Quiz Timer setup
  useEffect(() => {
    if (quizRunning && quizTimer > 0) {
      quizTimerRef.current = setTimeout(() => setQuizTimer(prev => prev - 1), 1000);
    } else if (quizTimer === 0 && quizRunning) {
      handleFinishQuiz();
    }
    return () => {
      if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
    };
  }, [quizRunning, quizTimer]);

  const handleStartQuiz = () => {
    setQuizAnswers({});
    setQuizTimer(60);
    setQuizRunning(true);
    setQuizFinished(false);
    setQuizScore(null);
  };

  const handleFinishQuiz = () => {
    setQuizRunning(false);
    setQuizFinished(true);
    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);

    // Calculate score
    const questions = activeLesson?.quizQuestions || [];
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setQuizScore(percent);
    submitQuizResult(activeLesson.id, percent);
    completeLesson(course.id, activeLesson.id);
  };

  const handleRunCode = () => {
    setCodeConsole('Compiling source code...\nLinking runtime libraries...\nExecuting main wrappers...\n\nOutputs:\n✓ Run concluded successfully! Perfect output mapping matches standard test cases.');
    setCodeSuccess(true);
    completeLesson(course.id, activeLesson.id);
  };

  // Check lesson completion status
  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(`${course.id}_${lessonId}`);
  };

  // Next / Prev Navigation
  const handleNext = () => {
    // Complete current first
    completeLesson(course.id, activeLesson.id);

    if (activeLessonIdx < activeModule.lessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1);
    } else if (activeModuleIdx < course.modules.length - 1) {
      setActiveModuleIdx(activeModuleIdx + 1);
      setActiveLessonIdx(0);
    }
  };

  const handlePrev = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
    } else if (activeModuleIdx > 0) {
      setActiveModuleIdx(activeModuleIdx - 1);
      const prevMod = course.modules[activeModuleIdx - 1];
      setActiveLessonIdx(prevMod.lessons.length - 1);
    }
  };

  // Trigger Dynamic Certificate
  const isCourseFinished = () => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = completedLessons.filter(k => k.startsWith(`${course.id}_`)).length;
    return totalLessons > 0 && completed === totalLessons;
  };

  const alreadyHasCert = studentCertificates.some(c => c.courseName === course.title);

  // Gemini Mock AI actions
  const triggerAIAction = async (prompt: string, prefixText: string) => {
    setAiLoading(true);
    setAiChat(prev => [...prev, { role: 'user', text: prefixText }]);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/academy/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, textContext: activeLesson?.articleBody || activeLesson?.title || '' })
      });
      const data = await response.json();
      setAiChat(prev => [...prev, { role: 'assistant', text: data.result || 'Mock Summary: Lesson outlines key concepts, standard modules and architectural guidelines.' }]);
    } catch {
      // Local fallback simulator
      setTimeout(() => {
        let fallbackResponse = 'Here is a custom summary: This lesson focuses on key software patterns, clean layouts, and standard operational boundaries. Make sure to audit your parameters before compiling!';
        if (prompt.includes('flashcards')) {
          fallbackResponse = '⚡ Flashcards Created:\n1. Front boundary: RSC renders elements server-side.\n2. State hook: "use client" flags client boundaries.';
        } else if (prompt.includes('interview')) {
          fallbackResponse = '🎤 Interview Prep:\nQuestion: What is the main benefit of Next.js server actions?\nAnswer: Secure, client-abstracted database writes without REST endpoints.';
        }
        setAiChat(prev => [...prev, { role: 'assistant', text: fallbackResponse }]);
      }, 1000);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    const msg = aiMessage;
    setAiMessage('');
    triggerAIAction(msg, msg);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      {/* Header path bar */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{course.title}</span>
          <h2 className="text-lg font-bold text-white font-display leading-tight">{activeLesson?.title}</h2>
        </div>
        <Link to="/academy" className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white glass-panel border border-slate-800 transition-colors">
          Exit Player
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 glass-panel rounded-3xl border border-slate-800 overflow-hidden divide-y divide-slate-850 p-4 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider font-display">Modules Map</h3>
          
          <div className="space-y-4 pt-4 overflow-y-auto max-h-[60vh] scrollbar-thin">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-1.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">{mod.title}</span>
                <div className="space-y-1">
                  {mod.lessons.map((les, lesIdx) => {
                    const isActive = activeModuleIdx === modIdx && activeLessonIdx === lesIdx;
                    const done = isLessonCompleted(les.id);
                    return (
                      <button
                        key={les.id}
                        onClick={() => { setActiveModuleIdx(modIdx); setActiveLessonIdx(lesIdx); }}
                        className={`w-full px-3 py-2 rounded-xl text-[11px] font-semibold text-left transition-all flex justify-between items-center ${
                          isActive
                            ? 'bg-primary text-white border border-primary/20 shadow-md shadow-primary/15'
                            : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate pr-2">{les.title}</span>
                        {done && <CheckCircle2 size={12} className={isActive ? 'text-white' : 'text-success'} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Certificate reward banner */}
          {isCourseFinished() && (
            <div className="pt-4 text-center">
              {alreadyHasCert ? (
                <span className="text-xs font-bold text-success flex items-center justify-center gap-1"><Award size={14} /> Graduated!</span>
              ) : (
                <button
                  onClick={() => claimCertificate(course.title, course.instructor)}
                  className="w-full py-2 bg-gradient-to-r from-success to-primary hover:shadow-lg hover:shadow-success/20 text-[10px] font-bold text-white rounded-lg transition-all flex items-center justify-center gap-1.5 border border-success/25"
                >
                  <GraduationCap size={14} /> Claim Certificate!
                </button>
              )}
            </div>
          )}
        </div>

        {/* Core Lesson View Frame */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden bg-slate-900/40 min-h-[50vh] p-6 flex flex-col justify-between">
            
            <div className="space-y-6 flex-grow">
              {/* VIDEO PLAYER VIEW */}
              {activeLesson?.type === 'Video' && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-black">
                  <video
                    src={activeLesson.contentUrl}
                    controls
                    className="w-full h-full"
                    onEnded={() => completeLesson(course.id, activeLesson.id)}
                  />
                </div>
              )}

              {/* ARTICLE / READ PANEL */}
              {activeLesson?.type === 'Article' && (
                <div className="space-y-4 text-left">
                  <span className="inline-block bg-secondary/15 border border-secondary/25 px-2 py-0.5 rounded text-[9px] font-bold text-secondary uppercase tracking-wider">Reading Article</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line border-l-2 border-secondary/30 pl-4 py-1">
                    {activeLesson.articleBody}
                  </p>
                </div>
              )}

              {/* CODE COMPILER SANDBOX */}
              {activeLesson?.type === 'Code' && (
                <div className="space-y-4 text-left">
                  <span className="inline-block bg-accent/15 border border-accent/25 px-2 py-0.5 rounded text-[9px] font-bold text-accent uppercase tracking-wider">Compiler Workspace</span>
                  <div className="border border-slate-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2 bg-slate-950 border-b border-slate-850 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>index.js (Simulated compiler)</span>
                      <button onClick={handleRunCode} className="px-2.5 py-1 bg-primary text-white font-bold rounded hover:bg-primary-dark transition-all flex items-center gap-1">
                        <Code size={12} /> Run Code
                      </button>
                    </div>
                    <textarea
                      value={codeDraft}
                      onChange={(e) => setCodeDraft(e.target.value)}
                      className="w-full bg-[#070b13] p-4 text-xs font-mono text-success focus:outline-none h-44 resize-none leading-relaxed"
                    />
                  </div>
                  {codeConsole && (
                    <div className="bg-black/80 border border-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-400 whitespace-pre-line leading-relaxed">
                      {codeConsole}
                    </div>
                  )}
                </div>
              )}

              {/* PRACTICE TIMED QUIZ COMPONENT */}
              {activeLesson?.type === 'Quiz' && (
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center bg-[#131A2A] border border-slate-850 p-4 rounded-2xl">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Timed Practice Challenge</span>
                      <h4 className="text-sm font-bold text-white font-display">Lesson Assessment</h4>
                    </div>
                    
                    {!quizRunning && !quizFinished && (
                      <button onClick={handleStartQuiz} className="px-4 py-2 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary-dark transition-colors">Start Quiz</button>
                    )}

                    {quizRunning && (
                      <span className="text-xs font-mono font-bold text-warning flex items-center gap-1">
                        <Clock size={12} /> {quizTimer}s remaining
                      </span>
                    )}

                    {quizFinished && (
                      <span className="text-xs font-bold text-primary">Score: {quizScore}%</span>
                    )}
                  </div>

                  {quizRunning && (
                    <div className="space-y-4">
                      {activeLesson.quizQuestions?.map((q, idx) => (
                        <div key={q.id} className="space-y-2 border-b border-slate-900 pb-3 last:border-b-0">
                          <p className="text-xs font-bold text-white">{idx + 1}. {q.question}</p>
                          {q.type === 'TrueFalse' ? (
                            <div className="flex gap-2">
                              {['True', 'False'].map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt })}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                                    quizAnswers[q.id] === opt ? 'bg-primary/20 border-primary text-primary' : 'bg-slate-950 border-slate-850 text-slate-400'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options?.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt })}
                                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border ${
                                    quizAnswers[q.id] === opt ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={handleFinishQuiz}
                        className="w-full py-2.5 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all"
                      >
                        Submit Answers
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Nav Controller */}
            <div className="flex justify-between items-center border-t border-slate-850 pt-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-450 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-900/60 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft size={14} /> Prev Topic
              </button>
              <button
                onClick={handleNext}
                disabled={activeModuleIdx === course.modules.length - 1 && activeLessonIdx === activeModule.lessons.length - 1}
                className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-40 transition-colors"
              >
                Next Lesson <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Gemini AI Side Tutor Assistant */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden h-[50vh] sm:h-[60vh] flex flex-col justify-between">
            <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-850 flex items-center justify-between">
              <span className="text-xs font-bold text-white font-display flex items-center gap-1">
                <Sparkles size={14} className="text-accent animate-pulse" /> AI Assistant Tutor
              </span>
              <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
            </div>

            {/* Messages Area */}
            <div className="p-4 flex-grow overflow-y-auto space-y-3 font-sans text-xs max-h-[30vh] sm:max-h-[40vh] scrollbar-thin">
              {aiChat.map((chat, idx) => (
                <div key={idx} className={`p-3 rounded-2xl leading-relaxed text-left ${
                  chat.role === 'user'
                    ? 'bg-primary/10 border border-primary/20 text-slate-200 ml-6'
                    : 'bg-[#131A2A] border border-slate-950 text-slate-350 mr-6'
                }`}>
                  {chat.text}
                </div>
              ))}
              {aiLoading && (
                <div className="p-3 bg-[#131A2A] border border-slate-950 text-slate-400 rounded-2xl mr-6 text-left flex items-center gap-1.5">
                  <RefreshCw size={12} className="animate-spin" /> Thinking...
                </div>
              )}
            </div>

            {/* Chat actions & Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-850 space-y-2.5">
              {/* Shortcut buttons */}
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                <button onClick={() => triggerAIAction('summarize', 'Summarize this lesson')} className="px-2 py-1 bg-slate-900 border border-slate-800 text-[9px] font-bold text-slate-300 rounded hover:text-white shrink-0">Summarize</button>
                <button onClick={() => triggerAIAction('flashcards', 'Generate flashcards')} className="px-2 py-1 bg-slate-900 border border-slate-800 text-[9px] font-bold text-slate-300 rounded hover:text-white shrink-0">Flashcards</button>
                <button onClick={() => triggerAIAction('interview', 'Generate interview questions')} className="px-2 py-1 bg-slate-900 border border-slate-800 text-[9px] font-bold text-slate-300 rounded hover:text-white shrink-0">Interview Prep</button>
              </div>

              <form onSubmit={handleSendChatMessage} className="relative">
                <input
                  type="text"
                  placeholder="Ask DevVerse AI tutor..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-850 rounded-xl pl-3.5 pr-9 py-2 text-[11px] text-white focus:outline-none focus:border-primary"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
export default CoursePlayer;
