import React from 'react';
import ProgressRing from './ProgressRing';
import ActivityGrid from './ActivityGrid';
import CalendarWidget from './CalendarWidget';
import TaskPreferences from './TaskPreferences';
import BackgroundCustomization from './BackgroundCustomization';
import GoalCheckIn from './GoalCheckIn';
import RewardPool from './RewardPool';
import CalendarIntegration from './CalendarIntegration';

const TestImports: React.FC = () => {
  return (
    <div>
      <h1>Testing Imports</h1>
      <p>ProgressRing: {typeof ProgressRing}</p>
      <p>ActivityGrid: {typeof ActivityGrid}</p>
      <p>CalendarWidget: {typeof CalendarWidget}</p>
      <p>TaskPreferences: {typeof TaskPreferences}</p>
      <p>BackgroundCustomization: {typeof BackgroundCustomization}</p>
      <p>GoalCheckIn: {typeof GoalCheckIn}</p>
      <p>RewardPool: {typeof RewardPool}</p>
      <p>CalendarIntegration: {typeof CalendarIntegration}</p>
    </div>
  );
};

export default TestImports;
