import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Target,
  Calendar,
  Settings,
  Image,
  BarChart3,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface TutorialProps {
  open: boolean;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to FocusFlow!',
      content: (
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Your ADHD-friendly task management companion
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            FocusFlow is designed specifically for neurodivergent individuals to help manage tasks, 
            track goals, and maintain focus with visual progress tracking and smart scheduling.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Smart task distribution
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Visual progress tracking
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Calendar integration
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Adding Tasks',
      content: (
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Create your first task
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Click the "Add Task" button to create different types of tasks:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                🎯 Goals
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                Long-term objectives with weekly check-ins
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                🔄 Regular Tasks
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                Recurring activities with custom frequency
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                ⚡ One-time Tasks
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                Single occurrence tasks
              </Typography>
            </Paper>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Progress Tracking',
      content: (
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Visual progress indicators
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Track your progress with Apple Watch-style rings and GitHub-style activity grid:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '4px solid #32CD32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 1,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>75%</Typography>
              </Box>
              <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                Progress Rings
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 8px)',
                  gap: '2px',
                  mb: 1,
                }}
              >
                {Array.from({ length: 35 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: i % 7 === 0 ? '#32CD32' : 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </Box>
              <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                Activity Grid
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Customization',
      content: (
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Personalize your experience
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Use the sidebar (right edge) to access customization options:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Settings color="#808080" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Task Preferences - Set work hours and break duration
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image color="#90EE90" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Background Customization - Upload images or choose themes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Calendar color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Calendar Integration - Sync with your existing calendars
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      title: 'You\'re all set!',
      content: (
        <Box>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Ready to boost your productivity! 🚀
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Remember: FocusFlow adapts to your needs. Don't hesitate to adjust settings 
            and explore features as you use the app.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Start with small tasks
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Use weekly check-ins
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="#32CD32" size={20} />
              <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                Customize your workspace
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Getting Started
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <X size={24} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
          {steps.map((step, index) => (
            <Step key={step.title}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                  '& .MuiStepIcon-root': {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-active': {
                      color: '#32CD32',
                    },
                    '&.Mui-completed': {
                      color: '#32CD32',
                    },
                  },
                }}
              >
                {step.title}
              </StepLabel>
              <StepContent>
                <Box sx={{ mt: 2 }}>
                  {step.content}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <ArrowLeft size={16} style={{ marginRight: 8 }} />
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #228B22 30%, #32CD32 90%)',
              },
            }}
          >
            Get Started!
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #228B22 30%, #32CD32 90%)',
              },
            }}
          >
            Next
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Tutorial;
