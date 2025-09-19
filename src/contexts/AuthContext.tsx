import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';

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
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
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
                theme: 'light'
              },
              createdAt: new Date(userData.created_at)
            });
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
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
              theme: 'light'
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
      
      // Create a fresh Supabase client to avoid any state issues
      const freshClient = createClient(
        'https://kekjvetbrhosumdxapgj.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2p2ZXRicmhvc3VtZHhhcGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTQ0MDEsImV4cCI6MjA3Mzg3MDQwMX0.t9b0PDyhv-JVxmyCy5svVHXGDfvkNNALVDugz5VoCHE'
      );
      
      // Add timeout to prevent hanging
      const loginPromise = freshClient.auth.signInWithPassword({
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
        return false;
      }

      console.log('AuthContext: Login successful, user:', data.user?.id);

      if (data.user) {
        console.log('AuthContext: Creating/updating user profile...');
        
        // Add timeout for profile creation to prevent hanging
        const profilePromise = freshClient
          .from('users')
          .upsert({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || email.split('@')[0],
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        const profileTimeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Profile creation timeout')), 3000)
        );

        try {
          const { data: userData, error: userError } = await Promise.race([profilePromise, profileTimeoutPromise]) as any;

          if (userError) {
            console.error('User profile error:', userError);
            // Don't return false, just create a local user object
            console.log('AuthContext: Creating local user object instead...');
            setUser({
              id: data.user.id,
              email: data.user.email!,
              name: data.user.user_metadata?.name || email.split('@')[0],
              preferences: {
                workHours: { start: '09:00', end: '17:00' },
                breakDuration: 15,
                maxTasksPerDay: 8,
                preferredCategories: [],
                theme: 'light'
              },
              createdAt: new Date()
            });
            return true;
          }

          console.log('AuthContext: User profile created/updated:', userData);
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            preferences: {
              workHours: { start: '09:00', end: '17:00' },
              breakDuration: 15,
              maxTasksPerDay: 8,
              preferredCategories: [],
              theme: 'light'
            },
            createdAt: new Date(userData.created_at)
          });
        } catch (profileErr) {
          console.error('Profile creation timeout or error:', profileErr);
          // Create local user object as fallback
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || email.split('@')[0],
            preferences: {
              workHours: { start: '09:00', end: '17:00' },
              breakDuration: 15,
              maxTasksPerDay: 8,
              preferredCategories: [],
              theme: 'light'
            },
            createdAt: new Date()
          });
        }
      }

      console.log('AuthContext: Login process completed successfully');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Starting signup for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        return false;
      }

      console.log('Signup successful, creating user profile...');

      if (data.user) {
        // Create user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (userError) {
          console.error('User profile creation error:', userError);
          // Don't return false here, the user is still created in auth
          // We'll create a local user object instead
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: name,
            preferences: {
              workHours: { start: '09:00', end: '17:00' },
              breakDuration: 15,
              maxTasksPerDay: 8,
              preferredCategories: [],
              theme: 'light'
            },
            createdAt: new Date()
          });
          return true;
        }

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          preferences: {
            workHours: { start: '09:00', end: '17:00' },
            breakDuration: 15,
            maxTasksPerDay: 8,
            preferredCategories: [],
            theme: 'light'
          },
          createdAt: new Date(userData.created_at)
        });
      }

      console.log('Signup process completed successfully');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const loginAsGuest = () => {
    console.log('AuthContext: Logging in as guest...');
    setUser({
      id: 'guest-user',
      email: 'guest@example.com',
      name: 'Guest User',
      preferences: {
        workHours: { start: '09:00', end: '17:00' },
        breakDuration: 15,
        maxTasksPerDay: 8,
        preferredCategories: [],
        theme: 'light'
      },
      createdAt: new Date()
    });
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
