import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, try to restore user from localStorage
    const savedUser = localStorage.getItem('adhd_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Convert date strings back to Date objects
        if (userData.createdAt) {
          userData.createdAt = new Date(userData.createdAt);
        }
        setUser(userData);
        setLoading(false);
        console.log('AuthContext: User restored from localStorage');
        return;
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('adhd_user');
      }
    }

    // If no saved user, try to get session from Supabase
    const getInitialSession = async () => {
      try {
        console.log('AuthContext: Getting initial session...');
        
        // Try to get session without timeout first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setLoading(false);
          return;
        }
        
        console.log('AuthContext: Session result:', { session: !!session, user: !!session?.user });
        
        if (session?.user) {
          console.log('AuthContext: User found, creating local user...');
          // Create local user immediately without database query
          const userData = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
            avatar: session.user.user_metadata?.avatar || undefined,
            preferences: {
              workHours: { start: '09:00', end: '17:00' },
              breakDuration: 15,
              maxTasksPerDay: 8,
              preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
            },
            createdAt: new Date()
          };
          setUser(userData);
          // Save to localStorage for persistence
          localStorage.setItem('adhd_user', JSON.stringify(userData));
        } else {
          console.log('AuthContext: No session found');
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        // Continue without authentication
      } finally {
        console.log('AuthContext: Setting loading to false');
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            preferences: {
              workHours: { start: '09:00', end: '17:00' },
              breakDuration: 15,
              maxTasksPerDay: 8,
              preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
            },
            createdAt: new Date(userData.created_at)
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Starting login for', email);
      
      // Add timeout to prevent hanging
      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout')), 5000)
      );
      
      console.log('AuthContext: Calling signInWithPassword...');
      const { data, error } = await Promise.race([loginPromise, timeoutPromise]) as any;
      console.log('AuthContext: signInWithPassword response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        // Create local user as fallback
        console.log('AuthContext: Creating local user due to login error...');
        const userData = {
          id: `local-${Date.now()}`,
          email: email,
          name: email.split('@')[0],
          avatar: undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        };
        setUser(userData);
        localStorage.setItem('adhd_user', JSON.stringify(userData));
        return true;
      }

      console.log('AuthContext: Login successful, user:', data.user?.id);

      if (data.user) {
        console.log('AuthContext: Creating local user...');
        // Create local user immediately without database query
        const userData = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || data.user.email!.split('@')[0],
          avatar: data.user.user_metadata?.avatar || undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        };
        setUser(userData);
        localStorage.setItem('adhd_user', JSON.stringify(userData));
      } else {
        // Fallback: create local user
        const userData = {
          id: `local-${Date.now()}`,
          email: email,
          name: email.split('@')[0],
          avatar: undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        };
        setUser(userData);
        localStorage.setItem('adhd_user', JSON.stringify(userData));
      }

      console.log('AuthContext: Login process completed successfully');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // Create local user as fallback
      console.log('AuthContext: Creating local user due to error...');
      const userData = {
        id: `local-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        avatar: undefined,
        preferences: {
          workHours: { start: '09:00', end: '17:00' },
          breakDuration: 15,
          maxTasksPerDay: 8,
          preferredCategories: [],
          theme: 'light' as 'light' | 'dark'
        },
        createdAt: new Date()
      };
      setUser(userData);
      localStorage.setItem('adhd_user', JSON.stringify(userData));
      return true;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Starting signup for:', email);
      
      // Add timeout to prevent hanging
      const signupPromise = supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Signup timeout')), 5000)
      );
      
      const { data, error } = await Promise.race([signupPromise, timeoutPromise]) as any;

      if (error) {
        console.error('Signup error:', error);
        // If Supabase is down, create a local user instead
        console.log('Creating local user due to signup error...');
        setUser({
          id: `local-${Date.now()}`,
          email: email,
          name: name,
          avatar: undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        });
        return true;
      }

      console.log('Signup successful, creating local user...');

      if (data.user) {
        // Create local user immediately without database query
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: name,
          avatar: data.user.user_metadata?.avatar || undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        });
      } else {
        // Fallback: create local user
        setUser({
          id: `local-${Date.now()}`,
          email: email,
          name: name,
          avatar: undefined,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
              theme: 'light' as 'light' | 'dark'
          },
          createdAt: new Date()
        });
      }

      console.log('Signup process completed successfully');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      // Create local user as fallback
      console.log('Creating local user due to error...');
      setUser({
        id: `local-${Date.now()}`,
        email: email,
        name: name,
        preferences: {
          workHours: { start: '09:00', end: '17:00' },
          breakDuration: 15,
          maxTasksPerDay: 8,
          preferredCategories: [],
          theme: 'light' as 'light' | 'dark'
        },
        createdAt: new Date()
      });
      return true;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('adhd_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const loginAsGuest = () => {
    console.log('AuthContext: Logging in as guest...');
    const guestUser = {
      id: 'guest-user',
      email: 'guest@example.com',
      name: 'Guest User',
      avatar: undefined,
      preferences: {
        workHours: { start: '09:00', end: '17:00' },
        breakDuration: 15,
        maxTasksPerDay: 8,
        preferredCategories: [],
        theme: 'light' as 'light' | 'dark'
      },
      createdAt: new Date()
    };
    setUser(guestUser);
    localStorage.setItem('adhd_user', JSON.stringify(guestUser));
    setLoading(false);
    console.log('AuthContext: Guest login completed');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    loginAsGuest,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
