import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from '../contexts/RouterContext';
import NewSidebar from './NewSidebar';
import NewDashboard from './NewDashboard';
import HabitsPage from './pages/HabitsPage';
import SkillsPage from './pages/SkillsPage';
import SettingsPage from './pages/SettingsPage';
import AddHabitDialog from './AddHabitDialog';
import AddSkillDialog from './AddSkillDialog';
import Footer from './Footer';
import ActivityOverview from './ActivityOverview';

const MainApp: React.FC = () => {
  const { currentRoute } = useRouter();
  const [addHabitOpen, setAddHabitOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <NewDashboard />;
      case 'habits':
        return <HabitsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'statistics':
        return (
          <Box sx={{ p: 3 }}>
            <ActivityOverview />
          </Box>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return <NewDashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <NewSidebar 
        onAddHabit={() => setAddHabitOpen(true)} 
        onAddSkill={() => setAddSkillOpen(true)} 
      />
      <Box sx={{ flex: 1, marginLeft: '280px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
          {renderCurrentPage()}
        </Box>
        <Footer />
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
    </Box>
  );
};

export default MainApp;
