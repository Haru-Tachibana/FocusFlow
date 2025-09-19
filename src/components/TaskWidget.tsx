import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Clock, Play, Square, Plus, CheckCircle } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  timeSpent: number; // in minutes
  isActive: boolean;
}

interface TaskWidgetProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

const TaskWidget: React.FC<TaskWidgetProps> = ({ tasks, onTaskUpdate, onAddTask }) => {
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'work',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });

  const handleClockIn = (taskId: string) => {
    onTaskUpdate({
      ...tasks.find(t => t.id === taskId)!,
      isActive: true,
    });
  };

  const handleClockOut = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)!;
    onTaskUpdate({
      ...task,
      isActive: false,
      timeSpent: task.timeSpent + 1, // Add 1 minute for demo
    });
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAddTask({
        ...newTask,
        completed: false,
        timeSpent: 0,
        isActive: false,
      });
      setNewTask({ title: '', category: 'work', priority: 'medium' });
      setAddTaskOpen(false);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)!;
    onTaskUpdate({
      ...task,
      completed: !task.completed,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFA726';
      case 'low': return '#66BB6A';
      default: return '#90A4AE';
    }
  };

  const activeTask = tasks.find(t => t.isActive);
  const todayTasks = tasks.filter(t => !t.completed);

  return (
    <GlassmorphismCard sx={{ height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Today's Tasks
        </Typography>
        <IconButton
          onClick={() => setAddTaskOpen(true)}
          sx={{ color: 'white' }}
          size="small"
        >
          <Plus size={16} />
        </IconButton>
      </Box>

      {/* Active Task Timer */}
      {activeTask && (
        <Box sx={{ 
          mb: 2, 
          p: 2, 
          backgroundColor: 'rgba(50, 205, 50, 0.2)',
          borderRadius: 1,
          border: '1px solid rgba(50, 205, 50, 0.3)',
        }}>
          <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
            Currently Working On:
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
            {activeTask.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={16} color="white" />
            <Typography variant="body2" sx={{ color: 'white' }}>
              {Math.floor(activeTask.timeSpent / 60)}h {activeTask.timeSpent % 60}m
            </Typography>
            <IconButton
              onClick={() => handleClockOut(activeTask.id)}
              sx={{ color: 'white', ml: 'auto' }}
              size="small"
            >
              <Square size={16} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Task List */}
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {todayTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              mb: 1,
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'white',
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Chip
                    label={task.priority}
                    size="small"
                    sx={{
                      backgroundColor: getPriorityColor(task.priority),
                      color: 'white',
                      fontSize: '0.6rem',
                      height: 20,
                    }}
                  />
                </Box>
              }
              secondary={
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {task.category} • {Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {!task.completed && !task.isActive && (
                  <IconButton
                    onClick={() => handleClockIn(task.id)}
                    sx={{ color: 'white' }}
                    size="small"
                  >
                    <Play size={16} />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => handleToggleComplete(task.id)}
                  sx={{ color: task.completed ? '#4CAF50' : 'white' }}
                  size="small"
                >
                  <CheckCircle size={16} />
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Add Task Dialog */}
      <Dialog open={addTaskOpen} onClose={() => setAddTaskOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                label="Category"
              >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="learning">Learning</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddTaskOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained">Add Task</Button>
        </DialogActions>
      </Dialog>
    </GlassmorphismCard>
  );
};

export default TaskWidget;
