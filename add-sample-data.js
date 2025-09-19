// Script to add sample data to localStorage for testing
const sampleTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    type: 'singular',
    category: 'work',
    estimatedDuration: 120,
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Grocery shopping',
    type: 'regular',
    category: 'work',
    estimatedDuration: 45,
    priority: 'medium',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Morning exercise',
    type: 'regular',
    category: 'exercise',
    estimatedDuration: 30,
    priority: 'medium',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Read React documentation',
    type: 'goal',
    category: 'study',
    estimatedDuration: 60,
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

const sampleGoals = [
  {
    id: '4',
    title: 'Read React documentation',
    type: 'goal',
    category: 'study',
    estimatedDuration: 60,
    priority: 'high',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    frequency: { daysPerWeek: 5, hoursPerDay: 1 },
    progress: 35,
    checkIns: [],
  }
];

const sampleActivityData = [];
for (let i = 0; i < 365; i++) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const categories = ['work', 'study', 'exercise', 'rest', 'social'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const duration = Math.random() * 8;
  
  sampleActivityData.push({
    date: date.toISOString().split('T')[0],
    category: randomCategory,
    duration: Math.round(duration * 10) / 10,
    intensity: Math.min(1, duration / 8),
  });
}

// This would be run in the browser console
console.log('Sample data ready to add to localStorage:');
console.log('localStorage.setItem("adhd_tasks", JSON.stringify(sampleTasks));');
console.log('localStorage.setItem("adhd_goals", JSON.stringify(sampleGoals));');
console.log('localStorage.setItem("adhd_activity_data", JSON.stringify(sampleActivityData));');
