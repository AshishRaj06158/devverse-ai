import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AcademyProvider } from './context/AcademyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { AdminPanel } from './pages/AdminPanel';
import { ResumeAnalyzer } from './pages/ResumeAnalyzer';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { CoverLetterGenerator } from './pages/CoverLetterGenerator';
import { InterviewCoach } from './pages/InterviewCoach';
import { NotesSummarizer } from './pages/NotesSummarizer';
import { PYQAnalyzer } from './pages/PYQAnalyzer';
import { CodingTracker } from './pages/CodingTracker';
import { PortfolioBuilder } from './pages/PortfolioBuilder';
import { About } from './pages/About';

// Academy imports
import { AcademyHome } from './pages/academy/AcademyHome';
import { CourseDetails } from './pages/academy/CourseDetails';
import { CoursePlayer } from './pages/academy/CoursePlayer';
import { StudentDashboard } from './pages/academy/StudentDashboard';
import { InstructorDashboard } from './pages/academy/InstructorDashboard';
import { EventsModule } from './pages/academy/EventsModule';
import { CareerCenter } from './pages/academy/CareerCenter';
import { CommunityForum } from './pages/academy/CommunityForum';

// Global layout & errors
import { CustomCursor } from './components/layout/CustomCursor';
import { NotFoundPage } from './components/layout/ErrorPages';
import { motion, AnimatePresence } from 'framer-motion';

// AI Tool additions
import { StudyPlanner } from './pages/ai/StudyPlanner';
import { RoadmapGenerator } from './pages/ai/RoadmapGenerator';
import { ChatAssistant } from './pages/ai/ChatAssistant';
import { CodingMentor } from './pages/ai/CodingMentor';
import { CareerAdvisor } from './pages/ai/CareerAdvisor';
import { PdfChat } from './pages/ai/PdfChat';
import { ResearchAssistant } from './pages/ai/ResearchAssistant';


// -------------------------------------------------------------
// Protected Route Guards
// -------------------------------------------------------------
const ProtectedRoute: React.FC<{ children: React.ReactNode; requireAdmin?: boolean }> = ({
  children,
  requireAdmin = false,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium animate-pulse">Loading DevVerse...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && user.role !== 'Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-mesh bg-[#0F172A]">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15, scale: 0.99, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, scale: 0.99, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected General User Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-analyzer"
                element={
                  <ProtectedRoute>
                    <ResumeAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-builder"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cover-letter"
                element={
                  <ProtectedRoute>
                    <CoverLetterGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interview-coach"
                element={
                  <ProtectedRoute>
                    <InterviewCoach />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes-summarizer"
                element={
                  <ProtectedRoute>
                    <NotesSummarizer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pyq-analyzer"
                element={
                  <ProtectedRoute>
                    <PYQAnalyzer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coding-tracker"
                element={
                  <ProtectedRoute>
                    <CodingTracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portfolio-builder"
                element={
                  <ProtectedRoute>
                    <PortfolioBuilder />
                  </ProtectedRoute>
                }
              />

              {/* AI Expanded Tool Mappings */}
              <Route
                path="/ai/study-planner"
                element={
                  <ProtectedRoute>
                    <StudyPlanner />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/roadmap"
                element={
                  <ProtectedRoute>
                    <RoadmapGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/chat"
                element={
                  <ProtectedRoute>
                    <ChatAssistant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/mentor"
                element={
                  <ProtectedRoute>
                    <CodingMentor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/advisor"
                element={
                  <ProtectedRoute>
                    <CareerAdvisor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/pdf-chat"
                element={
                  <ProtectedRoute>
                    <PdfChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai/research"
                element={
                  <ProtectedRoute>
                    <ResearchAssistant />
                  </ProtectedRoute>
                }
              />

              {/* Academy protected routes */}
              <Route
                path="/academy"
                element={
                  <ProtectedRoute>
                    <AcademyHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/course/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/player/:courseId"
                element={
                  <ProtectedRoute>
                    <CoursePlayer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/instructor"
                element={
                  <ProtectedRoute>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/events"
                element={
                  <ProtectedRoute>
                    <EventsModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/careers"
                element={
                  <ProtectedRoute>
                    <CareerCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/academy/community"
                element={
                  <ProtectedRoute>
                    <CommunityForum />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Only Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Custom 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AcademyProvider>
          <AppContent />
        </AcademyProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
