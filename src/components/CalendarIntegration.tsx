import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Calendar,
  Mail,
  Apple,
  CheckCircle,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface CalendarProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

const CalendarIntegration: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState<CalendarProvider[]>([
    {
      id: 'google',
      name: 'Google Calendar',
      icon: <Mail size={24} />,
      connected: false,
      color: '#4285F4',
    },
    {
      id: 'outlook',
      name: 'Outlook Calendar',
      icon: <Mail size={24} />,
      connected: false,
      color: '#0078D4',
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: <Apple size={24} />,
      connected: false,
      color: '#000000',
    },
  ]);


  const handleConnect = async (providerId: string) => {
    // Simulate API call for calendar integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProviders(prev =>
      prev.map(provider =>
        provider.id === providerId
          ? { ...provider, connected: true }
          : provider
      )
    );
  };

  const connectedCount = providers.filter(p => p.connected).length;

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
          <Calendar color="#b2b9c4" size={32} />
          <Box>
            <Typography variant="h6" sx={{ color: '#262626', fontWeight: 'bold' }}>
              Calendar Integration
            </Typography>
            <Typography variant="body2" sx={{ color: '#262626', opacity: 0.8 }}>
              {connectedCount > 0 
                ? `${connectedCount} calendar${connectedCount > 1 ? 's' : ''} connected`
                : 'Connect your calendars'
              }
            </Typography>
          </Box>
          {connectedCount > 0 && (
            <CheckCircle color="#4CAF50" size={24} />
          )}
        </Box>
      </GlassmorphismCard>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
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
        <DialogTitle sx={{ color: '#262626' }}>
          Calendar Integration
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2, backgroundColor: 'rgba(33, 150, 243, 0.1)' }}>
            Connect your calendars to automatically sync events and tasks. Changes will be synchronized in both directions.
          </Alert>
          
          <List>
            {providers.map((provider) => (
              <ListItem
                key={provider.id}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon sx={{ color: provider.color }}>
                  {provider.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                      {provider.name}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {provider.connected 
                        ? 'Connected and syncing' 
                        : 'Click to connect'
                      }
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {provider.connected ? (
                    <CheckCircle color="#4CAF50" size={20} />
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleConnect(provider.id)}
                      sx={{
                        backgroundColor: provider.color,
                        '&:hover': {
                          backgroundColor: provider.color,
                          opacity: 0.8,
                        },
                      }}
                    >
                      Connect
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalendarIntegration;
