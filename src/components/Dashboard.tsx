import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  Settings,
  Plus,
  Target,
  CheckCircle,
  Clock,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import ProgressRing from './ProgressRing';
import ActivityGrid from './ActivityGrid';
import CalendarIntegration from './CalendarIntegration';
import TaskPreferences from './TaskPreferences';
import GoalCheckIn from './GoalCheckIn';
import BackgroundCustomization from './BackgroundCustomization';
import Sidebar from './Sidebar';
import Tutorial from './Tutorial';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Task, Goal, ActivityData, CheckIn } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { isDyslexiaMode, toggleDyslexiaMode } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: { color: string; name: string } }>({
    work: { color: '#32CD32', name: 'Work' },
    study: { color: '#808080', name: 'Study' },
    exercise: { color: '#FFFFFF', name: 'Exercise' },
    rest: { color: '#A9A9A9', name: 'Rest' },
    social: { color: '#90EE90', name: 'Social' },
  });
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'singular' as 'goal' | 'regular' | 'singular',
    category: 'work',
    estimatedDuration: 60,
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  // Generate sample data
  useEffect(() => {
    const sampleTasks: Task[] = [
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
    ];

    const sampleGoals: Goal[] = [
      {
        id: '1',
        title: 'Learn React',
        type: 'goal',
        category: 'study',
        estimatedDuration: 60,
        priority: 'high',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        frequency: { daysPerWeek: 5, hoursPerDay: 1 },
        progress: 35,
        checkIns: [],
      },
    ];

    const sampleActivityData: ActivityData[] = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const categoryKeys = Object.keys(categories);
      const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
      const duration = Math.random() * 8;
      
      sampleActivityData.push({
        date: date.toISOString().split('T')[0],
        category: randomCategory,
        duration: Math.round(duration * 10) / 10,
        intensity: Math.min(1, duration / 8),
      });
    }

    setTasks(sampleTasks);
    setGoals(sampleGoals);
    setActivityData(sampleActivityData);
  }, [categories]);

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      type: newTask.type,
      category: newTask.category,
      estimatedDuration: newTask.estimatedDuration,
      priority: newTask.priority,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (newTask.type === 'goal') {
      const goal: Goal = {
        ...task,
        type: 'goal',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        frequency: { daysPerWeek: 5, hoursPerDay: 1 },
        progress: 0,
        checkIns: [],
      };
      setGoals([...goals, goal]);
    } else {
      setTasks([...tasks, task]);
    }

    setNewTask({
      title: '',
      type: 'singular',
      category: 'work',
      estimatedDuration: 60,
      priority: 'medium',
    });
    setAddTaskOpen(false);
  };

  const handleGoalCheckIn = (goalId: string, checkIn: CheckIn) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              progress: checkIn.progress,
              checkIns: [...goal.checkIns, checkIn],
            }
          : goal
      )
    );
  };

  const handleBackgroundChange = (background: string) => {
    // Update user preferences with new background
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          backgroundImage: background,
        },
      };
      localStorage.setItem('adhd_user', JSON.stringify(updatedUser));
    }
  };

  const handleOpenWidget = (widgetId: string) => {
    setActiveWidget(widgetId);
    if (widgetId === 'add-task') {
      setAddTaskOpen(true);
    }
  };

  const handleCloseWidget = () => {
    setActiveWidget(null);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const goalsProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: user?.preferences.backgroundImage 
          ? `url(${user.preferences.backgroundImage})` 
          : 'linear-gradient(135deg, #1a1a1a 0%, #32CD32 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: 2,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
          Welcome back, {user?.name}!
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setTutorialOpen(true)}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Tutorial
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setAddTaskOpen(true)}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: 3,
        width: '100%',
        maxWidth: '100%',
        padding: 0,
        margin: 0,
      }}>
        {/* Progress Rings */}
        <Box>
          <GlassmorphismCard>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Today's Progress
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
              <ProgressRing
                progress={overallProgress}
                label={`${completedTasks}/${totalTasks}`}
                subtitle="Tasks"
                color="#32CD32"
              />
              <ProgressRing
                progress={goalsProgress}
                label={`${Math.round(goalsProgress)}%`}
                subtitle="Goals"
                color="#808080"
              />
            </Box>
          </GlassmorphismCard>
        </Box>

        {/* Quick Stats */}
        <Box>
          <GlassmorphismCard>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle color="#32CD32" size={24} />
                <Typography sx={{ color: 'white' }}>
                  {completedTasks} tasks completed today
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Target color="#808080" size={24} />
                <Typography sx={{ color: 'white' }}>
                  {goals.length} active goals
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Clock color="#FFFFFF" size={24} />
                <Typography sx={{ color: 'white' }}>
                  {Math.round(tasks.reduce((sum, task) => sum + task.estimatedDuration, 0) / 60)}h planned
                </Typography>
              </Box>
            </Box>
          </GlassmorphismCard>
        </Box>

        {/* Calendar Integration */}
        {activeWidget === 'calendar' && (
          <Box>
            <CalendarIntegration />
          </Box>
        )}

        {/* Task Preferences */}
        {activeWidget === 'preferences' && (
          <Box>
            <TaskPreferences onSave={(prefs) => console.log('Preferences saved:', prefs)} />
          </Box>
        )}

        {/* Background Customization */}
        {activeWidget === 'background' && (
          <Box>
            <BackgroundCustomization
              currentBackground={user?.preferences.backgroundImage}
              onBackgroundChange={handleBackgroundChange}
            />
          </Box>
        )}

        {/* Activity Grid - Full Width */}
        {activeWidget === 'activity' && (
          <Box sx={{ gridColumn: '1 / -1' }}>
            <GlassmorphismCard>
              <ActivityGrid data={activityData} categories={categories} />
            </GlassmorphismCard>
          </Box>
        )}

        {/* Recent Tasks */}
        <Box>
          <GlassmorphismCard>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
              Recent Tasks
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {tasks.slice(0, 5).map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: 1,
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <CheckCircle
                    color={task.completed ? '#32CD32' : '#666'}
                    size={20}
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      opacity: task.completed ? 0.7 : 1,
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Chip
                    label={categories[task.category]?.name || task.category}
                    size="small"
                    sx={{
                      backgroundColor: categories[task.category]?.color || '#666',
                      color: task.category === 'exercise' ? '#000000' : 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </GlassmorphismCard>
        </Box>

        {/* Goals Progress */}
        {activeWidget === 'goals' && (
          <Box>
            <GlassmorphismCard>
              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                Goals Progress
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {goals.map((goal) => (
                  <GoalCheckIn
                    key={goal.id}
                    goal={goal}
                    onUpdate={handleGoalCheckIn}
                  />
                ))}
              </Box>
            </GlassmorphismCard>
          </Box>
        )}
      </Box>

      {/* Sidebar */}
      <Sidebar
        onOpenWidget={handleOpenWidget}
        onToggleDyslexiaFont={toggleDyslexiaMode}
        isDyslexiaMode={isDyslexiaMode}
      />

      {/* Tutorial */}
      <Tutorial
        open={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
      />

      {/* Footer */}
      <Footer />

      {/* Add Task Dialog */}
      <Dialog
        open={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Type</InputLabel>
            <Select
              value={newTask.type}
              onChange={(e) => setNewTask({ ...newTask, type: e.target.value as any })}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <MenuItem value="singular">One-time Task</MenuItem>
              <MenuItem value="regular">Regular Task</MenuItem>
              <MenuItem value="goal">Goal</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
            <Select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              {Object.entries(categories).map(([key, category]) => (
                <MenuItem key={key} value={key}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Duration (minutes)"
            type="number"
            value={newTask.estimatedDuration}
            onChange={(e) => setNewTask({ ...newTask, estimatedDuration: parseInt(e.target.value) || 0 })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddTaskOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
