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
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
} from '@mui/material';
import { Plus, X, Palette } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import { ActivityCategory } from '../types';

interface TaskPreferencesProps {
  onSave: (preferences: any) => void;
}

const TaskPreferences: React.FC<TaskPreferencesProps> = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    workHours: { start: '09:00', end: '17:00' },
    breakDuration: 15,
    maxTasksPerDay: 8,
    autoSchedule: true,
    reminderInterval: 30,
  });
  const [categories, setCategories] = useState<ActivityCategory[]>([
    { id: '1', name: 'Work', color: '#32CD32', icon: 'briefcase' },
    { id: '2', name: 'Study', color: '#808080', icon: 'book' },
    { id: '3', name: 'Exercise', color: '#FFFFFF', icon: 'dumbbell' },
    { id: '4', name: 'Rest', color: '#A9A9A9', icon: 'moon' },
    { id: '5', name: 'Social', color: '#90EE90', icon: 'users' },
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#666666' });

  const colorOptions = [
    '#32CD32', '#808080', '#FFFFFF', '#A9A9A9', '#90EE90',
    '#F5F5F5', '#D3D3D3', '#C0C0C0', '#696969', '#2F4F4F',
    '#228B22', '#006400', '#9ACD32', '#ADFF2F', '#7FFF00',
  ];

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: ActivityCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        color: newCategory.color,
        icon: 'circle',
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', color: '#666666' });
    }
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleSave = () => {
    onSave({ ...preferences, categories });
    setOpen(false);
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
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Palette color="white" size={20} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              Task Preferences
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Customize your task management settings
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
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Task Preferences & Categories
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Work Hours */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Work Hours
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={preferences.workHours.start}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    workHours: { ...preferences.workHours, start: e.target.value }
                  })}
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
                <Typography sx={{ color: 'white' }}>to</Typography>
                <TextField
                  label="End Time"
                  type="time"
                  value={preferences.workHours.end}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    workHours: { ...preferences.workHours, end: e.target.value }
                  })}
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
              </Box>
            </Box>

            {/* Break Duration */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Break Duration: {preferences.breakDuration} minutes
              </Typography>
              <Slider
                value={preferences.breakDuration}
                onChange={(_, value) => setPreferences({
                  ...preferences,
                  breakDuration: value as number
                })}
                min={5}
                max={60}
                step={5}
                sx={{
                  color: '#32CD32',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#32CD32',
                  },
                }}
              />
            </Box>

            {/* Max Tasks Per Day */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Maximum Tasks Per Day: {preferences.maxTasksPerDay}
              </Typography>
              <Slider
                value={preferences.maxTasksPerDay}
                onChange={(_, value) => setPreferences({
                  ...preferences,
                  maxTasksPerDay: value as number
                })}
                min={1}
                max={20}
                step={1}
                sx={{
                  color: '#32CD32',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#32CD32',
                  },
                }}
              />
            </Box>

            {/* Auto Schedule */}
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.autoSchedule}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    autoSchedule: e.target.checked
                  })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#32CD32',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#32CD32',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: 'white' }}>
                  Auto-schedule tasks based on preferences
                </Typography>
              }
            />

            {/* Categories */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Activity Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    onDelete={() => handleRemoveCategory(category.id)}
                    deleteIcon={<X size={16} />}
                    sx={{
                      backgroundColor: category.color,
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  label="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  size="small"
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {colorOptions.map((color) => (
                    <Box
                      key={color}
                      onClick={() => setNewCategory({ ...newCategory, color })}
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        backgroundColor: color,
                        cursor: 'pointer',
                        border: newCategory.color === color ? '2px solid white' : 'none',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  onClick={handleAddCategory}
                  size="small"
                  sx={{
                    backgroundColor: '#32CD32',
                    '&:hover': {
                      backgroundColor: '#228B22',
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
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
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
            }}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskPreferences;
