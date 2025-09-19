import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { Plus, Target, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useHabitSkill } from '../../contexts/HabitSkillContext';
import AddHabitDialog from '../AddHabitDialog';

const HabitsPage: React.FC = () => {
  const { backgroundColor, highlightColor } = useTheme();
  const { habits, toggleHabitEntry, getHabitProgress } = useHabitSkill();
  const [addHabitOpen, setAddHabitOpen] = useState(false);

  const activeHabits = habits.filter(h => h.isActive);
  const today = new Date().toISOString().split('T')[0];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
            My Habits
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7 }}>
            Track your daily habits and build consistency
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setAddHabitOpen(true)}
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
          Add Habit
        </Button>
      </Box>

      {/* Habits Grid */}
      {activeHabits.length === 0 ? (
        <Card
          sx={{
            backgroundColor: backgroundColor,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            py: 6,
          }}
        >
          <CardContent>
            <Target size={64} color={highlightColor} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
            <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
              No habits yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7, mb: 3 }}>
              Start building your first habit today!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setAddHabitOpen(true)}
              sx={{
                backgroundColor: highlightColor,
                color: 'white',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Create Your First Habit
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fit, minmax(350px, 1fr))' }, gap: 3 }}>
          {activeHabits.map((habit) => (
            <Card
              key={habit.id}
              sx={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: habit.color,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {habit.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {habit.title}
                      </Typography>
                      <Typography variant="body2">
                        {habit.currentStreak} day streak
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" sx={{ color: '#262626' }}>
                    <MoreVertical size={16}  />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {Math.round(getHabitProgress(habit.id))}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getHabitProgress(habit.id)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: habit.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">
                    {habit.totalDaysCompleted} / {habit.targetDays} days
                  </Typography>
                  <Chip
                    label={habit.difficulty}
                    size="small"
                    sx={{
                      backgroundColor: habit.color,
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => toggleHabitEntry(habit.id, today)}
                  sx={{
                    borderColor: habit.color,
                    color: habit.color,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: habit.color,
                      color: 'white',
                    },
                  }}
                >
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Add Habit Dialog */}
      <AddHabitDialog
        open={addHabitOpen}
        onClose={() => setAddHabitOpen(false)}
      />
    </Box>
  );
};

export default HabitsPage;
