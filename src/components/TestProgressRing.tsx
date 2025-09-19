import React from 'react';
import { Box } from '@mui/material';
import ProgressRing from './ProgressRing';

const TestProgressRing: React.FC = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1 style={{ color: 'white' }}>Testing ProgressRing Component</h1>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <ProgressRing
          progress={75}
          label="75%"
          subtitle="Test"
          color="#32CD32"
        />
        <ProgressRing
          progress={50}
          label="50%"
          subtitle="Test"
          color="#FF6B6B"
        />
        <ProgressRing
          progress={25}
          label="25%"
          subtitle="Test"
          color="#808080"
        />
      </Box>
    </Box>
  );
};

export default TestProgressRing;
