import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://kekjvetbrhosumdxapgj.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtla2p2ZXRicmhvc3VtZHhhcGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTQ0MDEsImV4cCI6MjA3Mzg3MDQwMX0.t9b0PDyhv-JVxmyCy5svVHXGDfvkNNALVDugz5VoCHE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          updated_at?: string;
        };
      };
      habits: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string;
          difficulty: string;
          target_days: number;
          current_streak: number;
          longest_streak: number;
          total_days_completed: number;
          icon: string;
          color: string;
          reminder_time: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: string;
          difficulty: string;
          target_days: number;
          current_streak?: number;
          longest_streak?: number;
          total_days_completed?: number;
          icon: string;
          color: string;
          reminder_time?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          difficulty?: string;
          target_days?: number;
          current_streak?: number;
          longest_streak?: number;
          total_days_completed?: number;
          icon?: string;
          color?: string;
          reminder_time?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      habit_entries: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          date: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          date: string;
          completed: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          habit_id?: string;
          user_id?: string;
          date?: string;
          completed?: boolean;
        };
      };
      skills: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string;
          difficulty: string;
          target_hours: number;
          current_hours: number;
          icon: string;
          color: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: string;
          difficulty: string;
          target_hours: number;
          current_hours?: number;
          icon: string;
          color: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          difficulty?: string;
          target_hours?: number;
          current_hours?: number;
          icon?: string;
          color?: string;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      skill_sessions: {
        Row: {
          id: string;
          skill_id: string;
          user_id: string;
          duration: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          skill_id: string;
          user_id: string;
          duration: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          skill_id?: string;
          user_id?: string;
          duration?: number;
          date?: string;
        };
      };
    };
  };
}
