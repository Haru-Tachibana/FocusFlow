import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
} from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import BackgroundCustomization from '../BackgroundCustomization';

const SettingsPage: React.FC = () => {
  const { 
    isDyslexiaMode, 
    toggleDyslexiaMode,
    customFont
  } = useTheme();
  
  const [currentBackground, setCurrentBackground] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', opacity: 0.7 }}>
          Customize your FocusFlow experience
        </Typography>
      </Box>

      {/* Settings Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Appearance Settings */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#262626' }}>
              Appearance
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDyslexiaMode}
                    onChange={toggleDyslexiaMode}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={{ fontWeight: 500, color: '#262626' }}>
                      Dyslexia-friendly font
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#262626' }}>
                      Use OpenDyslexic font for better readability
                    </Typography>
                  </Box>
                }
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography sx={{ fontWeight: 500, mb: 1, color: '#262626' }}>
                Current Font: {customFont}
              </Typography>
              <Typography variant="body2" sx={{ color: '#262626' }}>
                Font customization available in theme settings
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Theme Customization */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#262626' }}>
              Theme Customization
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3, color: '#262626' }}>
              Theme customization features coming soon!
            </Typography>
          </CardContent>
        </Card>

        {/* Background Customization */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#262626' }}>
              Background
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3, color: '#262626' }}>
              Upload a custom background image to personalize your experience
            </Typography>
            
            <BackgroundCustomization
              currentBackground={currentBackground}
              onBackgroundChange={setCurrentBackground}
            />
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#262626' }}>
              Account
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, color: '#262626' }}>
                User Profile
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#262626' }}>
                Manage your account settings and preferences
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography sx={{ fontWeight: 500, mb: 1, color: '#262626' }}>
                Data Export
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#262626' }}>
                Export your habits and skills data
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#10b981',
                  color: '#10b981',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#10b981',
                    color: 'white',
                  },
                }}
              >
                Export Data
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* About */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#262626' }}>
              About FocusFlow
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, color: '#262626' }}>
                Version 1.0.0
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#262626' }}>
                A habit and skill tracking app designed for ADHD users
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography sx={{ fontWeight: 500, mb: 1, color: '#262626' }}>
                Support
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#262626' }}>
                Need help? Contact our support team
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#6b7280',
                  color: '#6b7280',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#6b7280',
                    color: 'white',
                  },
                }}
              >
                Contact Support
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default SettingsPage;
