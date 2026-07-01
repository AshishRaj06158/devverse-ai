import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, BookOpen, RefreshCw, AlertCircle, HelpCircle, Layers, Award, Sparkles } from 'lucide-react';

interface Chapter {
  title: string;
  content: string;
}

interface Flashcard {
  question: string;
  answer: string;
}

interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface MindMapNode {
  name: string;
  children?: MindMapNode[];
}

interface SummarizeResult {
  summary: string;
  chapters: Chapter[];
  flashcards: Flashcard[];
  quiz: QuizItem[];
  mindMap: MindMapNode;
}

export const NotesSummarizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummarizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'summary' | 'flashcards' | 'quiz' | 'mindmap'>('summary');
  
  // Flashcard flipping state
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);

  // Quiz active answers state
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Zoom & Drag State for Mind Map Canvas
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomFactor = 0.1;
    const newScale = e.deltaY < 0 ? Math.min(2, scale + zoomFactor) : Math.max(0.4, scale - zoomFactor);
    setScale(newScale);
  };

  const resetMindMap = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a valid PDF document.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a PDF document.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/summarize-notes`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Summarization failed');
      const data = await response.json();
      setResult(data);
      setSelectedAnswers(new Array(data.quiz.length).fill(''));
      setQuizSubmitted(false);
      setFlippedCardIdx(null);
    } catch (err: any) {
      setError(err.message || 'Error occurred summarizing document.');
      // Local fallback Mock
      const fbData: SummarizeResult = {
        summary: 'This note covers key concepts in software architecture and design patterns, focusing on modularity, clean code principles, and scaling full-stack applications.',
        chapters: [
          {
            title: 'Chapter 1: Principles of Modularity',
            content: 'Modularity involves dividing a software system into multiple independent, exchangeable modules. This separation of concerns allows developers to build systems in isolation, improving testability and code quality.'
          },
          {
            title: 'Chapter 2: Design Patterns & SOLID',
            content: 'SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) form the backbone of robust object-oriented system design, allowing code to adapt to business rules changes without core refactoring.'
          }
        ],
        flashcards: [
          { question: 'What does the S in SOLID stand for?', answer: 'Single Responsibility Principle: A class or module should have one, and only one, reason to change.' },
          { question: 'What is Modularity?', answer: 'The degree to which a system\'s components may be separated and recombined, often with the benefit of flexibility and variety.' }
        ],
        quiz: [
          {
            question: 'Which design pattern is best suited for notifying multiple observer objects about changes in state?',
            options: ['Singleton Pattern', 'Observer Pattern', 'Factory Pattern', 'Decorator Pattern'],
            correctAnswer: 'Observer Pattern',
            explanation: 'The Observer Pattern creates a subscription model to notify multiple objects about any events that happen to the object they\'re observing.'
          },
          {
            question: 'What is the primary goal of the Single Responsibility Principle?',
            options: ['Ensure classes are small', 'Reduce code coupling', 'Ensure a class has only one reason to change', 'Improve database normalization'],
            correctAnswer: 'Ensure a class has only one reason to change',
            explanation: 'The Single Responsibility Principle asserts that a class should gather only features that serve a single organizational goal, giving it only one reason to change.'
          }
        ],
        mindMap: {
          name: 'Software Engineering Core',
          children: [
            {
              name: 'SOLID Principles',
              children: [
                { name: 'Single Responsibility' },
                { name: 'Open/Closed' },
                { name: 'Dependency Inversion' }
              ]
            },
            {
              name: 'Architectural Styles',
              children: [
                { name: 'Monolithic' },
                { name: 'Microservices' },
                { name: 'Serverless' }
              ]
            }
          ]
        }
      };
      setResult(fbData);
      setSelectedAnswers(new Array(fbData.quiz.length).fill(''));
      setQuizSubmitted(false);
      setFlippedCardIdx(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, option: string) => {
    if (quizSubmitted) return;
    const updated = [...selectedAnswers];
    updated[qIdx] = option;
    setSelectedAnswers(updated);
  };

  // Helper component to render mind map nodes recursively
  const RenderMindMapNode: React.FC<{ node: MindMapNode }> = ({ node }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white shadow shadow-primary/20">
          {node.name}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center mt-4">
            <div className="w-0.5 h-4 bg-slate-700"></div>
            <div className="flex gap-6 mt-1 border-t border-slate-700 pt-4 px-4 relative">
              {node.children.map((child, i) => (
                <RenderMindMapNode key={i} node={child} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-warning uppercase tracking-widest bg-warning/10 px-3 py-1 rounded-full border border-warning/20">Module 5</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Notes Summarizer</h1>
        <p className="text-slate-400 text-sm mt-1">Convert heavy textbooks or notes PDFs into quick summaries, active recall cards, and visual conceptual trees.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Uploader */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Upload Notes</h3>
            
            <form onSubmit={handleSummarize} className="space-y-4">
              <div className="relative border-2 border-dashed border-slate-800 rounded-2xl hover:border-warning/50 transition-colors p-6 text-center flex flex-col items-center justify-center cursor-pointer bg-[#131A2A]/40">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud size={32} className="text-slate-500 mb-2" />
                <span className="text-xs font-bold text-white">
                  {file ? file.name : 'Choose Study PDF'}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">PDF max 10MB</span>
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
                    <RefreshCw className="animate-spin" size={16} />
                    Synthesizing Notes...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Summarize Notes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                  {[
                    { id: 'summary', name: 'Chapters & Summary' },
                    { id: 'flashcards', name: 'Flashcards' },
                    { id: 'quiz', name: 'Practice Quiz' },
                    { id: 'mindmap', name: 'Concept Mind Map' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        activeTab === tab.id
                          ? 'bg-warning/10 border-warning text-white'
                          : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                {/* Tab content 1: Chapters & Summary */}
                {activeTab === 'summary' && (
                  <div className="space-y-6 text-left">
                    <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-display">Notes Overview</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
                    </div>

                    <div className="space-y-4">
                      {result.chapters.map((chap, i) => (
                        <div key={i} className="glass-panel p-6 rounded-3xl border border-slate-800">
                          <h4 className="text-sm font-bold text-white mb-2 font-display">{chap.title}</h4>
                          <p className="text-xs text-slate-450 leading-relaxed">{chap.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab content 2: Flashcards */}
                {activeTab === 'flashcards' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {result.flashcards.map((card, i) => (
                      <div
                        key={i}
                        onClick={() => setFlippedCardIdx(flippedCardIdx === i ? null : i)}
                        className="relative h-44 cursor-pointer preserve-3d transition-transform duration-500 rounded-2xl"
                      >
                        {/* Front Side */}
                        <div className={`absolute inset-0 p-5 rounded-2xl glass-panel border border-slate-850 flex flex-col justify-between items-center text-center backface-hidden transition-all duration-300 ${
                          flippedCardIdx === i ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
                        }`}>
                          <span className="text-[10px] uppercase font-bold text-slate-500">Question {i + 1}</span>
                          <p className="text-sm font-bold text-white px-2">{card.question}</p>
                          <span className="text-[9px] uppercase font-bold text-primary">Click to Reveal Answer</span>
                        </div>

                        {/* Back Side */}
                        <div className={`absolute inset-0 p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-[#1b2234] border border-primary/20 flex flex-col justify-between items-center text-center backface-hidden transition-all duration-300 ${
                          flippedCardIdx === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                        }`}>
                          <span className="text-[10px] uppercase font-bold text-success">Answer Details</span>
                          <p className="text-xs text-slate-300 leading-normal px-2">{card.answer}</p>
                          <span className="text-[9px] uppercase font-bold text-slate-500">Click to flip back</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab content 3: Quiz */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6 text-left">
                    {result.quiz.map((item, qIdx) => (
                      <div key={qIdx} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                        <h4 className="text-sm font-bold text-white leading-normal flex items-start gap-2">
                          <HelpCircle size={18} className="text-warning shrink-0 mt-0.5" />
                          <span>Q{qIdx + 1}: {item.question}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {item.options.map((opt) => {
                            const isSelected = selectedAnswers[qIdx] === opt;
                            const isCorrect = item.correctAnswer === opt;
                            let btnStyle = 'bg-slate-900/30 border-slate-800 text-slate-350 hover:border-slate-700';

                            if (isSelected) {
                              btnStyle = 'bg-primary/10 border-primary text-white';
                            }
                            if (quizSubmitted) {
                              if (isCorrect) {
                                btnStyle = 'bg-success/10 border-success text-success';
                              } else if (isSelected) {
                                btnStyle = 'bg-danger/10 border-danger text-danger';
                              } else {
                                btnStyle = 'bg-slate-900/10 border-slate-900 text-slate-600 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelectOption(qIdx, opt)}
                                className={`px-4 py-3 rounded-xl border text-xs font-semibold text-left transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/80 text-xs text-slate-400 leading-normal">
                            <span className="font-bold text-white block mb-1">Explanation:</span>
                            {item.explanation}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex justify-end">
                      {!quizSubmitted ? (
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-white bg-warning hover:bg-warning-dark transition-colors"
                        >
                          Submit Quiz Answers
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedAnswers(new Array(result.quiz.length).fill(''));
                            setQuizSubmitted(false);
                          }}
                          className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white glass-panel hover:bg-slate-800 transition-colors border border-slate-800"
                        >
                          Retry Practice quiz
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab content 4: Concept Mindmap */}
                {activeTab === 'mindmap' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>💡 Tip: Drag canvas to PAN | Scroll mousewheel to ZOOM</span>
                      <button
                        onClick={resetMindMap}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-750"
                      >
                        Reset Canvas
                      </button>
                    </div>

                    <div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onWheel={handleWheel}
                      className="glass-panel p-10 rounded-3xl border border-slate-800 overflow-hidden flex justify-center min-h-[45vh] items-center relative bg-slate-950/20 cursor-grab active:cursor-grabbing select-none"
                    >
                      <div
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                          transformOrigin: 'center center',
                          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                        }}
                        className="flex justify-center items-center pointer-events-auto"
                      >
                        <RenderMindMapNode node={result.mindMap} />
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            ) : (
              <div className="h-full min-h-[45vh] rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 bg-slate-900/10">
                <BookOpen size={48} className="text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white">No Notes Summarized</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Upload study documents on the left and click "Summarize" to build chapters, active recall cards, and interactive tests.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
export default NotesSummarizer;
