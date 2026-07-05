import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// -------------------------------------------------------------
// Interfaces & Models
// -------------------------------------------------------------
export interface Lesson {
  id: string;
  title: string;
  type: 'Video' | 'PDF' | 'Article' | 'Code' | 'Assignment' | 'Quiz' | 'Project';
  duration: string;
  contentUrl?: string;
  articleBody?: string;
  codeTemplate?: string;
  downloadUrl?: string;
  externalLink?: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'MCQ' | 'TrueFalse' | 'Code' | 'FillBlank' | 'Subjective';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface Course {
  id: string;
  title: string;
  coverImage: string;
  instructor: string;
  rating: number;
  studentCount: number;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  discount: number;
  category: string;
  outcomes: string[];
  requirements: string[];
  description: string;
  modules: {
    id: string;
    title: string;
    lessons: Lesson[];
  }[];
  reviews: { id: string; user: string; rating: number; comment: string; date: string }[];
  faqs: { q: string; a: string }[];
}

export interface CarouselBanner {
  id: string;
  bgImage: string;
  gradientOverlay: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaPath: string;
  countdownDate?: string;
  badge?: string;
  priority: number;
  isActive: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  referralAvailable: boolean;
  companyProfileUrl?: string;
}

export interface HackathonEvent {
  id: string;
  title: string;
  type: 'Hackathon' | 'Coding Contest' | 'Webinar' | 'Workshop';
  date: string;
  time: string;
  description: string;
  registrationOpen: boolean;
}

export interface CommunityPost {
  id: string;
  user: string;
  userPhoto?: string;
  userRole?: string;
  title: string;
  content: string;
  likes: number;
  comments: { id: string; user: string; comment: string; date: string }[];
  date: string;
  category: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  verificationId: string;
}

interface AcademyContextType {
  courses: Course[];
  banners: CarouselBanner[];
  jobs: JobListing[];
  events: HackathonEvent[];
  communityPosts: CommunityPost[];
  enrolledCourses: string[]; // courseId array
  completedLessons: string[]; // courseId_lessonId array
  quizScores: Record<string, number>; // quizId to score percentage map
  studentCertificates: Certificate[];
  jobApplications: Record<string, string>; // jobId to status map ('applied' | 'interview' | 'accepted')
  eventRegistrations: string[]; // eventId array
  studentXP: number;
  addCourse: (course: Course) => void;
  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  submitQuizResult: (quizId: string, score: number) => void;
  claimCertificate: (courseName: string, instructorName: string) => void;
  addCommunityPost: (title: string, content: string, category: string) => void;
  addCommentToPost: (postId: string, comment: string) => void;
  likePost: (postId: string) => void;
  applyForJob: (jobId: string) => void;
  registerForEvent: (eventId: string) => void;
  saveBanner: (banner: CarouselBanner) => void;
  deleteBanner: (id: string) => void;
}

// -------------------------------------------------------------
// Seed Mock Data
// -------------------------------------------------------------
const INITIAL_CATEGORIES = [
  'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Python', 'React', 'Next.js', 'DSA', 'Interview Preparation', 'Web Development'
];

const INITIAL_COURSES: Course[] = [
  {
    id: 'c-1',
    title: 'Advanced React & Next.js Patterns',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    instructor: 'Alex Rivera',
    rating: 4.8,
    studentCount: 1420,
    language: 'English',
    level: 'Advanced',
    duration: '14 hrs',
    price: 4999,
    discount: 20,
    category: 'React',
    outcomes: [
      'Master server components and suspense APIs',
      'Optimize bundle sizes using server-side chunk actions',
      'Build real-world production level Next.js app systems'
    ],
    requirements: ['Solid JavaScript skills', 'Basic React understanding'],
    description: 'Deep dive into standard engineering layouts using React 19, custom suspense structures, and Next.js App router code bases.',
    modules: [
      {
        id: 'm-1-1',
        title: 'Section 1: Architecture & Server Components',
        lessons: [
          {
            id: 'l-1-1-1',
            title: '1.1 Introduction to Next.js App Router',
            type: 'Video',
            duration: '12 min',
            contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'l-1-1-2',
            title: '1.2 Server vs Client Components Architecture',
            type: 'Article',
            duration: '8 min',
            articleBody: 'Next.js introduces React Server Components, which allow rendering elements on the server. This reduces client bundle sizes, optimizes SEO, and provides faster initial loads.'
          },
          {
            id: 'l-1-1-3',
            title: '1.3 Deep Dive into Suspense Boundaries',
            type: 'Video',
            duration: '18 min',
            contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
          }
        ]
      },
      {
        id: 'm-1-2',
        title: 'Section 2: Hands-on Assessment',
        lessons: [
          {
            id: 'l-1-2-1',
            title: '2.1 Coding Assignment: Suspense Wrapper',
            type: 'Assignment',
            duration: '45 min',
            codeTemplate: 'export default function LoadingBoundary({ children }) {\n  // Implement dynamic fallback wrapper\n  return null;\n}'
          },
          {
            id: 'l-1-2-2',
            title: '2.2 Quiz: Render Architecture Testing',
            type: 'Quiz',
            duration: '10 min',
            quizQuestions: [
              {
                id: 'q-1',
                question: 'RSC (React Server Components) run on the client browser by default.',
                type: 'TrueFalse',
                correctAnswer: 'False',
                explanation: 'Server Components are executed exclusively on the hosting server.',
                points: 10
              },
              {
                id: 'q-2',
                question: 'Which Hook is used to flag a component file as client-rendered?',
                type: 'MCQ',
                options: ['useClient', 'useEffects', '"use client" directive', 'useReact'],
                correctAnswer: '"use client" directive',
                explanation: 'Prepending "use client" signals bundlers that the file belongs to client execution boundaries.',
                points: 15
              }
            ]
          }
        ]
      }
    ],
    reviews: [
      { id: 'r1', user: 'Ashish Raj', rating: 5, comment: 'Phenomenal curriculum! Hand-on assignments are very engaging.', date: '2026-07-02' }
    ],
    faqs: [
      { q: 'Is React 19 covered?', a: 'Yes, Server actions and dynamic Hooks are explained.' }
    ]
  },
  {
    id: 'c-2',
    title: 'Mastering Data Structures & Algorithms',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    instructor: 'Dr. Sarah Jenkins',
    rating: 4.9,
    studentCount: 3890,
    language: 'Hindi & English',
    level: 'Beginner',
    duration: '45 hrs',
    price: 6999,
    discount: 15,
    category: 'DSA',
    outcomes: [
      'Write optimized solutions with best Time Complexity',
      'Ace competitive coding tests on Leetcode/Codeforces',
      'Solve LinkedList, Tree, Graph, and DP problems easily'
    ],
    requirements: ['Basic programming logic in C++ or Java'],
    description: 'A comprehensive standard program to master Array methods, Recursion, Trees, Heap, Graph Algorithms, and Dynamic Programming.',
    modules: [
      {
        id: 'm-2-1',
        title: 'Section 1: Space & Time Complexity Analysis',
        lessons: [
          {
            id: 'l-2-1-1',
            title: '1.1 Understanding Big O Notation',
            type: 'Video',
            duration: '25 min',
            contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
          },
          {
            id: 'l-2-1-2',
            title: '1.2 Coding Challenge: Find Duplicate elements in O(N) time',
            type: 'Code',
            duration: '20 min',
            codeTemplate: '// Complete the function to return duplicates\nfunction findDuplicates(arr) {\n  \n}'
          }
        ]
      }
    ],
    reviews: [
      { id: 'r2', user: 'Rohan Roy', rating: 5, comment: 'A complete placement saver course!', date: '2026-06-28' }
    ],
    faqs: [
      { q: 'Does it support Java?', a: 'Codes are written in Java, Python, and C++.' }
    ]
  }
];

const INITIAL_BANNERS: CarouselBanner[] = [
  {
    id: 'b-1',
    bgImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    gradientOverlay: 'from-blue-900/90 via-[#0F172A]/85 to-indigo-900/60',
    title: 'Unlock DevVerse Academy LMS Platform 🎓',
    subtitle: 'Learn full stack web dev, competitive programming, & AI system architectures with hands-on players and dynamic certificates.',
    ctaText: 'Explore Available Courses',
    ctaPath: '/academy',
    badge: 'NEW RELEASE',
    priority: 1,
    isActive: true
  },
  {
    id: 'b-2',
    bgImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    gradientOverlay: 'from-purple-950/90 via-[#0F172A]/85 to-[#0F172A]/40',
    title: 'DevVerse AI Hackathon 2026 🏆',
    subtitle: 'Build innovative web apps using Firebase & Gemini API. Up to ₹1,00,000 cash prizes! Registrations close soon.',
    ctaText: 'Register for Hackathon',
    ctaPath: '/academy/events',
    countdownDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    badge: 'FLASH OFFER',
    priority: 2,
    isActive: true
  }
];

const INITIAL_JOBS: JobListing[] = [
  {
    id: 'j-1',
    title: 'Junior Frontend Engineer (React/TypeScript)',
    company: 'Scribe Tech Solutions',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹8,00,000 LPA',
    description: 'We are hiring a self-motivated React engineer to work on scaling dashboard panels and integrating restful APIs.',
    requirements: ['React expertise', 'TypeScript knowledge', 'Responsive tailwind design UI principles'],
    referralAvailable: true
  },
  {
    id: 'j-2',
    title: 'Software Developer Intern (MERN Stack)',
    company: 'Optima Labs LLC',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
    location: 'Remote',
    type: 'Internship',
    salary: '₹25,000 / month stipend',
    description: 'Work closely with backend teams implementing Express APIs, MongoDB databases, and React client bindings.',
    requirements: ['Node.js & Express understanding', 'Basic understanding of MongoDB', 'Git collaboration workflow'],
    referralAvailable: false
  }
];

const INITIAL_EVENTS: HackathonEvent[] = [
  {
    id: 'e-1',
    title: 'DevVerse Annual Hackathon 2026',
    type: 'Hackathon',
    date: '2026-07-15',
    time: '09:00 AM IST',
    description: 'Bring creative software engineering proposals into reality using web frameworks and generative AI models.',
    registrationOpen: true
  },
  {
    id: 'e-2',
    title: 'Competitive DSA Contest - Round 1',
    type: 'Coding Contest',
    date: '2026-07-10',
    time: '08:00 PM IST',
    description: 'Solve 5 challenging data structures and algorithmic problems in 2.5 hours. Win XP bonuses!',
    registrationOpen: true
  }
];

const INITIAL_FORUM: CommunityPost[] = [
  {
    id: 'p-1',
    user: 'Sarah Chen',
    userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    userRole: 'Full Stack Engineer',
    title: 'How do you handle complex nested server actions caching in Next.js?',
    content: 'I am struggling to optimize loading states when user roles trigger sequential API updates. Should I opt for client-side loading or keep routing inside Server Components?',
    likes: 24,
    comments: [
      { id: 'c1', user: 'Alex Rivera', comment: 'Rely on standard Suspense boundaries. They keep the initial page responsive while streaming actions.', date: '2026-07-04' }
    ],
    date: '2026-07-04',
    category: 'React'
  }
];

// -------------------------------------------------------------
// Provider Implementation
// -------------------------------------------------------------
const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Custom localStorage hooks keys
  const getStoredState = <T,>(key: string, fallback: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  };

