import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HabitSkillProvider } from './contexts/HabitSkillContext';
import { RouterProvider } from './contexts/RouterContext';
import LoginForm from './components/LoginForm';
import MainApp from './components/MainApp';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#32CD32', // Lime Green
    },
    secondary: {
      main: '#808080', // Grey
    },
    background: {
      default: '#1a1a1a',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflow: 'auto',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { user, loading, loginAsGuest } = useAuth();
  const [showGuestOption, setShowGuestOption] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      // Show guest option after 2 seconds of loading
      const timer = setTimeout(() => {
        setShowGuestOption(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
        color: 'white'
      }}>
        <div style={{ marginBottom: '20px' }}>Loading...</div>
        {showGuestOption && (
          <button
            onClick={loginAsGuest}
            style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Continue as Guest
          </button>
        )}
      </div>
    );
  }

  return user ? <MainApp /> : <LoginForm />;
};

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ThemeProvider>
          <HabitSkillProvider>
            <RouterProvider>
              <AppContent />
            </RouterProvider>
          </HabitSkillProvider>
        </ThemeProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

export default App;