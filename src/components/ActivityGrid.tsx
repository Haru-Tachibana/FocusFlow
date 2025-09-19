import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ActivityData } from '../types';

interface ActivityGridProps {
  data: ActivityData[];
  categories: { [key: string]: { color: string; name: string } };
  year?: number;
}

const GridContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(53, 1fr)',
  gap: '2px',
  padding: '16px',
});

const DayCell = styled(Box)<{ 
  color: string; 
  intensity: number; 
  hasData: boolean;
}>(({ color, intensity, hasData }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '2px',
  backgroundColor: hasData ? color : 'rgba(255, 255, 255, 0.1)',
  opacity: hasData ? Math.max(0.3, intensity) : 0.1,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.2)',
    opacity: hasData ? 1 : 0.3,
  },
}));

const ActivityGrid: React.FC<ActivityGridProps> = ({ 
  data, 
  categories, 
  year = new Date().getFullYear() 
}) => {
  // Generate data for the entire year
  const generateYearData = () => {
    const yearData: { [key: string]: ActivityData } = {};
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Initialize all days
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      yearData[dateStr] = {
        date: dateStr,
        category: 'rest',
        duration: 0,
        intensity: 0
      };
    }
    
    // Fill with actual data
    data.forEach(activity => {
      yearData[activity.date] = activity;
    });
    
    return yearData;
  };

  const yearData = generateYearData();
  const weeks = [];
  
  // Generate month labels
  const monthLabels = [];
  for (let month = 0; month < 12; month++) {
    const monthDate = new Date(year, month, 1);
    const monthName = monthDate.toLocaleDateString('en', { month: 'short' });
    const weekNumber = Math.floor((monthDate.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    monthLabels.push(
      <Box
        key={month}
        sx={{
          position: 'absolute',
          left: `${(weekNumber / 53) * 100}%`,
          top: -25,
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 'bold',
        }}
      >
        {monthName}
      </Box>
    );
  }

  // Generate weeks
  for (let week = 0; week < 53; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(year, 0, 1);
      date.setDate(date.getDate() + (week * 7) + day - date.getDay());
      const dateStr = date.toISOString().split('T')[0];
      const activity = yearData[dateStr];
      
      if (activity && activity.duration > 0) {
        const category = categories[activity.category];
        weekDays.push(
          <Tooltip
            key={dateStr}
            title={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {new Date(dateStr).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {category?.name || activity.category}: {activity.duration}h
                </Typography>
              </Box>
            }
            arrow
          >
            <DayCell
              color={category?.color || '#666'}
              intensity={activity.intensity}
              hasData={true}
            />
          </Tooltip>
        );
      } else {
        weekDays.push(
          <DayCell
            key={dateStr}
            color="#666"
            intensity={0}
            hasData={false}
          />
        );
      }
    }
    weeks.push(
      <Box key={week} sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {weekDays}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}>
        Activity Overview
      </Typography>
      <Box sx={{ position: 'relative', mb: 2 }}>
        {monthLabels}
      </Box>
      <GridContainer>
        {weeks}
      </GridContainer>
      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {Object.entries(categories).map(([key, category]) => (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: category.color,
              }}
            />
            <Typography variant="body2" sx={{ color: 'white' }}>
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityGrid;