  const [courses, setCourses] = useState<Course[]>(() => getStoredState('devverse_courses', INITIAL_COURSES));
  const [banners, setBanners] = useState<CarouselBanner[]>(() => getStoredState('devverse_banners', INITIAL_BANNERS));
  const [jobs, setJobs] = useState<JobListing[]>(() => getStoredState('devverse_jobs', INITIAL_JOBS));
  const [events, setEvents] = useState<HackathonEvent[]>(() => getStoredState('devverse_events', INITIAL_EVENTS));
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => getStoredState('devverse_community', INITIAL_FORUM));
  
  // Student progression maps
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(() => getStoredState('devverse_student_enrolled', []));
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => getStoredState('devverse_student_completed_lessons', []));
  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => getStoredState('devverse_student_quiz_scores', {}));
  const [studentCertificates, setStudentCertificates] = useState<Certificate[]>(() => getStoredState('devverse_student_certs', []));
  
  // Forms states
  const [jobApplications, setJobApplications] = useState<Record<string, string>>(() => getStoredState('devverse_student_job_apps', {}));
  const [eventRegistrations, setEventRegistrations] = useState<string[]>(() => getStoredState('devverse_student_event_reg', []));
  const [studentXP, setStudentXP] = useState<number>(() => getStoredState('devverse_student_xp', 250));

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('devverse_courses', JSON.stringify(courses));
    localStorage.setItem('devverse_banners', JSON.stringify(banners));
    localStorage.setItem('devverse_jobs', JSON.stringify(jobs));
    localStorage.setItem('devverse_events', JSON.stringify(events));
    localStorage.setItem('devverse_community', JSON.stringify(communityPosts));
    localStorage.setItem('devverse_student_enrolled', JSON.stringify(enrolledCourses));
    localStorage.setItem('devverse_student_completed_lessons', JSON.stringify(completedLessons));
    localStorage.setItem('devverse_student_quiz_scores', JSON.stringify(quizScores));
    localStorage.setItem('devverse_student_certs', JSON.stringify(studentCertificates));
    localStorage.setItem('devverse_student_job_apps', JSON.stringify(jobApplications));
    localStorage.setItem('devverse_student_event_reg', JSON.stringify(eventRegistrations));
    localStorage.setItem('devverse_student_xp', JSON.stringify(studentXP));
  }, [courses, banners, jobs, events, communityPosts, enrolledCourses, completedLessons, quizScores, studentCertificates, jobApplications, eventRegistrations, studentXP]);

  // Actions
  const addCourse = (course: Course) => {
    setCourses([course, ...courses]);
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      setStudentXP(prev => prev + 50); // Welcome bonus
    }
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    const key = `${courseId}_${lessonId}`;
    if (!completedLessons.includes(key)) {
      setCompletedLessons([...completedLessons, key]);
      setStudentXP(prev => prev + 15); // XP rewards
    }
  };

  const submitQuizResult = (quizId: string, score: number) => {
    setQuizScores(prev => ({ ...prev, [quizId]: score }));
    if (score >= 80) {
      setStudentXP(prev => prev + 100); // Master reward
    }
  };

  const claimCertificate = (courseName: string, instructorName: string) => {
    const userName = user?.displayName || 'Student Developer';
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      studentName: userName,
      courseName,
      completionDate: new Date().toLocaleDateString(),
      instructorName,
      verificationId: `VERIFY-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`
    };
    setStudentCertificates([...studentCertificates, newCert]);
    setStudentXP(prev => prev + 300); // Graduation bonus
  };

  const addCommunityPost = (title: string, content: string, category: string) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      user: user?.displayName || 'User',
      userPhoto: user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      userRole: user?.role || 'Student',
      title,
      content,
      likes: 0,
      comments: [],
      date: new Date().toISOString().split('T')[0],
      category
    };
    setCommunityPosts([newPost, ...communityPosts]);
    setStudentXP(prev => prev + 10);
  };

  const addCommentToPost = (postId: string, comment: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `comment-${Date.now()}`,
              user: user?.displayName || 'User',
              comment,
              date: new Date().toLocaleDateString()
            }
          ]
        };
      }
      return post;
    }));
    setStudentXP(prev => prev + 5);
  };

  const likePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const applyForJob = (jobId: string) => {
    setJobApplications(prev => ({ ...prev, [jobId]: 'applied' }));
    setStudentXP(prev => prev + 20);
  };

  const registerForEvent = (eventId: string) => {
    if (!eventRegistrations.includes(eventId)) {
      setEventRegistrations([...eventRegistrations, eventId]);
      setStudentXP(prev => prev + 15);
    }
  };

  const saveBanner = (banner: CarouselBanner) => {
    const exists = banners.some(b => b.id === banner.id);
    if (exists) {
      setBanners(prev => prev.map(b => b.id === banner.id ? banner : b));
    } else {
      setBanners([banner, ...banners]);
    }
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AcademyContext.Provider
      value={{
        courses,
        banners,
        jobs,
        events,
        communityPosts,
        enrolledCourses,
        completedLessons,
        quizScores,
        studentCertificates,
        jobApplications,
        eventRegistrations,
        studentXP,
        addCourse,
        enrollInCourse,
        completeLesson,
        submitQuizResult,
        claimCertificate,
        addCommunityPost,
        addCommentToPost,
        likePost,
        applyForJob,
        registerForEvent,
        saveBanner,
        deleteBanner
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
