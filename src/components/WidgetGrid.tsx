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
  X,
  GripVertical,
  Eye,
  EyeOff,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import ProgressRing from './ProgressRing';
import ActivityGrid from './ActivityGrid';
import CalendarWidget from './CalendarWidget';
import TaskPreferences from './TaskPreferences';
import BackgroundCustomization from './BackgroundCustomization';
import GoalCheckIn from './GoalCheckIn';
import RewardPool from './RewardPool';
import CalendarIntegration from './CalendarIntegration';

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
}) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const defaultWidgets: Widget[] = [
    {
      id: 'progress',
      title: "Today's Progress",
      component: () => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
          <ProgressRing
            progress={tasks.filter(task => task.completed).length / Math.max(tasks.length, 1) * 100}
            label={`${tasks.filter(task => task.completed).length}/${tasks.length}`}
            subtitle="Tasks"
            color="#32CD32"
          />
          <ProgressRing
            progress={goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0}
            label={`${Math.round(goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0)}%`}
            subtitle="Goals"
            color="#808080"
          />
        </Box>
      ),
      size: 'medium',
      position: { x: 0, y: 0 },
      visible: true,
      color: '#32CD32',
    },
    {
      id: 'calendar',
      title: 'Daily Calendar',
      component: CalendarWidget,
      props: { tasks, onTaskUpdate },
      size: 'large',
      position: { x: 1, y: 0 },
      visible: true,
      color: '#32CD32',
    },
    {
      id: 'activity',
      title: 'Activity Overview',
      component: ActivityGrid,
      props: { data: activityData, categories },
      size: 'full',
      position: { x: 0, y: 1 },
      visible: true,
      color: '#FFFFFF',
    },
    {
      id: 'goals',
      title: 'Goals Progress',
      component: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {goals.map((goal) => (
            <GoalCheckIn
              key={goal.id}
              goal={goal}
              onUpdate={onGoalCheckIn}
            />
          ))}
        </Box>
      ),
      size: 'medium',
      position: { x: 0, y: 2 },
      visible: true,
      color: '#A9A9A9',
    },
    {
      id: 'rewards',
      title: 'Reward Pool',
      component: RewardPool,
      props: { onRewardEarned },
      size: 'small',
      position: { x: 1, y: 2 },
      visible: true,
      color: '#FF6B6B',
    },
    {
      id: 'preferences',
      title: 'Task Preferences',
      component: TaskPreferences,
      props: { onSave: (prefs: any) => console.log('Preferences saved:', prefs) },
      size: 'medium',
      position: { x: 2, y: 0 },
      visible: true,
      color: '#808080',
    },
    {
      id: 'background',
      title: 'Background Customization',
      component: BackgroundCustomization,
      props: { currentBackground: user?.preferences.backgroundImage, onBackgroundChange },
      size: 'medium',
      position: { x: 2, y: 1 },
      visible: true,
      color: '#90EE90',
    },
    {
      id: 'calendar-integration',
      title: 'Calendar Integration',
      component: CalendarIntegration,
      size: 'medium',
      position: { x: 2, y: 2 },
      visible: true,
      color: '#32CD32',
    },
  ];

  useEffect(() => {
    const savedWidgets = localStorage.getItem('adhd_widgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      setWidgets(defaultWidgets);
      localStorage.setItem('adhd_widgets', JSON.stringify(defaultWidgets));
    }
  }, []);

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

  const visibleWidgets = widgets.filter(widget => widget.visible);

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
        const Component = widget.component;
        
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
                <Component {...widget.props} />
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
