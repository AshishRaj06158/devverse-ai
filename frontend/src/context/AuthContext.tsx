import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, isFirebaseActive, mockAuthService, mockUserKey } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'Student' | 'Admin';
  bio?: string;
  skills?: string[];
  achievements?: string[];
  certificates?: string[];
  streak?: number;
  solvedCount?: { easy: number; medium: number; hard: number };
  phone?: string;
  linkedin?: string;
  github?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<any>;
  registerWithEmail: (email: string, pass: string) => Promise<any>;
  loginWithGoogle: () => Promise<any>;
  logoutUser: () => Promise<void>;
  updateUserProfileState: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseActive && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Check role and other profile fields from localStorage for simple sync
          const profileStr = localStorage.getItem(`devverse_profile_${firebaseUser.uid}`);
          let profile: any = {};
          if (profileStr) {
            profile = JSON.parse(profileStr);
          } else {
            profile = {
              role: firebaseUser.email?.includes('admin') ? 'Admin' : 'Student',
              bio: 'Enthusiastic Developer',
              skills: ['React', 'CSS', 'JavaScript'],
              achievements: [],
              certificates: [],
              streak: 3,
              solvedCount: { easy: 10, medium: 5, hard: 0 },
              phone: '',
              linkedin: '',
              github: ''
            };
            localStorage.setItem(`devverse_profile_${firebaseUser.uid}`, JSON.stringify(profile));
          }

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
            role: profile.role as 'Student' | 'Admin',
            bio: profile.bio,
            skills: profile.skills,
            achievements: profile.achievements,
            certificates: profile.certificates,
            streak: profile.streak,
            solvedCount: profile.solvedCount,
            phone: profile.phone || '',
            linkedin: profile.linkedin || '',
            github: profile.github || ''
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Mock persistent user check
      const mockUser = mockAuthService.getCurrentUser();
      setUser(mockUser as UserProfile | null);
      setLoading(false);
    }
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isFirebaseActive && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        return cred.user;
      } else {
        const u = await mockAuthService.loginEmail(email, pass);
        setUser(u as UserProfile);
        return u;
      }
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isFirebaseActive && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        return cred.user;
      } else {
        const u = await mockAuthService.registerEmail(email, pass);
        setUser(u as UserProfile);
        return u;
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (isFirebaseActive && auth && googleProvider) {
        const cred = await signInWithPopup(auth, googleProvider);
        return cred.user;
      } else {
        const u = await mockAuthService.loginGoogle();
        setUser(u as UserProfile);
        return u;
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      if (isFirebaseActive && auth) {
        await signOut(auth);
      } else {
        await mockAuthService.logout();
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfileState = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const newProfile = { ...user, ...updated };
    setUser(newProfile);

    // Persist in localStorage to survive page refresh
    if (isFirebaseActive) {
      localStorage.setItem(`devverse_profile_${user.uid}`, JSON.stringify(newProfile));
    } else {
      localStorage.setItem(mockUserKey, JSON.stringify(newProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logoutUser,
        updateUserProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
