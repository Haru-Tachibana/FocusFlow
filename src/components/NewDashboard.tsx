import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Plus,
  Bell,
  Search,
  MoreVertical,
  Target,
  Clock,
  TrendingUp,
  X,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useHabitSkill } from '../contexts/HabitSkillContext';
import { useAuth } from '../contexts/AuthContext';
import AddHabitDialog from './AddHabitDialog';
import AddSkillDialog from './AddSkillDialog';
import UserProfileDialog from './UserProfileDialog';
import ActivityOverview from './ActivityOverview';

const NewDashboard: React.FC = () => {
  const { backgroundColor, highlightColor } = useTheme();
  const { habits, skills, getTodayStats, importDemoData, clearAllData } = useHabitSkill();
  const { user } = useAuth();
  const [addHabitOpen, setAddHabitOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [overallMenuAnchor, setOverallMenuAnchor] = useState<null | HTMLElement>(null);
  const [weeklyMenuAnchor, setWeeklyMenuAnchor] = useState<null | HTMLElement>(null);

  const todayStats = getTodayStats();

  const activeHabits = habits.filter(h => h.isActive);
  const activeSkills = skills.filter(s => s.isActive);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#262626' }}>
            Hi, {user?.name || 'User'}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, color: '#262626' }}>
            Ready to build some amazing habits and master new skills?
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setAddHabitOpen(true)}
            sx={{
              backgroundColor: highlightColor,
              color: 'white',
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: highlightColor,
                opacity: 0.9,
              },
            }}
          >
            Create
          </Button>

          <IconButton 
            onClick={() => setSearchOpen(true)}
            sx={{ 
              color: '#262626',
              '&:hover': { color: highlightColor } 
            }}
          >
            <Search size={20} />
          </IconButton>

          <IconButton 
            onClick={() => setNotificationsOpen(true)}
            sx={{ 
              color: '#262626',
              '&:hover': { color: highlightColor } 
            }}
          >
            <Bell size={20} />
          </IconButton>

          <IconButton
            onClick={() => setUserProfileOpen(true)}
            sx={{
              p: 0,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <Avatar 
              sx={{ backgroundColor: highlightColor, width: 40, height: 40, cursor: 'pointer' }}
              src={user?.avatar}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Overall Information Card */}
        <Box>
          <Card
            sx={{
              backgroundColor: backgroundColor,
              color: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Overall Information
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    sx={{ color: '#262626' }}
                    onClick={(e) => setOverallMenuAnchor(e.currentTarget)}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1, color: highlightColor }}>
                  {todayStats.habitsCompleted}/{todayStats.totalHabits}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  Habits completed today
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Target size={16} color={highlightColor} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Active Habits
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {activeHabits.length}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Clock size={16} color={highlightColor} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Skills in Progress
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {activeSkills.length}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingUp size={16} color={highlightColor} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Hours Today
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {todayStats.skillsTimeSpent.toFixed(1)}h
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Weekly Progress Card */}
        <Box>
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#262626' }}>
                  Weekly Progress
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ color: '#262626' }}
                  onClick={(e) => setWeeklyMenuAnchor(e.currentTarget)}
                >
                  <MoreVertical size={16} />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: highlightColor, mb: 1 }}>
                  {todayStats.weeklyProgress > 0 ? `+${todayStats.weeklyProgress}%` : 
                   todayStats.weeklyProgress < 0 ? `${todayStats.weeklyProgress}%` : '0%'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, color: '#262626' }}>
                  {todayStats.weeklyProgress !== 0 ? 'vs last week' : 'No data yet'}
                </Typography>
              </Box>

              {/* Simple progress visualization */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#262626' }}>
                  Habits Completion
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={todayStats.totalHabits > 0 ? (todayStats.habitsCompleted / todayStats.totalHabits) * 100 : 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: highlightColor,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Skills Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={activeSkills.length > 0 ? (activeSkills.filter(s => s.currentHours > 0).length / activeSkills.length) * 100 : 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#3b82f6',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Habits Section */}
        <Box>
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#262626' }}>
                  Today's Habits
                </Typography>
                <Button
                  size="small"
                  startIcon={<Plus size={16} />}
                  onClick={() => setAddHabitOpen(true)}
                  sx={{
                    color: highlightColor,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Add Habit
                </Button>
              </Box>

              {activeHabits.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                  }}
                >
                  <Target size={48} color="#b2b9c4" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <Typography variant="body1" sx={{ mb: 2, color: '#262626' }}>
                    No habits yet
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, color: '#262626' }}>
                    Start building your first habit today!
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {activeHabits.slice(0, 3).map((habit) => (
                    <Box
                      key={habit.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: habit.color,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ fontSize: '20px', color: 'white' }}>{habit.icon}</span>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#262626' }}>
                          {habit.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, color: '#262626' }}>
                          {habit.currentStreak} day streak
                        </Typography>
                      </Box>
                      <Chip
                        label={`${Math.round((habit.totalDaysCompleted / habit.targetDays) * 100)}%`}
                        size="small"
                        sx={{
                          backgroundColor: highlightColor,
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Skills Section */}
        <Box>
          <Card
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#262626' }}>
                  Skills in Progress
                </Typography>
                <Button
                  size="small"
                  startIcon={<Plus size={16} />}
                  onClick={() => setAddSkillOpen(true)}
                  sx={{
                    color: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Add Skill
                </Button>
              </Box>

              {activeSkills.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                  }}
                >
                  <Clock size={48} color="#b2b9c4" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <Typography variant="body1" sx={{ mb: 2, color: '#262626' }}>
                    No skills yet
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, color: '#262626' }}>
                    Start learning something new today!
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {activeSkills.slice(0, 3).map((skill) => (
                    <Box
                      key={skill.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: skill.color,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ fontSize: '20px', color: 'white' }}>{skill.icon}</span>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#262626' }}>
                          {skill.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, color: '#262626' }}>
                          {skill.currentHours.toFixed(1)}h / {skill.targetHours}h
                        </Typography>
                      </Box>
                      <Chip
                        label={`${Math.round((skill.currentHours / skill.targetHours) * 100)}%`}
                        size="small"
                        sx={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Activity Overview Section */}
      <Box sx={{ mt: 3 }}>
        <ActivityOverview />
      </Box>

      {/* Dialogs */}
      <AddHabitDialog
        open={addHabitOpen}
        onClose={() => setAddHabitOpen(false)}
      />
      <AddSkillDialog
        open={addSkillOpen}
        onClose={() => setAddSkillOpen(false)}
      />
      <UserProfileDialog
        open={userProfileOpen}
        onClose={() => setUserProfileOpen(false)}
      />

      {/* Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
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
            <Search size={24} color={highlightColor} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Search
            </Typography>
          </Box>
          <IconButton onClick={() => setSearchOpen(false)} size="small" sx={{ color: '#262626' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search habits, skills, or anything..."
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
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setSearchOpen(false)}
            sx={{
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: highlightColor,
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
            }}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
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
            <Bell size={24} color={highlightColor} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Notifications
            </Typography>
          </Box>
          <IconButton onClick={() => setNotificationsOpen(false)} size="small" sx={{ color: '#262626' }}>
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ color: '#FFFFFF', textAlign: 'center', py: 4 }}>
            No notifications yet
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setNotificationsOpen(false)}
            sx={{
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Overall Information Menu */}
      <Menu
        anchorEl={overallMenuAnchor}
        open={Boolean(overallMenuAnchor)}
        onClose={() => setOverallMenuAnchor(null)}
        PaperProps={{
          sx: {
            backgroundColor: backgroundColor,
            color: '#FFFFFF',
            borderRadius: '8px',
            minWidth: 150,
          },
        }}
      >
        <MenuItem onClick={() => setOverallMenuAnchor(null)}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => { setOverallMenuAnchor(null); importDemoData(); }}>
          Import Demo Data
        </MenuItem>
        <MenuItem onClick={() => { setOverallMenuAnchor(null); clearAllData(); }}>
          Clear All Data
        </MenuItem>
      </Menu>

      {/* Weekly Progress Menu */}
      <Menu
        anchorEl={weeklyMenuAnchor}
        open={Boolean(weeklyMenuAnchor)}
        onClose={() => setWeeklyMenuAnchor(null)}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            color: '#262626',
            borderRadius: '8px',
            minWidth: 150,
          },
        }}
      >
        <MenuItem onClick={() => setWeeklyMenuAnchor(null)}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => setWeeklyMenuAnchor(null)}>
          Export Data
        </MenuItem>
        <MenuItem onClick={() => setWeeklyMenuAnchor(null)}>
          Settings
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NewDashboard;