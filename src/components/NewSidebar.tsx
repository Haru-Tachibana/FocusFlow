import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home,
  Calendar,
  Target,
  BarChart3,
  Settings,
  Plus,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from '../contexts/RouterContext';

interface NewSidebarProps {
  onAddHabit: () => void;
  onAddSkill: () => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ onAddHabit, onAddSkill }) => {
  const { backgroundColor, highlightColor } = useTheme();
  const { currentRoute, navigateTo } = useRouter();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'habits', label: 'My Habits', icon: Target },
    { id: 'skills', label: 'My Skills', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Appearance Customization', icon: Settings },
  ];

  const quickActions = [
    { id: 'add-habit', label: 'Add Habit', icon: Plus, color: highlightColor },
    { id: 'add-skill', label: 'Add Skill', icon: Plus, color: highlightColor },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: backgroundColor,
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: highlightColor,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle size={20} color="white" />
          </Box>
          FocusFlow
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, p: 2 }}>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigateTo(item.id as any)}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: currentRoute === item.id ? highlightColor : 'transparent',
                  '&:hover': {
                    backgroundColor: currentRoute === item.id ? highlightColor : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.icon
                    size={20}
                    color={currentRoute === item.id ? 'white' : '#FFFFFF'}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: currentRoute === item.id ? 'white' : '#FFFFFF',
                      fontWeight: currentRoute === item.id ? 600 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Quick Actions */}
        <Typography
          variant="caption"
          sx={{
            color: '#FFFFFF',
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: 1,
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Quick Actions
        </Typography>

        <List>
          {quickActions.map((action) => (
            <ListItem key={action.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  if (action.id === 'add-habit') onAddHabit();
                  if (action.id === 'add-skill') onAddSkill();
                }}
                sx={{
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <action.icon size={20} color={action.color} />
                </ListItemIcon>
                <ListItemText
                  primary={action.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#FFFFFF',
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Box
          onClick={() => navigateTo('settings')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: highlightColor,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Settings size={20} color="white" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 500 }}>
              Settings
            </Typography>
            <Typography variant="caption" sx={{ color: '#FFFFFF', opacity: 0.7 }}>
              Customize your experience
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewSidebar;
