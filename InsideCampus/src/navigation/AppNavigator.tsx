import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Search, Bell, User, Menu, MapPin, BookOpen, MessageSquare, HelpCircle, Settings, LogOut } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/appStore';

// Screens
import { OnboardingScreen, LoginScreen } from '../screens/AuthScreens';
import { HomeScreen } from '../screens/HomeScreen';
import { LostFoundScreen, ReportLostItemScreen } from '../screens/LostFoundScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen, BusTrackingScreen, TimetableScreen, LibraryScreen, MoreServicesScreen } from '../screens/ProfileScreen';

// Stack Types
export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  MainDrawer: undefined;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  LostFound: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  BusTracking: undefined;
  Timetable: undefined;
  Library: undefined;
  MoreServices: undefined;
  ReportLostItem: undefined;
  LostItemDetail: { item: any };
  PersonalDetails: undefined;
  IDCard: undefined;
  Settings: undefined;
  Privacy: undefined;
  Help: undefined;
};

// Drawer Types
export type DrawerParamList = {
  Home: undefined;
  LostFound: undefined;
  BusTracking: undefined;
  Notifications: undefined;
  Timetable: undefined;
  Attendance: undefined;
  Marketplace: undefined;
  Events: undefined;
  Library: undefined;
  Complaints: undefined;
  HostelServices: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  Logout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const { user, logout } = useAppStore();

  const drawerItems = [
    { name: 'Home', icon: Home, route: 'Home' },
    { name: 'Lost & Found', icon: Search, route: 'LostFound' },
    { name: 'Bus Tracking', icon: MapPin, route: 'BusTracking' },
    { name: 'Notifications', icon: Bell, route: 'Notifications' },
    { name: 'Timetable', icon: BookOpen, route: 'Timetable' },
    { name: 'Attendance', icon: Settings, route: 'Attendance', soon: true },
    { name: 'Marketplace', icon: Settings, route: 'Marketplace', soon: true },
    { name: 'Events', icon: Settings, route: 'Events', soon: true },
    { name: 'Library', icon: BookOpen, route: 'Library' },
    { name: 'Complaints', icon: MessageSquare, route: 'Complaints', soon: true },
    { name: 'Hostel Services', icon: Settings, route: 'HostelServices', soon: true },
    { name: 'Settings', icon: Settings, route: 'Settings' },
    { name: 'Help & Support', icon: HelpCircle, route: 'HelpSupport' },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {/* Drawer Header */}
      <View className="bg-gradient-to-r from-primary to-secondary-light px-6 pt-12 pb-6">
        <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center mb-3">
          <Text className="text-2xl font-bold text-primary">
            {user?.name?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text className="text-lg font-bold text-white">{user?.name || 'User'}</Text>
        <Text className="text-white/80 text-sm">
          {user?.role === 'student' ? `Roll No: ${user?.rollNo}` : user?.department}
        </Text>
      </View>

      {/* Drawer Items */}
      {drawerItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => {
            if (item.route === 'Logout') {
              logout();
            } else {
              props.navigation.navigate(item.route);
              props.navigation.closeDrawer();
            }
          }}
          className="flex-row items-center px-4 py-3 mx-2 my-1 rounded-xl"
        >
          <item.icon size={20} color="#6B7280" />
          <Text className="ml-4 flex-1 text-gray-700 dark:text-gray-300 font-medium">
            {item.name}
          </Text>
          {item.soon && (
            <View className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
              <Text className="text-xs text-gray-500">Soon</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Logout */}
      <TouchableOpacity
        onPress={() => {
          logout();
          props.navigation.navigate('Onboarding');
        }}
        className="flex-row items-center px-4 py-3 mx-2 mt-4 rounded-xl bg-alert/10"
      >
        <LogOut size={20} color="#EF4444" />
        <Text className="ml-4 text-alert font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Auth Stack
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// Main Tabs
const MainTabNavigator = () => (
  <MainTabs.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let IconComponent;
        switch (route.name) {
          case 'Home':
            IconComponent = Home;
            break;
          case 'LostFound':
            IconComponent = Search;
            break;
          case 'Notifications':
            IconComponent = Bell;
            break;
          case 'Profile':
            IconComponent = User;
            break;
          default:
            IconComponent = Home;
        }
        return <IconComponent size={size} color={focused ? '#2563EB' : '#9CA3AF'} />;
      },
      tabBarActiveTintColor: '#2563EB',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingBottom: 8,
        paddingTop: 8,
        height: 65,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    })}
  >
    <MainTabs.Screen name="Home" component={HomeScreen} />
    <MainTabs.Screen name="LostFound" component={LostFoundScreen} options={{ title: 'Lost & Found' }} />
    <MainTabs.Screen name="Notifications" component={NotificationsScreen} />
    <MainTabs.Screen name="Profile" component={ProfileScreen} />
  </MainTabs.Navigator>
);

// Main Stack with nested tabs
const MainStackNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="MainTabs" component={MainTabNavigator} />
    <MainStack.Screen name="BusTracking" component={BusTrackingScreen} />
    <MainStack.Screen name="Timetable" component={TimetableScreen} />
    <MainStack.Screen name="Library" component={LibraryScreen} />
    <MainStack.Screen name="MoreServices" component={MoreServicesScreen} />
    <MainStack.Screen name="ReportLostItem" component={ReportLostItemScreen} options={{ title: 'Report Item' }} />
    <MainStack.Screen name="LostItemDetail" component={MoreServicesScreen} />
    <MainStack.Screen name="PersonalDetails" component={MoreServicesScreen} />
    <MainStack.Screen name="IDCard" component={MoreServicesScreen} />
    <MainStack.Screen name="Settings" component={MoreServicesScreen} />
    <MainStack.Screen name="Privacy" component={MoreServicesScreen} />
    <MainStack.Screen name="Help" component={MoreServicesScreen} />
  </MainStack.Navigator>
);

// Main App Navigator
export const AppNavigator = () => {
  const { isAuthenticated, isDarkMode } = useAppStore();

  const theme = isDarkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: '#2563EB',
          background: '#111827',
          card: '#1F2937',
          text: '#F9FAFB',
          border: '#374151',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: '#2563EB',
          background: '#F9FAFB',
          card: '#FFFFFF',
          text: '#111827',
          border: '#E5E7EB',
        },
      };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        ) : (
          <Stack.Screen name="MainDrawer" component={MainStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
