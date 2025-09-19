export interface Skill {
  id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'language' | 'music' | 'sports' | 'art' | 'business' | 'other';
  targetHours: number; // Usually 20 for skills
  currentHours: number;
  startDate: Date;
  targetDate: Date;
  isActive: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: string[]; // URLs, books, courses
  milestones: SkillMilestone[];
  color: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillMilestone {
  id: string;
  skillId: string;
  title: string;
  description: string;
  targetHours: number;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface SkillSession {
  id: string;
  skillId: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  duration: number; // in minutes
  notes?: string;
  focusLevel: 1 | 2 | 3 | 4 | 5; // 1 = distracted, 5 = deep focus
  createdAt: Date;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}
