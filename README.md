# FocusFlow - ADHD Task Management App

A comprehensive web application designed specifically for ADHD and neurodivergent individuals to help manage tasks, goals, and daily activities with smart scheduling and visual progress tracking.

## Features

### 🔐 User Authentication
- Secure signup/login system
- Data persistence with localStorage
- User preferences management

### 📅 Calendar Integration
- Connect with Google Calendar, Outlook, and Apple Calendar
- Bidirectional sync between calendars and the app
- Automatic event synchronization

### 🎯 Smart Task Management
- **Task Types**: Goals, Regular Tasks, and One-time Tasks
- **Smart Distribution**: AI-powered task scheduling based on preferences
- **Preference Questions**: Customizable work hours, break duration, and task limits
- **Category System**: Customizable activity categories with colors

### 📊 Visual Progress Tracking
- **Progress Rings**: Apple Watch-style circular progress indicators
- **Activity Grid**: GitHub-style activity visualization
- **Goal Check-ins**: Weekly progress reviews with feedback system
- **Dashboard Stats**: Real-time task completion and goal progress

### 🎨 Customization
- **Background Customization**: Upload your own images or choose from presets
- **Category Management**: Add, remove, and customize activity categories
- **Color Themes**: Customizable color schemes for different activities
- **Glassmorphism UI**: Modern frosted glass design elements

### 🧠 ADHD-Friendly Features
- **Visual Progress**: Clear progress indicators and completion tracking
- **Flexible Scheduling**: Adaptive task distribution based on user feedback
- **Goal Persistence**: Weekly check-ins to prevent goal abandonment
- **Category Visualization**: Color-coded activity tracking for better organization

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) with custom glassmorphism components
- **Icons**: Lucide React (no Apple emojis as requested)
- **Styling**: Emotion with MUI's styled components
- **State Management**: React Context API
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

### Adding Tasks
1. Click "Add Task" button
2. Choose task type:
   - **Goal**: Long-term objectives with weekly check-ins
   - **Regular Task**: Recurring activities with custom frequency
   - **One-time Task**: Single occurrence tasks
3. Set category, duration, and priority
4. The app will automatically schedule tasks based on your preferences

### Goal Management
1. Create goals with target dates and frequency
2. Set weekly check-in reminders
3. Track progress with visual indicators
4. Adjust goals based on weekly feedback

### Calendar Integration
1. Go to Calendar Integration settings
2. Connect your preferred calendar services
3. Enable bidirectional sync
4. View and manage events from all connected calendars

## Project Structure

```
src/
├── components/
│   ├── ActivityGrid.tsx          # GitHub-style activity visualization
│   ├── BackgroundCustomization.tsx # Background image management
│   ├── CalendarIntegration.tsx   # Calendar sync functionality
│   ├── Dashboard.tsx            # Main dashboard component
│   ├── GlassmorphismCard.tsx    # Reusable glassmorphism card
│   ├── GoalCheckIn.tsx         # Weekly goal review system
│   ├── LoginForm.tsx           # Authentication forms
│   ├── ProgressRing.tsx        # Circular progress indicators
│   └── TaskPreferences.tsx     # User preference management
├── contexts/
│   └── AuthContext.tsx         # Authentication context
├── types/
│   └── index.ts               # TypeScript type definitions
└── App.tsx                    # Main application component
```

## Key Features Explained

### Smart Task Distribution
The app asks a series of preference questions to understand your work patterns:
- Work hours and break preferences
- Maximum tasks per day
- Category preferences and time allocations
- Auto-scheduling based on existing calendar events

### Goal Persistence System
- Weekly check-in prompts to prevent goal abandonment
- Difficulty assessment (too easy/just right/too hard)
- Progress adjustment based on feedback
- Automatic task rescheduling based on goal modifications

### Visual Progress Tracking
- **Progress Rings**: Show completion percentage for tasks and goals
- **Activity Grid**: 365-day view with color-coded activity intensity
- **Category Colors**: Customizable colors for different activity types
- **Transparency Levels**: Visual intensity based on activity duration

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

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Note**: This app is designed to be a supportive tool for ADHD and neurodivergent individuals. It's not a replacement for professional medical advice or treatment.