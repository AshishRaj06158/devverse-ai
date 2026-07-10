import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, AlertCircle, UploadCloud } from 'lucide-react';

export const PdfChat: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setChat([
        { role: 'assistant', text: `Successfully loaded "${e.target.files[0].name}". Ask me questions about its chapters, formulas, or summaries!` }
      ]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const userMessage = msg;
    setMsg('');
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      setChat(prev => [...prev, { role: 'assistant', text: `Based on your uploaded PDF content, the primary findings suggest implementing modular components and scaling server configurations.` }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">AI Assistant</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Chat with PDF</h1>
        <p className="text-slate-400 text-sm">Upload documentation books, notes, or research papers and fetch answers instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Frame */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 h-max">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">Upload Document</h3>
          
          <div className="border-2 border-dashed border-slate-850 rounded-2xl p-6 text-center hover:border-secondary transition-colors relative cursor-pointer group">
            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud size={32} className="text-slate-655 text-slate-500 mx-auto group-hover:scale-105 transition-transform" />
            <span className="block text-[10px] font-bold text-slate-400 mt-2">Click to select PDF</span>
            <span className="block text-[8px] text-slate-600 mt-0.5">Maximum size: 10MB</span>
          </div>

          {file && (
            <div className="p-3 bg-[#131A2A] border border-slate-850 rounded-xl flex items-center gap-2">
              <FileText size={16} className="text-secondary" />
              <span className="text-[10px] font-bold text-white truncate">{file.name}</span>
            </div>
          )}
        </div>

        {/* Chat Frame */}
        <div className="lg:col-span-2">
          {file ? (
            <div className="glass-panel rounded-3xl border border-slate-800 h-[50vh] flex flex-col justify-between overflow-hidden">
              <div className="p-5 flex-grow overflow-y-auto space-y-3">
                {chat.map((c, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl text-xs max-w-sm ${
                    c.role === 'user' ? 'bg-secondary/15 text-white ml-auto border border-secondary/20' : 'bg-slate-900 text-slate-400 mr-auto'
                  }`}>
                    {c.text}
                  </div>
                ))}
                {loading && (
                  <div className="text-[10px] text-slate-500 animate-pulse">Consulting pdf context...</div>
                )}
              </div>

              <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-850 relative">
                <input
                  type="text"
                  required
                  placeholder="Ask a question about this document..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-850 rounded-xl pl-4 pr-10 py-3 text-xs text-white focus:outline-none"
                />
                <button type="submit" className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <Send size={14} />
                </button>
              </form>
            </div>
          ) : (
            <div className="py-24 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 text-xs">
              Upload a PDF document to begin chatting.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default PdfChat;
