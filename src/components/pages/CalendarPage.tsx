import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useHabitSkill } from '../../contexts/HabitSkillContext';
import CalendarWidget from '../CalendarWidget';
import CalendarIntegration from '../CalendarIntegration';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'habit' | 'skill' | 'event';
  color: string;
  completed?: boolean;
  duration?: number; // in minutes
}

const CalendarPage: React.FC = () => {
  const { backgroundColor, highlightColor } = useTheme();
  const { habits, skills } = useHabitSkill();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'event' as 'habit' | 'skill' | 'event',
    duration: 60,
  });

  // Generate calendar events from habits and skills
  useEffect(() => {
    const generateEvents = () => {
      const calendarEvents: CalendarEvent[] = [];
      
      // Add habit events
      habits.forEach(habit => {
        if (habit.isActive) {
          calendarEvents.push({
            id: `habit-${habit.id}`,
            title: habit.title,
            date: new Date(),
            type: 'habit',
            color: habit.color,
            completed: false,
            duration: 30, // Default 30 minutes for habits
          });
        }
      });

      // Add skill events
      skills.forEach(skill => {
        if (skill.isActive) {
          calendarEvents.push({
            id: `skill-${skill.id}`,
            title: skill.title,
            date: new Date(),
            type: 'skill',
            color: skill.color,
            completed: false,
            duration: 60, // Default 60 minutes for skills
          });
        }
      });

      setEvents(calendarEvents);
    };

    generateEvents();
  }, [habits, skills]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim()) {
      const event: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: newEvent.title,
        date: selectedDate,
        type: newEvent.type,
        color: newEvent.type === 'habit' ? '#10b981' : newEvent.type === 'skill' ? '#3b82f6' : '#8b5cf6',
        completed: false,
        duration: newEvent.duration,
      };
      
      setEvents(prev => [...prev, event]);
      setNewEvent({ title: '', type: 'event', duration: 60 });
      setAddEventOpen(false);
    }
  };

  const toggleEventCompletion = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, completed: !event.completed }
          : event
      )
    );
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
            Calendar
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7 }}>
            Manage your habits, skills, and events
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setAddEventOpen(true)}
            sx={{
              backgroundColor: highlightColor,
              color: 'white',
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: highlightColor,
                opacity: 0.9,
              },
            }}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Top Row - Calendar Integration and Widget */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Calendar Integration */}
          <Box sx={{ flex: { xs: 1, md: '0 0 33%' } }}>
            <CalendarIntegration />
          </Box>

          {/* Calendar Widget */}
          <Box sx={{ flex: { xs: 1, md: '0 0 67%' } }}>
            <CalendarWidget tasks={events} />
          </Box>
        </Box>

        {/* Main Calendar View */}
        <Box>
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Calendar Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handlePreviousMonth} sx={{ color: '#64748b' }}>
                    <ChevronLeft size={20} />
                  </IconButton>
                  <IconButton onClick={handleNextMonth} sx={{ color: '#64748b' }}>
                    <ChevronRight size={20} />
                  </IconButton>
                </Box>
              </Box>

              {/* Calendar Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <Typography
                    key={day}
                    variant="body2"
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      color: '#64748b',
                      py: 2
                    }}
                  >
                    {day}
                  </Typography>
                ))}

                {/* Calendar days */}
                {days.map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isToday = day && day.toDateString() === new Date().toDateString();
                  const isSelected = day && day.toDateString() === selectedDate.toDateString();

                  return (
                    <Box
                      key={index}
                      sx={{
                        minHeight: '100px',
                        p: 1,
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: day ? 'pointer' : 'default',
                        backgroundColor: isSelected ? '#f0f9ff' : isToday ? '#fef3c7' : 'transparent',
                        '&:hover': day ? { backgroundColor: '#f8fafc' } : {},
                      }}
                      onClick={() => day && setSelectedDate(day)}
                    >
                      {day && (
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: isToday ? 'bold' : 'normal',
                              color: isToday ? '#f59e0b' : '#FFFFFF',
                              mb: 1,
                            }}
                          >
                            {day.getDate()}
                          </Typography>
                          
                          {/* Events for this day */}
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {dayEvents.slice(0, 3).map(event => (
                              <Chip
                                key={event.id}
                                label={event.title}
                                size="small"
                                sx={{
                                  backgroundColor: event.color,
                                  color: 'white',
                                  fontSize: '0.7rem',
                                  height: '20px',
                                  '& .MuiChip-label': {
                                    px: 1,
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleEventCompletion(event.id);
                                }}
                                icon={event.completed ? <CheckCircle size={12} /> : undefined}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                +{dayEvents.length - 3} more
                              </Typography>
                            )}
                          </Box>
                        </>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Add Event Dialog */}
      <Dialog
        open={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Add New Event
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              fullWidth
              variant="outlined"
            />
            
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                label="Event Type"
              >
                <MenuItem value="event">General Event</MenuItem>
                <MenuItem value="habit">Habit</MenuItem>
                <MenuItem value="skill">Skill Practice</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Duration (minutes)"
              type="number"
              value={newEvent.duration}
              onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
              fullWidth
              variant="outlined"
            />

            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Selected Date: {selectedDate.toLocaleDateString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddEventOpen(false)}
            sx={{ color: '#64748b' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddEvent}
            variant="contained"
            sx={{
              backgroundColor: highlightColor,
              color: 'white',
              '&:hover': {
                backgroundColor: highlightColor,
                opacity: 0.9,
              },
            }}
          >
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
