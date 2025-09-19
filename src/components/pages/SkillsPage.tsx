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
import { Plus, Clock, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useHabitSkill } from '../../contexts/HabitSkillContext';
import AddSkillDialog from '../AddSkillDialog';

const SkillsPage: React.FC = () => {
  const { backgroundColor } = useTheme();
  const { skills, getSkillProgress, startSkillSession, stopSkillSession, isSessionActive, getSessionTime, getSkillSessionHistory } = useHabitSkill();
  const [addSkillOpen, setAddSkillOpen] = useState(false);

  const activeSkills = skills.filter(s => s.isActive);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
            My Skills
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7 }}>
            Master new skills with focused practice
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setAddSkillOpen(true)}
          sx={{
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '12px',
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#3b82f6',
              opacity: 0.9,
            },
          }}
        >
          Add Skill
        </Button>
      </Box>

      {/* Skills Grid */}
      {activeSkills.length === 0 ? (
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
            <Clock size={64} color="#b2b9c4" style={{ margin: '0 auto 24px', opacity: 0.5 }} />
            <Typography variant="h5" sx={{ color: '#FFFFFF', mb: 2 }}>
              No skills yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7, mb: 3 }}>
              Start learning something new today!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setAddSkillOpen(true)}
              sx={{
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Start Learning
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fit, minmax(350px, 1fr))' }, gap: 3 }}>
          {activeSkills.map((skill) => (
            <Card
              key={skill.id}
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
                        backgroundColor: skill.color,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, color: '#262626' }}>
                        {skill.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#262626' }}>
                        {skill.currentHours.toFixed(1)}h / {skill.targetHours}h
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" sx={{ color: '#262626' }}>
                    <MoreVertical size={16}  />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#262626' }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#262626' }}>
                      {Math.round(getSkillProgress(skill.id))}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getSkillProgress(skill.id)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: skill.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>

                {/* Session History Bar */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#262626', mb: 1 }}>
                    Recent Sessions
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'end', height: 40 }}>
                    {(() => {
                      const history = getSkillSessionHistory(skill.id);
                      const last7Days = history.slice(-7); // Show last 7 days
                      const maxDuration = Math.max(...last7Days.map(h => h.duration), 1);
                      
                      return last7Days.map((session, index) => (
                        <Box
                          key={session.date}
                          sx={{
                            flex: 1,
                            height: `${Math.max((session.duration / maxDuration) * 100, 10)}%`,
                            backgroundColor: skill.color,
                            borderRadius: '2px',
                            opacity: 0.7,
                            position: 'relative',
                            minHeight: '4px',
                          }}
                          title={`${new Date(session.date).toLocaleDateString()}: ${session.duration} min`}
                        />
                      ));
                    })()}
                    {getSkillSessionHistory(skill.id).length === 0 && (
                      <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '12px' }}>
                        No sessions yet
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#262626' }}>
                    {skill.difficulty} level
                  </Typography>
                  <Chip
                    label={skill.difficulty}
                    size="small"
                    sx={{
                      backgroundColor: skill.color,
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    if (isSessionActive(skill.id)) {
                      stopSkillSession(skill.id);
                    } else {
                      startSkillSession(skill.id);
                    }
                  }}
                  sx={{
                    borderColor: skill.color,
                    color: skill.color,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: skill.color,
                      color: 'white',
                    },
                  }}
                >
                  {isSessionActive(skill.id) 
                    ? `Stop Session (${Math.floor(getSessionTime(skill.id) / 60)}:${(getSessionTime(skill.id) % 60).toString().padStart(2, '0')})`
                    : 'Start Practice Session'
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Add Skill Dialog */}
      <AddSkillDialog
        open={addSkillOpen}
        onClose={() => setAddSkillOpen(false)}
      />
    </Box>
  );
};

export default SkillsPage;
