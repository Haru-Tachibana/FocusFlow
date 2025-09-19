import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, Tooltip } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import { useHabitSkill } from '../contexts/HabitSkillContext';

interface ActivityData {
  date: string;
  count: number;
  habits: number;
  skills: number;
}

const ActivityOverview: React.FC = () => {
  const { backgroundColor, highlightColor } = useTheme();
  const { habitEntries, skillSessions } = useHabitSkill();

  // Generate activity data for the past year
  const activityData = useMemo(() => {
    const data: ActivityData[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    // Generate all dates in the past year
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      // Count habit completions for this date
      const habitCount = habitEntries.filter(
        entry => entry.date === dateStr && entry.completed
      ).length;

      // Count skill sessions for this date
      const skillCount = skillSessions.filter(
        session => session.date === dateStr
      ).length;

      const totalCount = habitCount + skillCount;

      data.push({
        date: dateStr,
        count: totalCount,
        habits: habitCount,
        skills: skillCount,
      });
    }

    return data;
  }, [habitEntries, skillSessions]);

  // Get the maximum activity count for normalization
  const maxActivity = Math.max(...activityData.map(d => d.count), 1);

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const grid: React.ReactElement[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    // Group data by weeks
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayData = activityData.find(data => data.date === dateStr) || {
        date: dateStr,
        count: 0,
        habits: 0,
        skills: 0,
      };
      
      currentWeek.push(dayData);
      
      // Start new week on Sunday
      if (d.getDay() === 0 || d.getDate() === today.getDate()) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Generate grid
    weeks.forEach((week, weekIndex) => {
      week.forEach((dayData, dayIndex) => {
        const date = new Date(dayData.date);
        const isToday = date.toDateString() === today.toDateString();
        const isFuture = date > today;
        
        // Calculate opacity based on activity count
        const opacity = dayData.count > 0 ? Math.min(0.2 + (dayData.count / maxActivity) * 0.8, 1) : 0.1;
        
        // Determine color based on activity type
        let color = '#ebedf0'; // Default gray
        if (dayData.count > 0) {
          if (dayData.habits > 0 && dayData.skills > 0) {
            color = highlightColor; // Both habits and skills
          } else if (dayData.habits > 0) {
            color = '#10B981'; // Only habits (green)
          } else if (dayData.skills > 0) {
            color = '#3B82F6'; // Only skills (blue)
          }
        }

        grid.push(
          <Tooltip
            key={`${weekIndex}-${dayIndex}`}
            title={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {dayData.habits} habit{dayData.habits !== 1 ? 's' : ''} completed
                </Typography>
                <Typography variant="body2">
                  {dayData.skills} skill session{dayData.skills !== 1 ? 's' : ''}
                </Typography>
              </Box>
            }
            arrow
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: isFuture ? '#f6f8fa' : color,
                borderRadius: '3px',
                opacity: isFuture ? 0.3 : opacity,
                border: isToday ? `2px solid ${highlightColor}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  opacity: 1,
                },
              }}
            />
          </Tooltip>
        );
      });
    });

    return grid;
  };

  // Calculate statistics
  const activeDays = activityData.filter(d => d.count > 0).length;
  const totalHabits = activityData.reduce((sum, d) => sum + d.habits, 0);
  const totalSkills = activityData.reduce((sum, d) => sum + d.skills, 0);

  return (
    <Card
      sx={{
        backgroundColor: backgroundColor,
        color: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Activity Overview
          </Typography>
        </Box>

        {/* Calendar Grid */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3,
            overflowX: 'auto',
          }}
        >
          {/* Month labels */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1, ml: 2 }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
              // Calculate approximate position for each month
              const monthWidth = 53 * 16 / 12; // Total grid width divided by 12 months
              return (
                <Typography
                  key={month}
                  variant="caption"
                  sx={{
                    color: '#6c7c91',
                    fontSize: '0.75rem',
                    minWidth: `${monthWidth}px`,
                    textAlign: 'left',
                  }}
                >
                  {month}
                </Typography>
              );
            })}
          </Box>

          {/* Activity grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(53, 16px)',
              gap: '2px',
              justifyContent: 'flex-start',
            }}
          >
            {generateCalendarGrid()}
          </Box>
        </Box>

        {/* Statistics */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: highlightColor }}>
              {activeDays}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Active days
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10B981' }}>
              {totalHabits}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Habits completed
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3B82F6' }}>
              {totalSkills}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Skill sessions
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ color: '#6c7c91', mr: 1 }}>
            Less
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2, 3, 4].map((level) => (
              <Box
                key={level}
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: level === 0 ? '#ebedf0' : highlightColor,
                  borderRadius: '3px',
                  opacity: level === 0 ? 0.1 : 0.2 + (level / 4) * 0.8,
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: '#6c7c91', ml: 1 }}>
            More
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityOverview;
