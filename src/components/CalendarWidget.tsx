import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  Pause,
  Square,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import { Task } from '../types';

interface CalendarWidgetProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ tasks, onTaskUpdate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get tasks for current date
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    return taskDate.toDateString() === currentDate.toDateString();
  });

  // Get upcoming tasks (next 7 days)
  const upcomingTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return taskDate >= today && taskDate <= nextWeek && !task.completed;
  }).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentHour = () => {
    return currentTime.getHours();
  };

  const getCurrentMinute = () => {
    return currentTime.getMinutes();
  };

  const getTimePosition = () => {
    const hour = getCurrentHour();
    const minute = getCurrentMinute();
    return (hour * 60 + minute) * 0.8; // 0.8px per minute
  };

  const handleClockIn = (taskId: string) => {
    if (activeTask === taskId) {
      // Clock out
      setActiveTask(null);
      setStartTime(null);
    } else {
      // Clock in
      setActiveTask(taskId);
      setStartTime(new Date());
    }
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    return Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60); // minutes
  };

  const getTaskProgress = (task: Task) => {
    if (activeTask === task.id) {
      const elapsed = getElapsedTime();
      return Math.min((elapsed / task.estimatedDuration) * 100, 100);
    }
    return task.completed ? 100 : 0;
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '100%' }}>
      {/* Slim Time Bar */}
      <GlassmorphismCard sx={{ width: 200, minHeight: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
              sx={{ color: 'white', p: 0.5 }}
            >
              <ChevronLeft size={16} />
            </IconButton>
            <IconButton
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
              sx={{ color: 'white', p: 0.5 }}
            >
              <ChevronRight size={16} />
            </IconButton>
          </Box>
        </Box>

        {/* Slim Time Grid */}
        <Box sx={{ position: 'relative', height: 350, overflow: 'hidden' }}>
          {/* Current Time Line */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: getTimePosition() * 0.5, // Scale down for slim view
              height: 2,
              backgroundColor: '#FF6B6B',
              zIndex: 10,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: -4,
                top: -3,
                width: 8,
                height: 8,
                backgroundColor: '#FF6B6B',
                borderRadius: '50%',
              },
            }}
          />

          {/* Hour Lines - Slim Version */}
          {hours.filter((_, i) => i % 2 === 0).map((hour) => (
            <Box
              key={hour}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: hour * 14.5, // 14.5px per hour for slim view
                height: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.6rem',
                  marginLeft: 0.5,
                }}
              >
                {hour === 0 ? '12A' : hour < 12 ? `${hour}A` : hour === 12 ? '12P' : `${hour - 12}P`}
              </Typography>
            </Box>
          ))}

          {/* Tasks - Slim Version */}
          {todayTasks.slice(0, 3).map((task, index) => {
            const startHour = 9; // Default start time
            const progress = getTaskProgress(task);
            
            return (
              <Box
                key={task.id}
                sx={{
                  position: 'absolute',
                  left: 40,
                  right: 10,
                  top: startHour * 14.5 + index * 30,
                  height: 25,
                  backgroundColor: activeTask === task.id ? 'rgba(50, 205, 50, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 0.5,
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.7rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {task.title}
                </Typography>
                
                <IconButton
                  size="small"
                  onClick={() => handleClockIn(task.id)}
                  sx={{
                    color: activeTask === task.id ? '#FF6B6B' : '#32CD32',
                    p: 0.25,
                  }}
                >
                  {activeTask === task.id ? <Square size={12} /> : <Play size={12} />}
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </GlassmorphismCard>

      {/* Upcoming Tasks */}
      <GlassmorphismCard>
        <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
          Upcoming Tasks
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {upcomingTasks.slice(0, 5).map((task) => (
            <Box
              key={task.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <Clock color="#808080" size={16} />
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '0.9rem',
                  flex: 1,
                }}
              >
                {task.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {new Date(task.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          ))}
          {upcomingTasks.length === 0 && (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', py: 2 }}>
              No upcoming tasks
            </Typography>
          )}
        </Box>
      </GlassmorphismCard>

      {/* Active Task Timer */}
      {activeTask && (
        <GlassmorphismCard>
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Currently Working On
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ color: 'white', flex: 1 }}>
              {tasks.find(t => t.id === activeTask)?.title}
            </Typography>
            <Typography sx={{ color: '#32CD32', fontWeight: 'bold' }}>
              {Math.floor(getElapsedTime() / 60)}h {getElapsedTime() % 60}m
            </Typography>
            <IconButton
              onClick={() => handleClockIn(activeTask)}
              sx={{ color: '#FF6B6B' }}
            >
              <Square size={20} />
            </IconButton>
          </Box>
        </GlassmorphismCard>
      )}
    </Box>
  );
};

export default CalendarWidget;
