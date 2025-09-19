import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { Clock, Calendar } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  duration: number; // in minutes
  category: string;
  color: string;
}

interface DailyScheduleWidgetProps {
  schedule: ScheduleItem[];
}

const DailyScheduleWidget: React.FC<DailyScheduleWidgetProps> = ({ schedule }) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60 + minutes) * 0.8; // Scale factor for visual height
  };

  const getCurrentTimePosition = () => {
    return currentTimeInMinutes * 0.8;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      work: '#4A90E2',
      personal: '#7ED321',
      health: '#F5A623',
      learning: '#9013FE',
      meeting: '#FF6B6B',
    };
    return colors[category] || '#90A4AE';
  };

  return (
    <GlassmorphismCard sx={{ height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Calendar size={20} color="white" />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Today's Schedule
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', height: 400, overflow: 'hidden' }}>
        {/* Time Grid */}
        {Array.from({ length: 24 }, (_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: i * 20,
              height: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        ))}

        {/* Current Time Line */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: getCurrentTimePosition(),
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

        {/* Schedule Items */}
        {schedule.map((item, index) => {
          const position = getTimePosition(item.time);
          const height = item.duration * 0.8;
          
          return (
            <Box
              key={item.id}
              sx={{
                position: 'absolute',
                left: 40,
                right: 10,
                top: position,
                height: Math.max(height, 20),
                backgroundColor: getCategoryColor(item.category),
                borderRadius: 1,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                zIndex: 5,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.7rem',
                  }}
                >
                  {item.time} • {item.duration}min
                </Typography>
              </Box>
              <Chip
                label={item.category}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.6rem',
                  height: 16,
                }}
              />
            </Box>
          );
        })}

        {/* Time Labels */}
        {Array.from({ length: 13 }, (_, i) => {
          const hour = i * 2;
          return (
            <Typography
              key={hour}
              variant="caption"
              sx={{
                position: 'absolute',
                left: 0,
                top: i * 40 - 8,
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.7rem',
                width: 35,
                textAlign: 'right',
              }}
            >
              {hour.toString().padStart(2, '0')}:00
            </Typography>
          );
        })}
      </Box>

      {/* Schedule Summary */}
      <Box sx={{ mt: 2, p: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          {schedule.length} events today • Next: {schedule[0]?.title || 'No events'}
        </Typography>
      </Box>
    </GlassmorphismCard>
  );
};

export default DailyScheduleWidget;
