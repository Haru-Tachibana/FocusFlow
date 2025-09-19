import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  Gift,
  Plus,
  X,
  Star,
  Sparkles,
  Trophy,
  Heart,
  Coffee,
  Gamepad2,
  Music,
  BookOpen,
  Camera,
} from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'food' | 'entertainment' | 'self-care' | 'activity' | 'treat';
}

interface RewardPoolProps {
  onRewardEarned: (reward: Reward) => void;
}

const RewardPool: React.FC<RewardPoolProps> = ({ onRewardEarned }) => {
  const [open, setOpen] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [newReward, setNewReward] = useState({ title: '', description: '', category: 'treat' as const });
  const [showReward, setShowReward] = useState(false);
  const [earnedReward, setEarnedReward] = useState<Reward | null>(null);

  const iconMap = {
    food: Coffee,
    entertainment: Gamepad2,
    'self-care': Heart,
    activity: Camera,
    treat: Star,
  };

  const defaultRewards: Reward[] = [
    {
      id: '1',
      title: 'Have a Dessert',
      description: 'Enjoy your favorite dessert guilt-free!',
      icon: 'food',
      category: 'food',
    },
    {
      id: '2',
      title: 'Ice Cream Time',
      description: 'Treat yourself to a delicious ice cream!',
      icon: 'food',
      category: 'food',
    },
    {
      id: '3',
      title: 'Watch Anime Episode',
      description: 'Relax and watch one episode of your favorite anime!',
      icon: 'entertainment',
      category: 'entertainment',
    },
    {
      id: '4',
      title: 'Gaming Session',
      description: 'Play your favorite game for 30 minutes!',
      icon: 'entertainment',
      category: 'entertainment',
    },
    {
      id: '5',
      title: 'Self-Care Time',
      description: 'Take a relaxing bath or do skincare routine!',
      icon: 'self-care',
      category: 'self-care',
    },
    {
      id: '6',
      title: 'Read a Book',
      description: 'Read for 20 minutes in your favorite spot!',
      icon: 'activity',
      category: 'activity',
    },
    {
      id: '7',
      title: 'Listen to Music',
      description: 'Put on headphones and enjoy your favorite playlist!',
      icon: 'entertainment',
      category: 'entertainment',
    },
    {
      id: '8',
      title: 'Take Photos',
      description: 'Go outside and take some creative photos!',
      icon: 'activity',
      category: 'activity',
    },
  ];

  useEffect(() => {
    const savedRewards = localStorage.getItem('adhd_rewards');
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    } else {
      setRewards(defaultRewards);
      localStorage.setItem('adhd_rewards', JSON.stringify(defaultRewards));
    }
  }, []);

  const addReward = () => {
    if (newReward.title.trim()) {
      const reward: Reward = {
        id: Date.now().toString(),
        title: newReward.title,
        description: newReward.description,
        icon: newReward.category,
        category: newReward.category,
      };
      const updatedRewards = [...rewards, reward];
      setRewards(updatedRewards);
      localStorage.setItem('adhd_rewards', JSON.stringify(updatedRewards));
      setNewReward({ title: '', description: '', category: 'treat' });
    }
  };

  const removeReward = (id: string) => {
    const updatedRewards = rewards.filter(reward => reward.id !== id);
    setRewards(updatedRewards);
    localStorage.setItem('adhd_rewards', JSON.stringify(updatedRewards));
  };

  const earnRandomReward = () => {
    if (rewards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const reward = rewards[randomIndex];
    setEarnedReward(reward);
    setShowReward(true);
    onRewardEarned(reward);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      food: '#FF6B6B',
      entertainment: '#4ECDC4',
      'self-care': '#45B7D1',
      activity: '#96CEB4',
      treat: '#FFEAA7',
    };
    return colors[category as keyof typeof colors] || '#32CD32';
  };

  return (
    <>
      <GlassmorphismCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Reward Pool
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen(true)}
              sx={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Plus size={16} style={{ marginRight: 4 }} />
              Add
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={earnRandomReward}
              disabled={rewards.length === 0}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E8E 30%, #FF6B6B 90%)',
                },
              }}
            >
              <Gift size={16} style={{ marginRight: 4 }} />
              Earn Reward!
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 200, overflowY: 'auto' }}>
          {rewards.slice(0, 5).map((reward) => {
            const IconComponent = iconMap[reward.icon as keyof typeof iconMap] || Star;
            return (
              <Box
                key={reward.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <IconComponent color={getCategoryColor(reward.category)} size={16} />
                <Typography sx={{ color: 'white', fontSize: '0.8rem', flex: 1 }}>
                  {reward.title}
                </Typography>
                <Chip
                  label={reward.category}
                  size="small"
                  sx={{
                    backgroundColor: getCategoryColor(reward.category),
                    color: 'white',
                    fontSize: '0.6rem',
                    height: 20,
                  }}
                />
              </Box>
            );
          })}
          {rewards.length === 0 && (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', py: 2 }}>
              No rewards yet. Add some to motivate yourself!
            </Typography>
          )}
        </Box>
      </GlassmorphismCard>

      {/* Add Reward Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
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
        <DialogTitle sx={{ color: 'white' }}>Add New Reward</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Reward Title"
            value={newReward.title}
            onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32CD32',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#32CD32',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Description (optional)"
            value={newReward.description}
            onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#32CD32',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: '#32CD32',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            Cancel
          </Button>
          <Button
            onClick={addReward}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #228B22 30%, #32CD32 90%)',
              },
            }}
          >
            Add Reward
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reward Earned Dialog */}
      <Dialog
        open={showReward}
        onClose={() => setShowReward(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <Trophy color="white" size={40} />
            </Box>
          </Box>
          
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            🎉 Congratulations! 🎉
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
            You earned a reward:
          </Typography>
          
          {earnedReward && (
            <Card
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 2,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
                  {React.createElement(iconMap[earnedReward.icon as keyof typeof iconMap] || Star, {
                    color: getCategoryColor(earnedReward.category),
                    size: 24,
                  })}
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {earnedReward.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {earnedReward.description}
                </Typography>
              </CardContent>
            </Card>
          )}
          
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
            Great job completing your goal! Enjoy your reward! 🌟
          </Typography>
          
          <Button
            onClick={() => setShowReward(false)}
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #228B22 30%, #32CD32 90%)',
              },
            }}
          >
            <Sparkles size={20} style={{ marginRight: 8 }} />
            Claim Reward!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RewardPool;
