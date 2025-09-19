import React, { useState, useRef } from 'react';
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
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar || undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        name: name,
        email: email,
        avatar: avatar,
      });
    }
    onClose();
  };

  const handleSignOut = async () => {
    await logout();
    onClose();
    // The App component will automatically redirect to login page when user becomes null
  };

  const handleSwitchToSignUp = async () => {
    await logout();
    onClose();
    // The App component will automatically redirect to login page when user becomes null
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
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
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
              src={avatar || undefined}
              onClick={handleAvatarClick}
            >
              {!avatar && getInitials(name)}
            </Avatar>
            <IconButton
              onClick={handleAvatarClick}
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
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

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user?.id === 'guest-user' ? (
            <Button
              onClick={handleSwitchToSignUp}
              sx={{
                color: '#4CAF50',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
              }}
            >
              Switch to Sign Up
            </Button>
          ) : (
            <Button
              onClick={handleSignOut}
              sx={{
                color: '#ff6b6b',
                '&:hover': {
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                },
              }}
            >
              Sign Out
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default UserProfileDialog;
