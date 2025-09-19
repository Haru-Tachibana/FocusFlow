import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Made with
          </Typography>
          <Heart size={16} color="#FF6B6B" fill="#FF6B6B" />
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            for the ADHD community
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {currentYear} FocusFlow. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github size={16} />
            </IconButton>
            
            <IconButton
              size="small"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              onClick={() => window.open('mailto:support@focusflow.app', '_blank')}
            >
              <Mail size={16} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            href="#privacy"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white',
                textDecoration: 'underline',
              },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#terms"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'white',
                textDecoration: 'underline',
              },
            }}
          >
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
