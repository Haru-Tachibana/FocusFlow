import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Alert,
  LinearProgress,
} from '@mui/material';
import { Target, CheckCircle, AlertTriangle, ThumbsUp } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import { Goal, CheckIn } from '../types';

interface GoalCheckInProps {
  goal: Goal;
  onUpdate: (goalId: string, checkIn: CheckIn) => void;
}

const GoalCheckIn: React.FC<GoalCheckInProps> = ({ goal, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState<'too_easy' | 'just_right' | 'too_hard'>('just_right');
  const [adjustments, setAdjustments] = useState('');
  const [progress, setProgress] = useState(goal.progress);

  const handleSubmit = () => {
    const checkIn: CheckIn = {
      id: Date.now().toString(),
      goalId: goal.id,
      date: new Date(),
      feedback,
      difficulty,
      adjustments,
      progress,
    };

    onUpdate(goal.id, checkIn);
    setOpen(false);
    setFeedback('');
    setAdjustments('');
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'too_easy':
        return <ThumbsUp color="#32CD32" size={20} />;
      case 'too_hard':
        return <AlertTriangle color="#FF9800" size={20} />;
      default:
        return <CheckCircle color="#808080" size={20} />;
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'too_easy':
        return 'Too Easy - Increase intensity';
      case 'too_hard':
        return 'Too Hard - Need to adjust';
      default:
        return 'Just Right - Keep going!';
    }
  };

  return (
    <>
      <GlassmorphismCard
        sx={{
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Target color="#32CD32" size={32} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              {goal.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
              Weekly Check-in Available
            </Typography>
            <LinearProgress
              variant="determinate"
              value={goal.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#32CD32',
                },
              }}
            />
            <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
              {goal.progress}% Complete
            </Typography>
          </Box>
        </Box>
      </GlassmorphismCard>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Weekly Check-in: {goal.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Progress Update */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Progress Update: {progress}%
              </Typography>
              <Slider
                value={progress}
                onChange={(_, value) => setProgress(value as number)}
                min={0}
                max={100}
                step={5}
                sx={{
                  color: '#32CD32',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#32CD32',
                  },
                }}
              />
            </Box>

            {/* Difficulty Assessment */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                How was this week?
              </Typography>
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Difficulty Level
                </InputLabel>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  <MenuItem value="too_easy">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ThumbsUp color="#32CD32" size={20} />
                      Too Easy - Increase intensity
                    </Box>
                  </MenuItem>
                  <MenuItem value="just_right">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle color="#808080" size={20} />
                      Just Right - Keep going!
                    </Box>
                  </MenuItem>
                  <MenuItem value="too_hard">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AlertTriangle color="#FF9800" size={20} />
                      Too Hard - Need to adjust
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Feedback */}
            <TextField
              fullWidth
              label="How did this week go? Any challenges or wins?"
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            {/* Adjustments */}
            <TextField
              fullWidth
              label="Any adjustments you'd like to make for next week?"
              multiline
              rows={3}
              value={adjustments}
              onChange={(e) => setAdjustments(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />

            {/* Summary */}
            <Alert 
              severity="info" 
              sx={{ 
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                '& .MuiAlert-icon': {
                  color: '#2196F3',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getDifficultyIcon()}
                <Typography sx={{ color: 'white' }}>
                  {getDifficultyText()}
                </Typography>
              </Box>
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
            }}
          >
            Submit Check-in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalCheckIn;
