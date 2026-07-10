import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, ShieldAlert, WifiOff, Home, ArrowLeft } from 'lucide-react';

// -------------------------------------------------------------
// 404 Page Not Found
// -------------------------------------------------------------
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 rounded-3xl bg-danger/10 border border-danger/25 flex items-center justify-center text-danger"
      >
        <AlertCircle size={44} className="animate-pulse" />
      </motion.div>
      <div className="space-y-2 max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-white font-display">Page Not Found (404)</h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          The link you followed might be broken, or the page may have been relocated.
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Link to="/dashboard" className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold border border-primary/20 flex items-center gap-1.5 hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Home size={14} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 403 Forbidden Access
// -------------------------------------------------------------
export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 rounded-3xl bg-warning/10 border border-warning/25 flex items-center justify-center text-warning"
      >
        <ShieldAlert size={44} />
      </motion.div>
      <div className="space-y-2 max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-white font-display">Access Denied (403)</h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          You do not have the required administrator privileges to view this section database logs.
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <Link to="/dashboard" className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors">
          <ArrowLeft size={14} /> Back to Safety
        </Link>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Offline Connection Lost
// -------------------------------------------------------------
export const OfflinePage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-20 h-20 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400"
      >
        <WifiOff size={44} className="animate-bounce" style={{ animationDuration: '4s' }} />
      </motion.div>
      <div className="space-y-2 max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-white font-display">Connection Lost</h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Please check your network cables or Wi-Fi status. The system will automatically reconnect once online.
        </p>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold border border-primary/20 flex items-center gap-1.5"
      >
        Retry Connection
      </button>
    </div>
  );
};
