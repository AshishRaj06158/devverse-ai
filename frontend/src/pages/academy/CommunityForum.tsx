import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, PlusCircle, User, ChevronRight, Clock } from 'lucide-react';

export const CommunityForum: React.FC = () => {
  const { communityPosts, addCommunityPost, addCommentToPost, likePost } = useAcademy();
  
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  
  // Post inputs
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [category, setCategory] = useState('React');
  
  // Comment inputs
  const [newComment, setNewComment] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addCommunityPost(newTitle, newContent, category);
    setNewTitle('');
    setNewContent('');
  };

  const handleCreateComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentToPost(postId, newComment);
    setNewComment('');
  };

  const selectedPost = communityPosts.find(p => p.id === selectedPostId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Return link */}
      <Link to="/academy" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors">
        <ChevronRight size={14} className="rotate-180" /> Back to Academy
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Community Forum</span>
        <h1 className="text-3xl font-extrabold text-white mt-2 font-display">Developer Discussion Board</h1>
        <p className="text-slate-400 text-sm">Ask coding questions, coordinate group projects, and participate in technical forums.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Creation Form & Thread List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Thread Creator Form */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <PlusCircle size={16} className="text-primary" /> Start a Discussion
            </h3>
            
            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Thread title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="sm:col-span-2 bg-[#131A2A] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-[#131A2A] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="React">React</option>
                  <option value="DSA">DSA</option>
                  <option value="Python">Python</option>
                  <option value="Careers">Careers</option>
                </select>
              </div>
              <textarea
                required
                placeholder="What is on your mind? Share topics details or questions..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-[#131A2A] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none h-20 resize-none"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all"
              >
                Post Topic
              </button>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {communityPosts.map(post => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`p-5 glass-panel rounded-3xl border transition-all text-left space-y-3 cursor-pointer ${
                  selectedPostId === post.id ? 'border-primary bg-primary/5' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-2.5 items-center">
                    <img src={post.userPhoto} alt={post.user} className="w-8 h-8 rounded-full border border-slate-700" />
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">{post.user}</span>
                      <span className="text-[9px] text-slate-500 font-semibold uppercase">{post.userRole}</span>
                    </div>
                  </div>
                  <span className="bg-[#131A2A] border border-slate-800 text-slate-400 px-2 py-0.5 rounded text-[8px] font-bold uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-display leading-tight">{post.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>

                <div className="flex gap-4 text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-900/60">
                  <button onClick={(e) => { e.stopPropagation(); likePost(post.id); }} className="flex items-center gap-1 hover:text-primary">
                    <ThumbsUp size={12} /> {post.likes} Likes
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} /> {post.comments.length} Answers
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Selected Post Detailed replies / Q&A view */}
        <div className="lg:col-span-1">
          {selectedPost ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-left space-y-4">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{selectedPost.category} Thread</span>
                <h3 className="text-sm font-bold text-white mt-1 font-display leading-tight">{selectedPost.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed whitespace-pre-line bg-[#0F172A]/40 p-3 rounded-xl border border-slate-900">
                  {selectedPost.content}
                </p>
              </div>

              {/* Comments Section */}
              <div className="border-t border-slate-850 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Discussion Answers</h4>
                
                <div className="space-y-3 overflow-y-auto max-h-[30vh] scrollbar-thin">
                  {selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map(c => (
                      <div key={c.id} className="p-3 bg-[#131A2A]/60 border border-slate-900 rounded-xl space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-slate-300">{c.user}</span>
                          <span className="text-slate-500">{c.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{c.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-[10px] text-slate-655 text-slate-500">
                      No answers posted yet. Help your peer out!
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={(e) => handleCreateComment(e, selectedPost.id)} className="space-y-2 pt-2 border-t border-slate-850">
                <textarea
                  required
                  placeholder="Type your answer reply..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-[#131A2A] border border-slate-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none h-16 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary hover:bg-primary-dark font-bold text-xs text-white rounded-xl transition-all"
                >
                  Submit Answer
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center py-12 text-slate-500 text-xs">
              Select a discussion thread from the left to view detailed replies and Q&A boards.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default CommunityForum;
