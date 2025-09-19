export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  workHours: {
    start: string;
    end: string;
  };
  breakDuration: number; // in minutes
  maxTasksPerDay: number;
  preferredCategories: ActivityCategory[];
  backgroundImage?: string;
  theme: 'light' | 'dark';
}

export interface ActivityCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'goal' | 'regular' | 'singular';
  category: string;
  estimatedDuration: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal extends Task {
  type: 'goal';
  targetDate: Date;
  frequency: {
    daysPerWeek: number;
    hoursPerDay: number;
  };
  progress: number; // 0-100
  checkIns: CheckIn[];
}

export interface RegularTask extends Task {
  type: 'regular';
  frequency: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  preferredTime?: string;
}

export interface CheckIn {
  id: string;
  goalId: string;
  date: Date;
  feedback: string;
  difficulty: 'too_easy' | 'just_right' | 'too_hard';
  adjustments?: string;
  progress: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: string;
  source: 'local' | 'google' | 'outlook' | 'apple';
  externalId?: string;
}

export interface ActivityData {
  date: string;
  category: string;
  duration: number; // in hours
  intensity: number; // 0-1 for opacity
}

export interface DashboardStats {
  tasksCompleted: number;
  tasksTotal: number;
  goalsProgress: number;
  streak: number;
  weeklyHours: ActivityData[];
}
