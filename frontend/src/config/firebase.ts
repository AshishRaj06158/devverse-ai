import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const customFirebaseStr = localStorage.getItem('devverse_firebase_config');
if (customFirebaseStr) {
  try {
    const parsed = JSON.parse(customFirebaseStr);
    if (parsed.apiKey && parsed.projectId) {
      firebaseConfig = { ...firebaseConfig, ...parsed };
    }
  } catch (err) {
    console.error('Failed to parse custom firebase config:', err);
  }
}

let app: any = null;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;
let isFirebaseActive = false;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    isFirebaseActive = true;
    console.log('Firebase client successfully initialized.');
  } catch (error) {
    console.error('Failed to initialize Firebase client SDK:', error);
  }
} else {
  console.warn('Firebase client config incomplete. Using Mock Local Auth Engine.');
}

// -------------------------------------------------------------
// High-Fidelity Mock Auth Engine with Local DB for development
// -------------------------------------------------------------
export const mockUserKey = 'devverse_mock_user';
const mockDatabaseKey = 'devverse_mock_users_db';

const getMockDatabase = () => {
  const dbStr = localStorage.getItem(mockDatabaseKey);
  if (dbStr) {
    try {
      return JSON.parse(dbStr);
    } catch (_) {}
  }
  
  // Seed default developer and admin users
  const defaultDb = {
    'developer@devverse.ai': {
      password: 'password123',
      displayName: 'rathor222733',
      role: 'Student',
      bio: 'Innovative Developer & Learner',
      skills: ['React', 'TypeScript', 'Node.js', 'CSS'],
      achievements: ['Won Hackathon 2026', 'Solved 300+ Problems'],
      certificates: ['Google Cloud Architect', 'Meta React Developer'],
      streak: 5,
      solvedCount: { easy: 45, medium: 28, hard: 8 }
    },
    'admin@devverse.ai': {
      password: 'adminpassword',
      displayName: 'admin',
      role: 'Admin',
      bio: 'System Administrator',
      skills: ['Security', 'DevOps', 'Management'],
      achievements: ['Maintained 99.9% Uptime'],
      certificates: ['AWS DevSecOps Professional'],
      streak: 10,
      solvedCount: { easy: 10, medium: 5, hard: 0 }
    }
  };
  localStorage.setItem(mockDatabaseKey, JSON.stringify(defaultDb));
  return defaultDb;
};

export const mockAuthService = {
  getCurrentUser: () => {
    const data = localStorage.getItem(mockUserKey);
    return data ? JSON.parse(data) : null;
  },
  
  loginEmail: async (email: string, pass: string) => {
    const db = getMockDatabase();
    const cleanEmail = email.toLowerCase().trim();
    const userRecord = db[cleanEmail];
    
    if (!userRecord) {
      throw new Error('Account does not exist. Please sign up/register first.');
    }
    
    if (userRecord.password !== pass) {
      throw new Error('Incorrect password. Please verify and try again.');
    }
    
    const user = {
      uid: `mock-uid-${cleanEmail.replace(/[^a-z0-9]/g, '')}`,
      email,
      displayName: userRecord.displayName || email.split('@')[0],
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: userRecord.role as 'Admin' | 'Student',
      bio: userRecord.bio || 'Innovative Developer & Learner',
      skills: userRecord.skills || ['React', 'TypeScript', 'Node.js', 'CSS'],
      achievements: userRecord.achievements || [],
      certificates: userRecord.certificates || [],
      streak: userRecord.streak || 5,
      solvedCount: userRecord.solvedCount || { easy: 45, medium: 28, hard: 8 }
    };
    
    localStorage.setItem(mockUserKey, JSON.stringify(user));
    return user;
  },
  
  loginGoogle: async () => {
    const db = getMockDatabase();
    const userRecord = db['developer@devverse.ai'];
    const user = {
      uid: 'mock-uid-developer',
      email: 'developer@devverse.ai',
      displayName: userRecord.displayName,
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Student' as 'Student' | 'Admin',
      bio: userRecord.bio,
      skills: userRecord.skills,
      achievements: userRecord.achievements,
      certificates: userRecord.certificates,
      streak: userRecord.streak,
      solvedCount: userRecord.solvedCount
    };
    localStorage.setItem(mockUserKey, JSON.stringify(user));
    return user;
  },
  
  registerEmail: async (email: string, pass: string) => {
    const db = getMockDatabase();
    const cleanEmail = email.toLowerCase().trim();
    
    if (db[cleanEmail]) {
      throw new Error('An account with this email address already exists.');
    }
    
    // Create new record in mock database
    const newRecord = {
      password: pass,
      displayName: cleanEmail.split('@')[0],
      role: 'Student',
      bio: 'Enthusiastic Developer',
      skills: ['React', 'CSS', 'JavaScript'],
      achievements: [],
      certificates: [],
      streak: 1,
      solvedCount: { easy: 0, medium: 0, hard: 0 }
    };
    
    db[cleanEmail] = newRecord;
    localStorage.setItem(mockDatabaseKey, JSON.stringify(db));
    
    // Log in immediately
    return mockAuthService.loginEmail(email, pass);
  },
  
  logout: async () => {
    localStorage.removeItem(mockUserKey);
  }
};

export { app, auth, db, googleProvider, isFirebaseActive };
export default app;
