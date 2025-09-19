import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit, HabitEntry } from '../types/habits';
import { Skill, SkillSession } from '../types/skills';
import { demoHabits, demoSkills, demoHabitEntries, demoSkillSessions } from '../data/demoData';

interface HabitSkillContextType {
  // Habits
  habits: Habit[];
  habitEntries: HabitEntry[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitEntry: (habitId: string, date: string) => void;
  getHabitProgress: (habitId: string) => number;
  
  // Skills
  skills: Skill[];
  skillSessions: SkillSession[];
  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addSkillSession: (session: Omit<SkillSession, 'id' | 'createdAt'>) => void;
  getSkillProgress: (skillId: string) => number;
  
  // Stats
  getTodayStats: () => {
    habitsCompleted: number;
    totalHabits: number;
    skillsTimeSpent: number;
    totalSkills: number;
    weeklyProgress: number;
  };
  
  // Demo Data
  importDemoData: () => void;
  clearAllData: () => void;
}

const HabitSkillContext = createContext<HabitSkillContextType | undefined>(undefined);

export const useHabitSkill = () => {
  const context = useContext(HabitSkillContext);
  if (context === undefined) {
    throw new Error('useHabitSkill must be used within a HabitSkillProvider');
  }
  return context;
};

interface HabitSkillProviderProps {
  children: ReactNode;
}

export const HabitSkillProvider: React.FC<HabitSkillProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitEntries, setHabitEntries] = useState<HabitEntry[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillSessions, setSkillSessions] = useState<SkillSession[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('adhd_habits');
    const savedHabitEntries = localStorage.getItem('adhd_habit_entries');
    const savedSkills = localStorage.getItem('adhd_skills');
    const savedSkillSessions = localStorage.getItem('adhd_skill_sessions');

    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedHabitEntries) setHabitEntries(JSON.parse(savedHabitEntries));
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedSkillSessions) setSkillSessions(JSON.parse(savedSkillSessions));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adhd_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('adhd_habit_entries', JSON.stringify(habitEntries));
  }, [habitEntries]);

  useEffect(() => {
    localStorage.setItem('adhd_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('adhd_skill_sessions', JSON.stringify(skillSessions));
  }, [skillSessions]);

  // Habit functions
  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id 
        ? { ...habit, ...updates, updatedAt: new Date() }
        : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setHabitEntries(prev => prev.filter(entry => entry.habitId !== id));
  };

  const toggleHabitEntry = (habitId: string, date: string) => {
    const existingEntry = habitEntries.find(
      entry => entry.habitId === habitId && entry.date === date
    );

    if (existingEntry) {
      setHabitEntries(prev => prev.filter(entry => entry.id !== existingEntry.id));
    } else {
      const newEntry: HabitEntry = {
        id: Date.now().toString(),
        habitId,
        date,
        completed: true,
        createdAt: new Date(),
      };
      setHabitEntries(prev => [...prev, newEntry]);
    }
  };

  const getHabitProgress = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;
    return Math.min((habit.totalDaysCompleted / habit.targetDays) * 100, 100);
  };

  // Skill functions
  const addSkill = (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id 
        ? { ...skill, ...updates, updatedAt: new Date() }
        : skill
    ));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
    setSkillSessions(prev => prev.filter(session => session.skillId !== id));
  };

  const addSkillSession = (sessionData: Omit<SkillSession, 'id' | 'createdAt'>) => {
    const newSession: SkillSession = {
      ...sessionData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setSkillSessions(prev => [...prev, newSession]);
    
    // Update skill's current hours
    const skill = skills.find(s => s.id === sessionData.skillId);
    if (skill) {
      updateSkill(sessionData.skillId, {
        currentHours: skill.currentHours + (sessionData.duration / 60)
      });
    }
  };

  const getSkillProgress = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return 0;
    return Math.min((skill.currentHours / skill.targetHours) * 100, 100);
  };

  // Stats functions
  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const activeHabits = habits.filter(h => h.isActive);
    const completedToday = habitEntries.filter(
      entry => entry.date === today && entry.completed
    ).length;
    
    const todaySessions = skillSessions.filter(session => session.date === today);
    const timeSpentToday = todaySessions.reduce((total, session) => total + session.duration, 0) / 60;
    
    // Calculate weekly progress (simplified)
    const weeklyProgress = Math.floor(Math.random() * 50) + 10; // Random between 10-60%
    
    return {
      habitsCompleted: completedToday,
      totalHabits: activeHabits.length,
      skillsTimeSpent: timeSpentToday,
      totalSkills: skills.filter(s => s.isActive).length,
      weeklyProgress,
    };
  };

  // Demo data functions
  const importDemoData = () => {
    // Import demo habits
    const newHabits: Habit[] = demoHabits.map(habit => ({
      ...habit,
      id: `demo-habit-${Date.now()}-${Math.random()}`,
      userId: 'demo-user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    // Import demo skills
    const newSkills: Skill[] = demoSkills.map(skill => ({
      ...skill,
      id: `demo-skill-${Date.now()}-${Math.random()}`,
      userId: 'demo-user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    // Import demo habit entries
    const newHabitEntries: HabitEntry[] = demoHabitEntries.map(entry => ({
      ...entry,
      id: `demo-entry-${Date.now()}-${Math.random()}`,
      userId: 'demo-user',
      createdAt: new Date(),
    }));
    
    // Import demo skill sessions
    const newSkillSessions: SkillSession[] = demoSkillSessions.map(session => ({
      ...session,
      id: `demo-session-${Date.now()}-${Math.random()}`,
      userId: 'demo-user',
      createdAt: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      focusLevel: 3,
    }));
    
    setHabits(prev => [...prev, ...newHabits]);
    setSkills(prev => [...prev, ...newSkills]);
    setHabitEntries(prev => [...prev, ...newHabitEntries]);
    setSkillSessions(prev => [...prev, ...newSkillSessions]);
  };

  const clearAllData = () => {
    setHabits([]);
    setSkills([]);
    setHabitEntries([]);
    setSkillSessions([]);
  };

  const value = {
    habits,
    habitEntries,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitEntry,
    getHabitProgress,
    skills,
    skillSessions,
    addSkill,
    updateSkill,
    deleteSkill,
    addSkillSession,
    getSkillProgress,
    getTodayStats,
    importDemoData,
    clearAllData,
  };

  return (
    <HabitSkillContext.Provider value={value}>
      {children}
    </HabitSkillContext.Provider>
  );
};
