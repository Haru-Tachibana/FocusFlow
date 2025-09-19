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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton as MuiIconButton,
} from '@mui/material';
import { X, Clock, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useHabitSkill } from '../contexts/HabitSkillContext';

interface AddSkillDialogProps {
  open: boolean;
  onClose: () => void;
}

const skillCategories = [
  { id: 'programming', name: 'Programming', color: '#3b82f6', icon: 'P' },
  { id: 'design', name: 'Design', color: '#8b5cf6', icon: 'D' },
  { id: 'language', name: 'Language', color: '#10b981', icon: 'L' },
  { id: 'music', name: 'Music', color: '#f59e0b', icon: 'M' },
  { id: 'sports', name: 'Sports', color: '#ef4444', icon: 'S' },
  { id: 'art', name: 'Art', color: '#ec4899', icon: 'A' },
  { id: 'business', name: 'Business', color: '#06b6d4', icon: 'B' },
  { id: 'other', name: 'Other', color: '#6b7280', icon: 'O' },
];

const difficultyLevels = [
  { id: 'beginner', name: 'Beginner', description: 'No prior experience' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience' },
  { id: 'advanced', name: 'Advanced', description: 'Looking to master' },
];

const AddSkillDialog: React.FC<AddSkillDialogProps> = ({ open, onClose }) => {
  const { backgroundColor, highlightColor } = useTheme();
  const { addSkill } = useHabitSkill();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming' as const,
    difficulty: 'beginner' as const,
    targetHours: 20,
    resources: [] as string[],
  });

  const [newResource, setNewResource] = useState('');

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    const selectedCategory = skillCategories.find(cat => cat.id === formData.category);
    
    addSkill({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      targetHours: formData.targetHours,
      currentHours: 0,
      startDate: new Date(),
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days default
      isActive: true,
      difficulty: formData.difficulty,
      resources: formData.resources,
      milestones: [],
      color: selectedCategory?.color || '#6b7280',
      icon: selectedCategory?.icon || '⭐',
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'programming',
      difficulty: 'beginner',
      targetHours: 20,
      resources: [],
    });
    setNewResource('');

    onClose();
  };

  const addResource = () => {
    if (newResource.trim() && !formData.resources.includes(newResource.trim())) {
      setFormData({
        ...formData,
        resources: [...formData.resources, newResource.trim()],
      });
      setNewResource('');
    }
  };

  const removeResource = (index: number) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter((_, i) => i !== index),
    });
  };

  const selectedCategory = skillCategories.find(cat => cat.id === formData.category);

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
          <Clock size={24} color={highlightColor} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Learn New Skill
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
            label="Skill Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Learn React, Play Guitar, Speak Spanish"
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
            placeholder="What do you want to achieve with this skill?"
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
              {skillCategories.map((category) => (
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
            <InputLabel sx={{ color: '#FFFFFF' }}>Difficulty Level</InputLabel>
            <Select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
              sx={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: highlightColor,
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

          {/* Target Hours */}
          <TextField
            fullWidth
            label="Target Hours"
            type="number"
            value={formData.targetHours}
            onChange={(e) => setFormData({ ...formData, targetHours: parseInt(e.target.value) || 20 })}
            inputProps={{ min: 1, max: 1000 }}
            helperText="How many hours do you want to invest? (20 hours is recommended for skill mastery)"
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

          {/* Resources */}
          <Box>
            <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1, fontWeight: 500 }}>
              Learning Resources (Optional)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a resource (URL, book, course, etc.)"
                value={newResource}
                onChange={(e) => setNewResource(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addResource()}
                size="small"
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
              <Button
                onClick={addResource}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: highlightColor,
                  minWidth: 'auto',
                  px: 2,
                }}
              >
                <Plus size={16} />
              </Button>
            </Box>
            
            {formData.resources.length > 0 && (
              <List dense>
                {formData.resources.map((resource, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      mb: 1,
                    }}
                  >
                    <ListItemText
                      primary={resource}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: '#FFFFFF',
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                    <ListItemSecondaryAction>
                      <MuiIconButton
                        edge="end"
                        onClick={() => removeResource(index)}
                        size="small"
                      >
                        <Trash2 size={16} color="#FFFFFF" />
                      </MuiIconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

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
                    0h / {formData.targetHours}h • {difficultyLevels.find(d => d.id === formData.difficulty)?.name}
                  </Typography>
                </Box>
                <Chip
                  label="0%"
                  size="small"
                  sx={{
                    backgroundColor: '#3b82f6',
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
            backgroundColor: '#3b82f6',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              backgroundColor: '#3b82f6',
              opacity: 0.9,
            },
            '&:disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Start Learning
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSkillDialog;
