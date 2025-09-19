import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
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
  Plus,
} from 'lucide-react';
import Sidebar from './Sidebar';
import Tutorial from './Tutorial';
import Footer from './Footer';
import WidgetGrid from './WidgetGrid';
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
  const [activeWidget, setActiveWidget] = useState<string | null>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'singular' as 'goal' | 'regular' | 'singular',
    category: 'work',
    estimatedDuration: 60,
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  // Load user data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('adhd_tasks');
    const savedGoals = localStorage.getItem('adhd_goals');
    const savedActivityData = localStorage.getItem('adhd_activity_data');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    if (savedActivityData) {
      setActivityData(JSON.parse(savedActivityData));
    }
  }, []);

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
      const newGoals = [...goals, goal];
      setGoals(newGoals);
      localStorage.setItem('adhd_goals', JSON.stringify(newGoals));
    } else {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      localStorage.setItem('adhd_tasks', JSON.stringify(newTasks));
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
    if (widgetId === 'add-task') {
      setAddTaskOpen(true);
    } else if (widgetId === 'all') {
      setActiveWidget('all');
    } else {
      setActiveWidget(widgetId);
    }
  };

  const handleCloseWidget = () => {
    setActiveWidget(null);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('adhd_tasks', JSON.stringify(updatedTasks));
  };

  const handleRewardEarned = (reward: any) => {
    // This will be called when a reward is earned
    console.log('Reward earned:', reward);
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
        paddingLeft: 28, // Add space for narrow sidebar
        width: '100%',
        boxSizing: 'border-box',
        marginLeft: 0, // Will be adjusted by sidebar
        display: 'flex',
        flexDirection: 'column',
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

      {/* Widget Grid */}
      <WidgetGrid
        tasks={tasks}
        goals={goals}
        activityData={activityData}
        categories={categories}
        onTaskUpdate={handleTaskUpdate}
        onGoalCheckIn={handleGoalCheckIn}
        onBackgroundChange={handleBackgroundChange}
        onRewardEarned={handleRewardEarned}
        user={user}
      />

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
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32CD32',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#32CD32',
                },
              },
            }}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Type</InputLabel>
            <Select
              value={newTask.type}
              onChange={(e) => setNewTask({ ...newTask, type: e.target.value as any })}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 9999,
                  },
                },
              }}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#32CD32',
                },
              }}
            >
              <MenuItem value="singular" sx={{ color: 'white' }}>One-time Task</MenuItem>
              <MenuItem value="regular" sx={{ color: 'white' }}>Regular Task</MenuItem>
              <MenuItem value="goal" sx={{ color: 'white' }}>Goal</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
            <Select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    zIndex: 9999,
                  },
                },
              }}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#32CD32',
                },
              }}
            >
              {Object.entries(categories).map(([key, category]) => (
                <MenuItem key={key} value={key} sx={{ color: 'white' }}>{category.name}</MenuItem>
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
