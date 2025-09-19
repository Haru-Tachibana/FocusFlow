import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import { X, Camera } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onClose }) => {
  const { backgroundColor, highlightColor, glassColor } = useTheme();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        name: name,
        email: email,
      });
    }
    onClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: backgroundColor,
          color: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${glassColor}`,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Edit Profile
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#262626' }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: highlightColor,
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {getInitials(name)}
            </Avatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: highlightColor,
                color: 'white',
                width: 32,
                height: 32,
                '&:hover': {
                  backgroundColor: highlightColor,
                  opacity: 0.8,
                },
              }}
            >
              <Camera size={16} />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: '#FFFFFF', opacity: 0.7, mt: 1 }}>
            Click to change avatar
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputBase-input': { color: '#FFFFFF' },
              '& .MuiInputLabel-root': { color: '#FFFFFF' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: glassColor },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: highlightColor,
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: highlightColor,
              },
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            type="email"
            sx={{
              '& .MuiInputBase-input': { color: '#FFFFFF' },
              '& .MuiInputLabel-root': { color: '#FFFFFF' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: glassColor },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: highlightColor,
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: highlightColor,
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: highlightColor,
            color: 'white',
            '&:hover': {
              backgroundColor: highlightColor,
              opacity: 0.9,
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
