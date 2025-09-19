import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { X, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useHabitSkill } from '../contexts/HabitSkillContext';

interface AddHabitDialogProps {
  open: boolean;
  onClose: () => void;
}

const habitCategories = [
  { id: 'health', name: 'Health', color: '#ef4444', icon: 'H' },
  { id: 'productivity', name: 'Productivity', color: '#3b82f6', icon: 'P' },
  { id: 'learning', name: 'Learning', color: '#10b981', icon: 'L' },
  { id: 'social', name: 'Social', color: '#f59e0b', icon: 'S' },
  { id: 'mindfulness', name: 'Mindfulness', color: '#8b5cf6', icon: 'M' },
  { id: 'other', name: 'Other', color: '#6b7280', icon: 'O' },
];

const difficultyLevels = [
  { id: 'easy', name: 'Easy', description: 'Takes 1-5 minutes daily' },
  { id: 'medium', name: 'Medium', description: 'Takes 5-30 minutes daily' },
  { id: 'hard', name: 'Hard', description: 'Takes 30+ minutes daily' },
];

const AddHabitDialog: React.FC<AddHabitDialogProps> = ({ open, onClose }) => {
  const { backgroundColor, highlightColor } = useTheme();
  const { addHabit } = useHabitSkill();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'health' as const,
    difficulty: 'easy' as const,
    reminderTime: '',
    targetDays: 21,
  });

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    const selectedCategory = habitCategories.find(cat => cat.id === formData.category);
    
    addHabit({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      targetDays: formData.targetDays,
      currentStreak: 0,
      longestStreak: 0,
      totalDaysCompleted: 0,
      startDate: new Date(),
      targetDate: new Date(Date.now() + formData.targetDays * 24 * 60 * 60 * 1000),
      isActive: true,
      difficulty: formData.difficulty,
      reminderTime: formData.reminderTime || undefined,
      color: selectedCategory?.color || '#6b7280',
      icon: selectedCategory?.icon || '⭐',
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'health',
      difficulty: 'easy',
      reminderTime: '',
      targetDays: 21,
    });

    onClose();
  };

  const selectedCategory = habitCategories.find(cat => cat.id === formData.category);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: backgroundColor,
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <DialogTitle sx={{ color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Target size={24} color={highlightColor} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Create New Habit
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <X size={20} color="#262626" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title */}
          <TextField
            fullWidth
            label="Habit Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Drink 8 glasses of water"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: highlightColor,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
            }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Why is this habit important to you?"
            multiline
            rows={2}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: highlightColor,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
            }}
          />

          {/* Category */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#FFFFFF' }}>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: backgroundColor,
                    color: '#FFFFFF',
                    zIndex: 9999,
                    '& .MuiMenuItem-root': {
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                  },
                },
              }}
            >
              {habitCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{category.icon}</span>
                    <Typography>{category.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Difficulty */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#FFFFFF' }}>Difficulty</InputLabel>
            <Select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: backgroundColor,
                    color: '#FFFFFF',
                    zIndex: 9999,
                    '& .MuiMenuItem-root': {
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                  },
                },
              }}
            >
              {difficultyLevels.map((level) => (
                <MenuItem key={level.id} value={level.id}>
                  <Box>
                    <Typography>{level.name}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {level.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Target Days */}
          <TextField
            fullWidth
            label="Target Days"
            type="number"
            value={formData.targetDays}
            onChange={(e) => setFormData({ ...formData, targetDays: parseInt(e.target.value) || 21 })}
            inputProps={{ min: 1, max: 365 }}
            helperText="How many days do you want to build this habit? (21 days is recommended)"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: highlightColor,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
              '& .MuiFormHelperText-root': {
                color: '#FFFFFF',
                opacity: 0.7,
              },
            }}
          />

          {/* Reminder Time */}
          <TextField
            fullWidth
            label="Reminder Time (Optional)"
            type="time"
            value={formData.reminderTime}
            onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
            helperText="Set a daily reminder for this habit"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: highlightColor,
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FFFFFF',
              },
              '& .MuiFormHelperText-root': {
                color: '#FFFFFF',
                opacity: 0.7,
              },
            }}
          />

          {/* Preview */}
          {formData.title && (
            <Box
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="body2" sx={{ color: '#FFFFFF', opacity: 0.7, mb: 1 }}>
                Preview:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: selectedCategory?.color || '#6b7280',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  {selectedCategory?.icon || '⭐'}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
                    {formData.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FFFFFF', opacity: 0.7 }}>
                    {formData.targetDays} days • {difficultyLevels.find(d => d.id === formData.difficulty)?.name}
                  </Typography>
                </Box>
                <Chip
                  label="0%"
                  size="small"
                  sx={{
                    backgroundColor: highlightColor,
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
                    color: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.title.trim()}
          sx={{
            backgroundColor: highlightColor,
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: highlightColor,
              opacity: 0.9,
            },
            '&:disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Create Habit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHabitDialog;
