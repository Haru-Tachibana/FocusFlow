import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import GlassmorphismCard from './GlassmorphismCard';
import ProgressRing from './ProgressRing';

interface SimpleWidgetGridProps {
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

const SimpleWidgetGrid: React.FC<SimpleWidgetGridProps> = ({
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
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = Math.max(tasks.length, 1);
  const tasksProgress = (completedTasks / totalTasks) * 100;
  const goalsProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2,
        p: 2,
        minHeight: '100vh',
      }}
    >
      {/* Progress Widget */}
      <Box sx={{ width: 600, height: 200 }}>
        <GlassmorphismCard sx={{ height: '100%', position: 'relative' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            Today's Progress
          </Typography>
          <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
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
          </Box>
        </GlassmorphismCard>
      </Box>

      {/* Tasks Overview Widget */}
      <Box sx={{ width: 300, height: 200 }}>
        <GlassmorphismCard sx={{ height: '100%', position: 'relative' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            Tasks Overview
          </Typography>
          <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: 'white', mb: 2 }}>
                Total Tasks: {tasks.length}
              </Typography>
              <Typography sx={{ color: 'white', mb: 2 }}>
                Completed: {completedTasks}
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Completion Rate: {Math.round(tasksProgress)}%
              </Typography>
            </Box>
          </Box>
        </GlassmorphismCard>
      </Box>

      {/* Goals Overview Widget */}
      <Box sx={{ width: 300, height: 200 }}>
        <GlassmorphismCard sx={{ height: '100%', position: 'relative' }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            Goals Overview
          </Typography>
          <Box sx={{ height: 'calc(100% - 60px)', overflow: 'auto' }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ color: 'white', mb: 2 }}>
                Total Goals: {goals.length}
              </Typography>
              <Typography sx={{ color: 'white', mb: 2 }}>
                Average Progress: {Math.round(goalsProgress)}%
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Activity Data: {activityData.length} entries
              </Typography>
            </Box>
          </Box>
        </GlassmorphismCard>
      </Box>
    </Box>
  );
};

export default SimpleWidgetGrid;
