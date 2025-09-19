import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Drawer,
  Typography,
  Divider,
} from '@mui/material';
import {
  Settings,
  Calendar,
  Palette,
  Image,
  Target,
  BarChart3,
  Plus,
  Type,
  Eye,
  Gift,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface SidebarProps {
  onOpenWidget: (widget: string) => void;
  onToggleDyslexiaFont: () => void;
  isDyslexiaMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenWidget, 
  onToggleDyslexiaFont, 
  isDyslexiaMode 
}) => {
  const [open, setOpen] = useState(true);

  const widgets = [
    { id: 'all', icon: BarChart3, label: 'All Widgets', color: '#32CD32' },
    { id: 'calendar', icon: Calendar, label: 'Calendar Integration', color: '#32CD32' },
    { id: 'preferences', icon: Settings, label: 'Task Preferences', color: '#808080' },
    { id: 'background', icon: Image, label: 'Background Customization', color: '#90EE90' },
    { id: 'goals', icon: Target, label: 'Goals Progress', color: '#A9A9A9' },
    { id: 'rewards', icon: Gift, label: 'Reward Pool', color: '#FF6B6B' },
    { id: 'activity', icon: BarChart3, label: 'Activity Overview', color: '#FFFFFF' },
    { id: 'year-activity', icon: BarChart3, label: 'Year Activity Review', color: '#8E44AD' },
    { id: 'add-task', icon: Plus, label: 'Add Task', color: '#32CD32' },
  ];

  const handleWidgetClick = (widgetId: string) => {
    onOpenWidget(widgetId);
    setOpen(false);
  };

  return (
    <>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        variant="permanent"
        PaperProps={{
          sx: {
            width: 200,
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'fixed',
            height: '100vh',
            zIndex: 1000,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
            Quick Access
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {widgets.map((widget) => (
              <Box
                key={widget.id}
                onClick={() => handleWidgetClick(widget.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(-4px)',
                    borderColor: widget.color,
                  },
                }}
              >
                <widget.icon color={widget.color} size={20} />
                <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                  {widget.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              onClick={onToggleDyslexiaFont}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: isDyslexiaMode ? 'rgba(50, 205, 50, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isDyslexiaMode ? 'rgba(50, 205, 50, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(-4px)',
                },
              }}
            >
              <Type color={isDyslexiaMode ? '#32CD32' : '#808080'} size={16} />
              <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                {isDyslexiaMode ? 'Dyslexia ON' : 'Dyslexia OFF'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
