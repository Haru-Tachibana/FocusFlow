# FocusFlow - ADHD Task Management App

A comprehensive web application designed specifically for ADHD and neurodivergent individuals to help manage habits, skills, and daily activities with smart scheduling and visual progress tracking.

## Features

### 🔐 User Authentication
- Secure signup/login system with Supabase
- Persistent authentication state (no redirect on refresh)
- Guest mode for trying the app
- User preferences management

### 📅 Calendar Integration
- Connect with Google Calendar, Outlook, and Apple Calendar
- Bidirectional sync between calendars and the app
- Automatic event synchronization

### 🎯 Habit & Skill Management
- **Habit Tracking**: Build and maintain daily habits with streak tracking
- **Skill Development**: Learn new skills with progress tracking and time logging
- **Smart Scheduling**: Intelligent habit and skill practice scheduling
- **Preference Questions**: Customizable work hours, break duration, and daily limits
- **Category System**: Customizable activity categories with colors

### 📊 Visual Progress Tracking
- **Progress Rings**: Apple Watch-style circular progress indicators
- **Activity Grid**: GitHub-style activity visualization
- **Habit Streaks**: Visual streak tracking for daily habits
- **Skill Progress**: Time-based progress tracking for skill development
- **Dashboard Stats**: Real-time habit completion and skill progress

### 🎨 Customization
- **Background Customization**: Upload your own images or choose from presets
- **Category Management**: Add, remove, and customize activity categories
- **Color Themes**: Customizable color schemes for different activities
- **Glassmorphism UI**: Modern frosted glass design elements

### 🧠 ADHD-Friendly Features
- **Visual Progress**: Clear progress indicators and completion tracking
- **Flexible Scheduling**: Adaptive habit and skill practice scheduling
- **Habit Persistence**: Daily habit tracking to build consistency
- **Skill Development**: Structured learning with progress visualization
- **Category Visualization**: Color-coded activity tracking for better organization

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) with custom glassmorphism components
- **Icons**: Lucide React (no Apple emojis as requested)
- **Styling**: Emotion with MUI's styled components
- **State Management**: React Context API
- **Backend**: Supabase (Authentication & Database)
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd adhd-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### First Time Setup
1. Create an account or sign in
2. Set up your task preferences (work hours, break duration, etc.)
3. Connect your calendars for automatic sync
4. Customize your background and activity categories

### Adding Habits
1. Click "Add Habit" button
2. Set habit details:
   - **Name**: What you want to build
   - **Frequency**: Daily, weekly, or custom
   - **Category**: Organize by activity type
   - **Reminder**: Set notification preferences
3. Track daily completion and build streaks

### Adding Skills
1. Click "Add Skill" button
2. Set skill details:
   - **Name**: What you want to learn
   - **Category**: Organize by skill type
   - **Time Goal**: Target practice time per day/week
   - **Description**: Add notes and resources
3. Log practice time and track progress

### Calendar Integration
1. Go to Calendar Integration settings
2. Connect your preferred calendar services
3. Enable bidirectional sync
4. View and manage events from all connected calendars

## Project Structure

```
src/
├── components/
│   ├── AddHabitDialog.tsx      # Habit creation and editing
│   ├── AddSkillDialog.tsx      # Skill creation and editing
│   ├── BackgroundCustomization.tsx # Background image management
│   ├── CalendarIntegration.tsx # Calendar sync functionality
│   ├── Dashboard.tsx           # Main dashboard component
│   ├── LoginForm.tsx          # Authentication forms
│   ├── MainApp.tsx            # Main app layout with sidebar
│   ├── NewDashboard.tsx       # Enhanced dashboard with habits/skills
│   ├── NewSidebar.tsx         # Navigation sidebar
│   ├── UserProfileDialog.tsx  # User profile management
│   └── pages/                 # Page components
│       ├── CalendarPage.tsx   # Calendar view
│       └── SettingsPage.tsx   # Settings and preferences
├── contexts/
│   ├── AuthContext.tsx        # Authentication context
│   ├── HabitSkillContext.tsx  # Habits and skills state management
│   ├── RouterContext.tsx      # Navigation context
│   └── ThemeContext.tsx       # Theme management
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── types/
│   ├── habits.ts             # Habit type definitions
│   ├── skills.ts             # Skill type definitions
│   └── index.ts              # General type definitions
└── App.tsx                   # Main application component
```

## Key Features Explained

### Habit Tracking System
- **Daily Habits**: Build consistent daily routines with streak tracking
- **Flexible Frequency**: Set habits for daily, weekly, or custom intervals
- **Visual Streaks**: See your progress with clear streak indicators
- **Smart Reminders**: Get notified when it's time to complete habits

### Skill Development
- **Time Tracking**: Log practice time for each skill
- **Progress Goals**: Set daily or weekly time targets
- **Resource Management**: Add notes, links, and learning materials
- **Category Organization**: Group related skills together

### Visual Progress Tracking
- **Progress Rings**: Show completion percentage for habits and skills
- **Activity Grid**: 365-day view with color-coded activity intensity
- **Streak Counters**: Visual representation of habit consistency
- **Time Logs**: Track skill development over time

## Customization Options

### Background Customization
- Upload personal images (JPG, PNG, GIF)
- Choose from preset gradient backgrounds
- Real-time preview before applying
- Automatic image optimization

### Activity Categories
- Add/remove custom categories
- Assign colors and icons
- Set category-specific preferences
- Visual category management

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Designed specifically for ADHD and neurodivergent individuals
- Inspired by Apple Watch activity rings and GitHub contribution graphs
- Built with accessibility and visual clarity in mind
- No Apple emojis used as per user preference

## Recent Updates

### v2.0.0 - Major Feature Update
- **New Focus**: Shifted from task management to habit and skill tracking
- **Authentication Fix**: Fixed page refresh redirecting to login (now persists auth state)
- **Supabase Integration**: Added secure backend with Supabase
- **Enhanced UI**: New dashboard design with habit and skill management
- **Guest Mode**: Added guest mode for trying the app without registration

### Key Improvements
- Persistent authentication state prevents login redirects on refresh
- New habit tracking system with streak counters
- Skill development tracking with time logging
- Improved user interface with better navigation
- Enhanced data persistence with Supabase backend

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Note**: This app is designed to be a supportive tool for ADHD and neurodivergent individuals. It's not a replacement for professional medical advice or treatment.