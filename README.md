
# InsideCampus - Campus Utility Platform

**One App. Many Services. Smarter Campus Life.**

A comprehensive React Native campus utility platform built with Expo SDK 51+, TypeScript, React Navigation v6+, and NativeWind (Tailwind CSS).

## 🎨 Features

- **Authentication**: Student/Staff login with SSO support (Google, Microsoft)
- **Dashboard**: Personalized home screen with quick access to all services
- **Lost & Found Hub**: Report and search for lost items with AI matching
- **Bus Tracking**: Live bus location and ETA tracking
- **Notifications Center**: Categorized announcements, events, and alerts
- **Profile Management**: User details, settings, and service access
- **Dark Mode**: Full light/dark theme support
- **Responsive Design**: Pixel-perfect UI for iOS and Android

## 🛠️ Tech Stack

- **Framework**: Expo (React Native SDK 51+)
- **Language**: TypeScript
- **Navigation**: React Navigation v6+ (Stack, Tabs, Drawer)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **Maps**: react-native-maps
- **State Management**: Zustand
- **Animations**: react-native-reanimated

## 📁 Project Structure

```
InsideCampus/
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable UI components
│   │   └── common.tsx   # Shared components (cards, tiles, banners)
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/         # Screen components
│   │   ├── AuthScreens.tsx      # Onboarding & Login
│   │   ├── HomeScreen.tsx       # Dashboard
│   │   ├── LostFoundScreen.tsx  # Lost & Found hub
│   │   ├── NotificationsScreen.tsx
│   │   └── ProfileScreen.tsx    # Profile & services
│   ├── store/           # State management
│   │   └── appStore.ts  # Zustand store
│   ├── types/           # TypeScript interfaces
│   │   └── index.ts
│   └── utils/           # Helper functions
├── App.tsx              # Main entry point
├── app.json             # Expo configuration
├── babel.config.js      # Babel configuration
├── tailwind.config.js   # Tailwind/NativeWind config
└── tsconfig.json        # TypeScript config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Navigate to the project directory:
```bash
cd InsideCampus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## 🎨 Design System

### Colors

- **Primary**: Deep Blue (#2563EB / #1D4ED8)
- **Secondary**: Soft Blue Gradient (#3B82F6 to #60A5FA)
- **Alert**: Red (#EF4444)
- **Success**: Green (#10B981)

### Typography

- Modern sans-serif system font
- Highly legible across all sizes
- Consistent hierarchy throughout the app

### UI Components

- Rounded corners (rounded-2xl for cards, rounded-xl for inputs)
- Clean shadow elevations
- Soft border outlines
- Consistent spacing and padding

## 📱 Screens

### Authentication Flow
- **Onboarding**: Carousel with app features and CTA buttons
- **Login**: Student/Staff toggle, email/password, SSO options

### Main Application
- **Home Dashboard**: Greeting, bus banner, quick access grid, recent activity
- **Lost & Found**: Searchable list with AI matches, report form (3-step)
- **Notifications**: Filtered tabs, pinned section, timeline feed
- **Profile**: User card, quick links, more services grid, theme toggle

### Additional Services
- **Bus Tracking**: Live map with ETA (placeholder)
- **Timetable**: Class schedule (placeholder)
- **Library**: Book search (placeholder)
- **More Services**: Grid of upcoming features

## 🔧 Configuration

### NativeWind Setup

The project uses NativeWind for Tailwind CSS styling. All components use `className` props for styling.

### Theme Support

Toggle between light and dark mode from the Profile screen or Home screen header.

### State Management

Zustand store manages:
- User authentication state
- Theme preference
- Lost items data
- Notifications
- Recent activities

## 📄 License

This project is for educational purposes.

## 👨‍💻 Development

To add new screens:
1. Create component in `src/screens/`
2. Add route in `src/navigation/AppNavigator.tsx`
3. Update type definitions

To add new services:
1. Add to the services grid in ProfileScreen
2. Create corresponding screen component
3. Add navigation route

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

Built with ❤️ for smarter campus life.
