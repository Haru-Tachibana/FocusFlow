export interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'learning' | 'social' | 'mindfulness' | 'other';
  targetDays: number; // Usually 21 for habits
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  startDate: Date;
  targetDate: Date;
  isActive: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  reminderTime?: string; // e.g., "09:00"
  color: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  createdAt: Date;
}

export interface HabitCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}
