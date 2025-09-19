import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface CalendarWidgetProps {
  tasks?: any[];
  onTaskUpdate?: (taskId: string, updates: any) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ tasks = [], onTaskUpdate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timerActive, setTimerActive] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getTimePosition = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return (hours * 60 + minutes) * 0.8; // Scale for 200px width
  };

  const getCurrentTasks = () => {
    const today = selectedDate.toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task) return false;
      
      // Handle both createdAt and date properties
      const taskDateValue = task.createdAt || task.date;
      if (!taskDateValue) return false;
      
      try {
        const taskDate = new Date(taskDateValue);
        if (isNaN(taskDate.getTime())) return false;
        return taskDate.toISOString().split('T')[0] === today && !task.completed;
      } catch (error) {
        console.warn('Invalid date in task:', taskDateValue);
        return false;
      }
    });
  };

  const handleClockIn = (taskId: string) => {
    setTimerActive(prev => ({ ...prev, [taskId]: true }));
    // Start timer logic here
  };

  const handleClockOut = (taskId: string) => {
    setTimerActive(prev => ({ ...prev, [taskId]: false }));
    // Stop timer and record time here
  };

  const currentTasks = getCurrentTasks();

  return (
    <GlassmorphismCard>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#262626', fontWeight: 'bold' }}>
          Daily Schedule
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
            sx={{ color: '#b2b9c4' }}
          >
            <ChevronLeft size={20} />
          </IconButton>
          <Typography sx={{ color: '#262626', minWidth: '100px', textAlign: 'center' }}>
            {selectedDate.toLocaleDateString()}
          </Typography>
          <IconButton
            onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
            sx={{ color: '#b2b9c4' }}
          >
            <ChevronRight size={20} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', height: '400px', width: '200px' }}>
        {/* Time slots */}
        {Array.from({ length: 24 }, (_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: 0,
              top: i * 16,
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#262626',
                fontSize: '0.7rem',
                marginLeft: 1,
              }}
            >
              {i.toString().padStart(2, '0')}:00
            </Typography>
          </Box>
        ))}

        {/* Current time line */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: getTimePosition(),
            width: '100%',
            height: '2px',
            backgroundColor: '#ff4444',
            zIndex: 10,
          }}
        />

        {/* Tasks */}
        {currentTasks.map((task, index) => (
          <Box
            key={task.id}
            sx={{
              position: 'absolute',
              left: 20,
              top: index * 40 + 10,
              width: '160px',
              height: '30px',
              backgroundColor: 'rgba(50, 205, 50, 0.3)',
              border: '1px solid rgba(50, 205, 50, 0.5)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '0.8rem',
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
              onClick={() => 
                timerActive[task.id] 
                  ? handleClockOut(task.id) 
                  : handleClockIn(task.id)
              }
              sx={{ color: '#b2b9c4', padding: '2px' }}
            >
              {timerActive[task.id] ? <Square size={12} /> : <Play size={12} />}
            </IconButton>
          </Box>
        ))}
      </Box>
    </GlassmorphismCard>
  );
};

export default CalendarWidget;
