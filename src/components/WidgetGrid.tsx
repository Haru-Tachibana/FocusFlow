import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Settings,
  GripVertical,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import ProgressRing from './ProgressRing';
// Import components that will be used in future widget implementations
// import ActivityGrid from './ActivityGrid';
// import CalendarWidget from './CalendarWidget';
// import RewardPool from './RewardPool';
// import BackgroundCustomization from './BackgroundCustomization';
// import CalendarIntegration from './CalendarIntegration';
// import TaskPreferences from './TaskPreferences';
// import GoalCheckIn from './GoalCheckIn';

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
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);


  // Create all widgets with proper contrast colors
  const createMinimalWidgets = (tasks: any[], goals: any[], activityData: any[], categories: any): Widget[] => [
    {
      id: 'progress',
      title: "Today's Progress",
      component: () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = Math.max(tasks.length, 1);
        const tasksProgress = (completedTasks / totalTasks) * 100;
        const goalsProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0;
        
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
            <ProgressRing
              progress={tasksProgress}
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
        );
      },
      size: 'medium',
      position: { x: 0, y: 0 },
      visible: true,
      color: '#32CD32',
    },
    {
      id: 'goals-overview',
      title: 'Goals Overview',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2 }}>
            Total Goals: {goals.length}
          </Typography>
          <Typography sx={{ color: 'white', mb: 2 }}>
            Average Progress: {goals.length > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0}%
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Activity Data: {activityData.length} entries
          </Typography>
        </Box>
      ),
      size: 'medium',
      position: { x: 1, y: 0 },
      visible: true,
      color: '#FF6B6B',
    },
    {
      id: 'calendar',
      title: 'Daily Calendar',
      component: () => (
        <Box sx={{ p: 2, height: '100%' }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Today's Schedule
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
              No tasks scheduled
            </Typography>
          </Box>
        </Box>
      ),
      size: 'small',
      position: { x: 2, y: 0 },
      visible: true,
      color: '#4A90E2',
    },
    {
      id: 'activity',
      title: 'Activity Overview',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            This Week's Activity
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
            {Array.from({ length: 7 }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '4px',
                }}
              />
            ))}
          </Box>
        </Box>
      ),
      size: 'medium',
      position: { x: 0, y: 1 },
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
          <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
            Complete goals to earn rewards!
          </Typography>
        </Box>
      ),
      size: 'small',
      position: { x: 1, y: 1 },
      visible: true,
      color: '#E67E22',
    },
    {
      id: 'preferences',
      title: 'Task Preferences',
      component: () => (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Quick Settings
          </Typography>
          <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
            Customize your experience
          </Typography>
        </Box>
      ),
      size: 'small',
      position: { x: 2, y: 1 },
      visible: true,
      color: '#27AE60',
    },
  ];

  useEffect(() => {
    // Always create fresh widgets
    const minimalWidgets = createMinimalWidgets(tasks, goals, activityData, categories);
    setWidgets(minimalWidgets);
  }, [tasks, goals, activityData, categories, onTaskUpdate, onGoalCheckIn, onBackgroundChange, onRewardEarned, user]);

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedWidget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 300);
    const y = Math.floor((e.clientY - rect.top) / 200);

    setWidgets(prev => {
      const updated = prev.map(widget =>
        widget.id === draggedWidget
          ? { ...widget, position: { x, y } }
          : widget
      );
      localStorage.setItem('adhd_widgets', JSON.stringify(updated));
      return updated;
    });

    setDraggedWidget(null);
  };

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(prev => {
      const updated = prev.map(widget =>
        widget.id === widgetId
          ? { ...widget, visible: !widget.visible }
          : widget
      );
      localStorage.setItem('adhd_widgets', JSON.stringify(updated));
      return updated;
    });
  };

  const getWidgetSize = (size: string) => {
    switch (size) {
      case 'small': return { width: 300, height: 200 };
      case 'medium': return { width: 600, height: 200 };
      case 'large': return { width: 900, height: 200 };
      case 'full': return { width: '100%', height: 300 };
      default: return { width: 300, height: 200 };
    }
  };

  // Filter widgets based on activeWidget selection
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
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Settings Button */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setSettingsOpen(true)}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <Settings size={24} />
        </IconButton>
      </Box>

      {/* Widgets */}
      {visibleWidgets.map((widget) => {
        const size = getWidgetSize(widget.size);
        
        return (
          <Box
            key={widget.id}
            draggable
            onDragStart={(e) => handleDragStart(e, widget.id)}
            sx={{
              width: size.width,
              height: size.height,
              cursor: 'move',
              '&:hover': {
                '& .drag-handle': {
                  opacity: 1,
                },
              },
            }}
          >
            <GlassmorphismCard sx={{ height: '100%', position: 'relative' }}>
              {/* Drag Handle */}
              <Box
                className="drag-handle"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 10,
                }}
              >
                <GripVertical color="rgba(255, 255, 255, 0.7)" size={16} />
              </Box>

              {/* Widget Title */}
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  mb: 2,
                  fontWeight: 'bold',
                  pr: 3,
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

      {/* Widget Settings Dialog */}
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
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  <Typography sx={{ color: 'white' }}>
                    {widget.title}
                  </Typography>
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
                  sx={{ m: 0 }}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSettingsOpen(false)}
            sx={{ color: 'white' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WidgetGrid;