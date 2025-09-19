import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        width: '100%',
        py: 3,
        px: 2,
        backgroundColor: 'transparent',
        borderTop: '1px solid rgba(108, 124, 145, 0.2)',
        mt: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#6c7c91',
            fontSize: '0.875rem',
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          © {currentYear} FocusFlow. All rights reserved. Built with ❤️ for ADHD and neurodivergent individuals.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;