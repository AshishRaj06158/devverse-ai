import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles, User, Terminal } from 'lucide-react';

export const ChatAssistant: React.FC = () => {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'Hello! I am your central DevVerse Career & Engineering Assistant. Ask me questions about syntax, project architecture, deployment workflows, or resume parameters.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;

    const userMessage = msg;
    setMsg('');
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/academy/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage, textContext: 'General developer career questions.' })
      });
      const data = await response.json();
      setChat(prev => [...prev, { role: 'assistant', text: data.result || 'Mock Response successfully evaluated.' }]);
    } catch {
      setTimeout(() => {
        setChat(prev => [...prev, { role: 'assistant', text: 'Thank you for your message. As an AI assistant, I recommend configuring proper env parameters and testing locally.' }]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      
      <div className="space-y-2">
        <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">AI Assistant</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">AI Conversational Assistant</h1>
        <p className="text-slate-400 text-sm">Real-time answers to technical questions, bugs debugging, and careers consultation.</p>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden h-[60vh] flex flex-col justify-between">
        
        {/* Messages */}
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          {chat.map((c, idx) => (
            <div key={idx} className={`flex gap-3 items-start max-w-2xl ${c.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                c.role === 'user' ? 'bg-primary/25 text-primary border border-primary/20' : 'bg-slate-900 text-slate-400'
              }`}>
                {c.role === 'user' ? <User size={14} /> : <Terminal size={14} />}
              </div>
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed text-left ${
                c.role === 'user' 
                  ? 'bg-primary/10 border border-primary/25 text-slate-200' 
                  : 'bg-[#131A2A] border border-slate-850 text-slate-350'
              }`}>
                {c.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-start max-w-2xl mr-auto animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center">
                <Terminal size={14} />
              </div>
              <div className="p-3.5 rounded-2xl text-xs bg-[#131A2A] border border-slate-850 text-slate-500">
                Thinking of solution...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950/60 border-t border-slate-850 relative">
          <input
            type="text"
            required
            placeholder="Type your technical query here..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full bg-[#131A2A] border border-slate-850 rounded-2xl pl-4 pr-12 py-3.5 text-xs text-white focus:outline-none focus:border-primary"
          />
          <button type="submit" className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
            <Send size={16} />
          </button>
        </form>

      </div>

    </div>
  );
};
export default ChatAssistant;
