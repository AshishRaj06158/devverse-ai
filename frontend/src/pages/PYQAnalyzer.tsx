import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { UploadCloud, FileSpreadsheet, RefreshCw, AlertCircle, Award, Sparkles, AlertTriangle } from 'lucide-react';

interface RepeatedQuestion {
  question: string;
  frequency: number;
  topic: string;
}

interface TopicDist {
  topic: string;
  count: number;
}

interface Difficulty {
  level: string;
  percentage: number;
}

interface PredictedQuestion {
  question: string;
  topic: string;
  probability: number;
}

interface PYQAnalysisResult {
  repeatedQuestions: RepeatedQuestion[];
  topicDistribution: TopicDist[];
  difficultyAnalysis: Difficulty[];
  predictedQuestions: PredictedQuestion[];
}

export const PYQAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PYQAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a PDF question paper.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/analyze-pyq`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('PYQ analysis failed');
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error occurred analyzing papers.');
      // Local fallback Mock
      const fbData: PYQAnalysisResult = {
        repeatedQuestions: [
          { question: 'Explain the difference between TCP and UDP with header structures.', frequency: 5, topic: 'Computer Networks' },
          { question: 'What is Virtual Memory? Explain the demand paging mechanism.', frequency: 4, topic: 'Operating Systems' },
          { question: 'Define Normalization. Explain 1NF, 2NF, 3NF, and BCNF with examples.', frequency: 3, topic: 'Database Systems' }
        ],
        topicDistribution: [
          { topic: 'Computer Networks', count: 12 },
          { topic: 'Operating Systems', count: 8 },
          { topic: 'Database Systems', count: 6 },
          { topic: 'Data Structures', count: 5 }
        ],
        difficultyAnalysis: [
          { level: 'Easy', percentage: 30 },
          { level: 'Medium', percentage: 50 },
          { level: 'Hard', percentage: 20 }
        ],
        predictedQuestions: [
          { question: 'Design an efficient client-server chat application protocol over TCP.', topic: 'Computer Networks', probability: 92 },
          { question: 'Analyze and implement the Banker\'s Algorithm for deadlock avoidance.', topic: 'Operating Systems', probability: 85 },
          { question: 'Explain two-phase locking protocol and database transaction ACID properties.', topic: 'Database Systems', probability: 78 }
        ]
      };
      setResult(fbData);
    } finally {
      setLoading(false);
    }
  };

  // Theme colors for charts
  const DIFFICULTY_COLORS = ['#10B981', '#F59E0B', '#EF4444'];
  const TOPIC_COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#E2E8F0'];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8">
        <span className="text-xs font-bold text-danger uppercase tracking-widest bg-danger/10 px-3 py-1 rounded-full border border-danger/20">Module 6</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">PYQ Analyzer</h1>
        <p className="text-slate-400 text-sm mt-1">Audit previous year university or certification papers to extract topic densities, trends, and question predictions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Uploader */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Upload Exam Papers</h3>
            
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="relative border-2 border-dashed border-slate-800 rounded-2xl hover:border-danger/50 transition-colors p-6 text-center flex flex-col items-center justify-center cursor-pointer bg-[#131A2A]/40">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud size={32} className="text-slate-500 mb-2" />
                <span className="text-xs font-bold text-white">
                  {file ? file.name : 'Choose PYQ PDF'}
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
                    Calculating stats...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Audit Papers
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Visualizations row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Topic Distribution bar chart */}
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Topic Densities</h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.topicDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                          <XAxis dataKey="topic" stroke="#64748B" fontSize={10} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 8, color: '#fff' }} />
                          <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                            {result.topicDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={TOPIC_COLORS[index % TOPIC_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Difficulty pie chart */}
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Difficulty Distribution</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="h-44">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={result.difficultyAnalysis}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={65}
                              paddingAngle={5}
                              dataKey="percentage"
                              nameKey="level"
                            >
                              {result.difficultyAnalysis.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: 8, color: '#fff' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        {result.difficultyAnalysis.map((entry, idx) => (
                          <div key={entry.level} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: DIFFICULTY_COLORS[idx] }}></span>
                            <span className="font-semibold text-slate-300">{entry.level}: {entry.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Repeated Questions Table */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">Most Repeated Questions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-400">
                      <thead className="text-[10px] text-slate-500 uppercase bg-slate-900/40 border-b border-slate-850">
                        <tr>
                          <th className="py-3 px-4">Exam Question</th>
                          <th className="py-3 px-4">Topic Area</th>
                          <th className="py-3 px-4 text-center">Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.repeatedQuestions.map((req, idx) => (
                          <tr key={idx} className="border-b border-slate-900 last:border-b-0 hover:bg-slate-900/10">
                            <td className="py-3 px-4 font-bold text-slate-200">{req.question}</td>
                            <td className="py-3 px-4">{req.topic}</td>
                            <td className="py-3 px-4 text-center font-extrabold text-primary">{req.frequency}x</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Predicted Questions Cards */}
                <div className="space-y-4 text-left">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">AI Predicted Questions (High Probability)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.predictedQuestions.map((pq, idx) => (
                      <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] uppercase font-bold text-slate-500">{pq.topic}</span>
                            <span className="text-[10px] font-bold text-success flex items-center gap-0.5">
                              <Sparkles size={10} /> {pq.probability}% Prob
                            </span>
                          </div>
                          <p className="text-xs font-bold text-white leading-normal">"{pq.question}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[45vh] rounded-3xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-6 bg-slate-900/10">
                <FileSpreadsheet size={48} className="text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-white">No Exam papers Analyzed</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Upload PDF version of past exams or assignments on the left and click "Audit" to generate difficulty weights and predicted exam topics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
export default PYQAnalyzer;
