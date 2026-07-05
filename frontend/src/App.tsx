import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  return (
    <div className="flex flex-col min-h-screen bg-gradient-mesh bg-[#0F172A]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
