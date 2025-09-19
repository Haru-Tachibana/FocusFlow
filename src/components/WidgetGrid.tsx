import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';
import GlassmorphismCard from './GlassmorphismCard';
import ProgressRing from './ProgressRing';
import ActivityGrid from './ActivityGrid';
import CalendarWidget from './CalendarWidget';
import RewardPool from './RewardPool';
import TaskPreferences from './TaskPreferences';
import TaskWidget from './TaskWidget';
import DailyScheduleWidget from './DailyScheduleWidget';

interface Widget {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  props?: any;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
  visible: boolean;
  color: string;
}

interface WidgetGridProps {
  tasks: any[];
  goals: any[];
  activityData: any[];
  categories: any;
  onTaskUpdate: (taskId: string, updates: any) => void;
  onGoalCheckIn: (goalId: string, checkIn: any) => void;
  onBackgroundChange: (background: string) => void;
  onRewardEarned: (reward: any) => void;
  user: any;
  activeWidget?: string | null;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({
  tasks,
  goals,
  activityData,
  categories,
  onTaskUpdate,
  onGoalCheckIn,
  onBackgroundChange,
  onRewardEarned,
  user,
  activeWidget,
}) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Create all widgets with proper contrast colors
  const createMinimalWidgets = (tasks: any[], goals: any[], activityData: any[], categories: any): Widget[] => [
    {
      id: 'progress',
      title: "Today's Progress",
      component: () => (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <ProgressRing
            progress={tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}
            size={120}
            strokeWidth={8}
            color="#32CD32"
          />
          <Typography sx={{ color: 'white', mt: 2, fontWeight: 'bold' }}>
            {tasks.filter(t => t.completed).length}/{tasks.length} Tasks
          </Typography>
        </Box>
      ),
      size: 'medium',
      position: { x: 0, y: 0 },
      visible: true,
      color: '#32CD32',
    },
    {
      id: 'tasks',
      title: "Today's Tasks",
      component: () => (
        <TaskWidget
          tasks={tasks}
          onTaskUpdate={(task) => onTaskUpdate(task.id, task)}
          onAddTask={(newTask) => {
            const id = Date.now().toString();
            onTaskUpdate(id, { ...newTask, id });
          }}
        />
      ),
      size: 'large',
      position: { x: 1, y: 0 },
      visible: true,
      color: '#4A90E2',
    },
    {
      id: 'schedule',
      title: 'Daily Schedule',
      component: () => (
        <DailyScheduleWidget
          schedule={[
            { id: '1', title: 'Morning Workout', time: '08:00', duration: 60, category: 'health', color: '#7ED321' },
            { id: '2', title: 'Team Meeting', time: '10:00', duration: 30, category: 'work', color: '#4A90E2' },
            { id: '3', title: 'Lunch Break', time: '12:00', duration: 60, category: 'personal', color: '#F5A623' },
            { id: '4', title: 'Project Review', time: '14:00', duration: 90, category: 'work', color: '#4A90E2' },
            { id: '5', title: 'Learning Session', time: '16:00', duration: 45, category: 'learning', color: '#9013FE' },
          ]}
        />
      ),
      size: 'large',
      position: { x: 0, y: 1 },
      visible: true,
      color: '#7ED321',
    },
    {
      id: 'goals',
      title: 'Goals Overview',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Goals Progress
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {goals.map((goal, index) => (
              <Box key={index} sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                p: 1.5,
              }}>
                <Typography sx={{ color: 'white', fontSize: '0.9rem', mb: 1 }}>
                  {goal.title}
                </Typography>
                <Box sx={{ 
                  width: '100%',
                  height: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <Box sx={{
                    width: `${goal.progress || 0}%`,
                    height: '100%',
                    backgroundColor: '#32CD32',
                    transition: 'width 0.3s ease',
                  }} />
                </Box>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', mt: 0.5 }}>
                  {goal.progress || 0}% Complete
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ),
      size: 'medium',
      position: { x: 1, y: 1 },
      visible: true,
      color: '#FF6B6B',
    },
    {
      id: 'activity',
      title: 'Activity Overview',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            This Week's Activity
          </Typography>
          <ActivityGrid data={activityData} categories={categories} />
        </Box>
      ),
      size: 'medium',
      position: { x: 2, y: 0 },
      visible: true,
      color: '#9B59B6',
    },
    {
      id: 'rewards',
      title: 'Reward Pool',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Available Rewards
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
            Complete goals to earn rewards!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#E67E22',
                color: 'white',
                '&:hover': { backgroundColor: '#D35400' },
              }}
            >
              View Rewards
            </Button>
          </Box>
        </Box>
      ),
      size: 'small',
      position: { x: 2, y: 1 },
      visible: true,
      color: '#E67E22',
    },
  ];

  useEffect(() => {
    // Always create fresh widgets
    const minimalWidgets = createMinimalWidgets(tasks, goals, activityData, categories);
    setWidgets(minimalWidgets);
  }, [tasks, goals, activityData, categories, onTaskUpdate, onGoalCheckIn, onBackgroundChange, onRewardEarned, user]);

  const getWidgetSize = (size: string) => {
    switch (size) {
      case 'small':
        return { width: 300, height: 200 };
      case 'medium':
        return { width: 300, height: 300 };
      case 'large':
        return { width: 600, height: 300 };
      case 'full':
        return { width: '100%', height: 400 };
      default:
        return { width: 300, height: 200 };
    }
  };

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(prev => {
      const updated = prev.map(widget =>
        widget.id === widgetId
          ? { ...widget, visible: !widget.visible }
          : widget
      );
      return updated;
    });
  };

  const visibleWidgets = widgets.filter(widget => {
    if (!activeWidget || activeWidget === 'all') {
      return widget.visible;
    }
    return widget.visible && widget.id === activeWidget;
  });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
        p: 2,
        minHeight: '100vh',
        maxWidth: '100%',
      }}
    >
      {/* Widgets */}
      {visibleWidgets.map((widget) => {
        const size = getWidgetSize(widget.size);
        
        return (
          <Box
            key={widget.id}
            sx={{
              width: size.width,
              height: size.height,
              cursor: 'pointer',
              gridColumn: `span ${size.width === '100%' ? 3 : size.width === 600 ? 2 : 1}`,
              gridRow: `span 1`,
            }}
            onClick={() => {
              // Handle widget click to show popup
              console.log('Widget clicked:', widget.id);
            }}
          >
            <GlassmorphismCard sx={{ height: '100%', position: 'relative' }}>
              {/* Widget Title */}
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  p: 2,
                  pb: 1,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {widget.title}
              </Typography>

              {/* Widget Content */}
              <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
                {React.createElement(widget.component, widget.props || {})}
              </Box>
            </GlassmorphismCard>
          </Box>
        );
      })}

      {/* Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '& .MuiTypography-root': {
              color: '#FFFFFF !important',
            },
            '& .MuiFormControlLabel-root': {
              color: '#FFFFFF !important',
            },
            '& .MuiSwitch-root': {
              color: '#FFFFFF !important',
            },
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>Widget Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {widgets.map((widget) => (
              <Box
                key={widget.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: widget.color,
                    }}
                  />
                  <Typography sx={{ color: 'white' }}>{widget.title}</Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={widget.visible}
                      onChange={() => toggleWidgetVisibility(widget.id)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: widget.color,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: widget.color,
                        },
                      }}
                    />
                  }
                  label=""
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)} sx={{ color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WidgetGrid;