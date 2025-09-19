import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  Alert,
} from '@mui/material';
import { Image, Upload, Palette } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface BackgroundCustomizationProps {
  currentBackground?: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundCustomization: React.FC<BackgroundCustomizationProps> = ({
  currentBackground,
  onBackgroundChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(currentBackground || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultBackgrounds = [
    {
      id: 'gradient1',
      name: 'Lime Grey',
      url: 'linear-gradient(135deg, #32CD32 0%, #808080 100%)',
      type: 'gradient' as const,
    },
    {
      id: 'gradient2',
      name: 'Dark Lime',
      url: 'linear-gradient(135deg, #1a1a1a 0%, #32CD32 100%)',
      type: 'gradient' as const,
    },
    {
      id: 'gradient3',
      name: 'Grey Scale',
      url: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
      type: 'gradient' as const,
    },
    {
      id: 'gradient4',
      name: 'Lime White',
      url: 'linear-gradient(135deg, #32CD32 0%, #FFFFFF 100%)',
      type: 'gradient' as const,
    },
    {
      id: 'gradient5',
      name: 'Dark Theme',
      url: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
      type: 'gradient' as const,
    },
    {
      id: 'gradient6',
      name: 'Soft Lime',
      url: 'linear-gradient(135deg, #90EE90 0%, #32CD32 100%)',
      type: 'gradient' as const,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setSelectedBackground(result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPG, PNG, GIF)');
      }
    }
  };

  const handleApply = () => {
    onBackgroundChange(selectedBackground);
    setOpen(false);
  };

  const handleRemove = () => {
    setSelectedBackground('');
    onBackgroundChange('');
  };

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
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #E91E63 30%, #9C27B0 90%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image color="white" size={20} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#262626', fontWeight: 'bold' }}>
              Background Customization
            </Typography>
            <Typography variant="body2" sx={{ color: '#262626', opacity: 0.8 }}>
              Personalize your workspace
            </Typography>
          </Box>
        </Box>
      </GlassmorphismCard>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Customize Background
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Upload Section */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Upload Your Own Image
              </Typography>
              <Box
                sx={{
                  border: '2px dashed rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload color="rgba(255, 255, 255, 0.7)" size={48} />
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                  Click to upload image (JPG, PNG, GIF)
                </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </Box>
            </Box>

            {/* Default Backgrounds */}
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Default Backgrounds
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {defaultBackgrounds.map((bg) => (
                  <Box key={bg.id} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: selectedBackground === bg.url ? '3px solid #32CD32' : '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                      onClick={() => setSelectedBackground(bg.url)}
                    >
                      <Box
                        sx={{
                          height: 120,
                          background: bg.url,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Palette color="rgba(255, 255, 255, 0.7)" size={32} />
                      </Box>
                      <Box sx={{ p: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                          {bg.name}
                        </Typography>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Current Selection Preview */}
            {selectedBackground && (
              <Box>
                <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                  Preview
                </Typography>
                <Box
                  sx={{
                    height: 200,
                    background: selectedBackground,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 2,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                      Preview
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            <Alert severity="info" sx={{ backgroundColor: 'rgba(33, 150, 243, 0.1)' }}>
              <Typography sx={{ color: 'white' }}>
                You can upload your own images or choose from our default backgrounds. 
                Images will be automatically resized and optimized for the best experience.
              </Typography>
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Cancel
          </Button>
          {selectedBackground && (
            <Button
              onClick={handleRemove}
              sx={{ color: '#FF5722' }}
            >
              Remove Background
            </Button>
          )}
          <Button
            onClick={handleApply}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
            }}
          >
            Apply Background
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BackgroundCustomization;
