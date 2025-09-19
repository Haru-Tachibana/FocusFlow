import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Settings,
  Image,
  Calendar,
  User,
  Plus,
  Palette,
  Clock,
  CheckCircle,
  Target,
  BarChart3,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  onOpenWidget: (widgetId: string) => void;
  onAddTask: () => void;
  onBackgroundChange: (background: string) => void;
  onToggleDyslexiaFont: () => void;
  isDyslexiaMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  onOpenWidget,
  onAddTask,
  onBackgroundChange,
  onToggleDyslexiaFont,
  isDyslexiaMode
}) => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [sidebarBgColor, setSidebarBgColor] = useState('#1A1A1A');
  const [sidebarTextColor, setSidebarTextColor] = useState('#FFFFFF');
  const { setTheme } = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleColorChange = () => {
    // Apply sidebar colors
    document.documentElement.style.setProperty('--sidebar-bg', sidebarBgColor);
    document.documentElement.style.setProperty('--sidebar-text', sidebarTextColor);
    setColorPickerOpen(false);
  };

  const tabs = [
    { label: 'Background', icon: Image },
    { label: 'Schedule', icon: Calendar },
    { label: 'Account', icon: User },
  ];

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            background: `var(--sidebar-bg, ${sidebarBgColor})`,
            color: `var(--sidebar-text, ${sidebarTextColor})`,
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ 
            color: `var(--sidebar-text, ${sidebarTextColor})`,
            fontWeight: 'bold',
            mb: 2 
          }}>
            FocusFlow
          </Typography>
          
          {/* Color Picker Button */}
          <Button
            onClick={() => setColorPickerOpen(true)}
            startIcon={<Palette size={16} />}
            sx={{
              color: `var(--sidebar-text, ${sidebarTextColor})`,
              border: `1px solid var(--sidebar-text, ${sidebarTextColor})`,
              mb: 2,
              fontSize: '0.8rem',
            }}
            size="small"
          >
            Customize Colors
          </Button>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                color: `var(--sidebar-text, ${sidebarTextColor})`,
                fontSize: '0.8rem',
                minHeight: 40,
              },
              '& .Mui-selected': {
                color: `var(--sidebar-text, ${sidebarTextColor})`,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={<tab.icon size={16} />}
                label={tab.label}
                iconPosition="start"
              />
            ))}
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ 
                  color: `var(--sidebar-text, ${sidebarTextColor})`,
                  mb: 1 
                }}>
                  Background Themes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['green', 'red', 'orange', 'purple', 'pink', 'yellow', 'blue', 'grey'].map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => setTheme(theme)}
                      sx={{
                        minWidth: 60,
                        height: 30,
                        fontSize: '0.7rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: `var(--sidebar-text, ${sidebarTextColor})`,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      {theme}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="subtitle2" sx={{ 
                  color: `var(--sidebar-text, ${sidebarTextColor})`,
                  mb: 1 
                }}>
                  Apple Calendar Style
                </Typography>
                <Box sx={{ 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                  p: 1,
                  minHeight: 200,
                }}>
                  <Typography variant="caption" sx={{ 
                    color: `var(--sidebar-text, ${sidebarTextColor})`,
                    opacity: 0.7 
                  }}>
                    Calendar view will be implemented here
                  </Typography>
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="subtitle2" sx={{ 
                  color: `var(--sidebar-text, ${sidebarTextColor})`,
                  mb: 1 
                }}>
                  My Account
                </Typography>
                <Box sx={{ 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 1,
                  p: 1,
                }}>
                  <Typography variant="caption" sx={{ 
                    color: `var(--sidebar-text, ${sidebarTextColor})`,
                    opacity: 0.7 
                  }}>
                    Account settings will be here
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Add Task Button at Bottom */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          p: 2 
        }}>
          <Button
            onClick={onAddTask}
            startIcon={<Plus size={16} />}
            fullWidth
            sx={{
              backgroundColor: '#32CD32',
              color: 'white',
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#28B828',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Drawer>

      {/* Color Picker Dialog */}
      <Dialog open={colorPickerOpen} onClose={() => setColorPickerOpen(false)}>
        <DialogTitle>Customize Sidebar Colors</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Background Color"
              type="color"
              value={sidebarBgColor}
              onChange={(e) => setSidebarBgColor(e.target.value)}
              fullWidth
            />
            <TextField
              label="Text Color"
              type="color"
              value={sidebarTextColor}
              onChange={(e) => setSidebarTextColor(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setColorPickerOpen(false)}>Cancel</Button>
          <Button onClick={handleColorChange} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;