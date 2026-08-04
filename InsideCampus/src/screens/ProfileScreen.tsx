import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User, Settings, Shield, HelpCircle, LogOut, CreditCard, Calendar, BookOpen, MessageSquare, Home, Bus, Bell, Search } from 'lucide-react-native';
import { useAppStore } from '../../store/appStore';
import { ServiceCard } from '../../components/common';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout, isDarkMode, toggleTheme } = useAppStore();

  const menuItems = [
    { id: '1', icon: User, label: 'Personal Details', route: 'PersonalDetails' },
    { id: '2', icon: CreditCard, label: 'ID Card', route: 'IDCard' },
    { id: '3', icon: Settings, label: 'Settings', route: 'Settings' },
    { id: '4', icon: Shield, label: 'Privacy & Security', route: 'Privacy' },
    { id: '5', icon: HelpCircle, label: 'Help & Support', route: 'Help' },
  ];

  const moreServices = [
    { id: '1', name: 'Marketplace', icon: 'shopping-cart', soon: true },
    { id: '2', name: 'Complaints', icon: 'message-square', soon: true },
    { id: '3', name: 'Fees', icon: 'credit-card', soon: true },
    { id: '4', name: 'AI Assistant', icon: 'cpu', soon: true },
    { id: '5', name: 'Attendance', icon: 'check-square', soon: true },
    { id: '6', name: 'Events', icon: 'calendar', soon: false },
    { id: '7', name: 'Hostel', icon: 'home', soon: true },
    { id: '8', name: 'Transport', icon: 'bus', soon: false },
  ];

  const handleLogout = () => {
    logout();
    navigation.navigate('Onboarding');
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-gradient-to-r from-primary to-secondary-light px-4 pt-12 pb-8">
          <View className="items-center">
            <View className="w-24 h-24 bg-white rounded-2xl items-center justify-center mb-4 shadow-lg">
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} className="w-full h-full rounded-2xl" />
              ) : (
                <Text className="text-4xl font-bold text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </Text>
              )}
            </View>
            <Text className="text-xl font-bold text-white">{user?.name || 'User'}</Text>
            <Text className="text-white/80 mt-1">
              {user?.role === 'student' ? `Roll No: ${user?.rollNo}` : 'Staff Member'}
            </Text>
            <Text className="text-white/80">{user?.department}</Text>
            
            <View className="mt-4 flex-row space-x-2">
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-medium capitalize">{user?.role}</Text>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-medium">Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 py-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Links
          </Text>
          <View className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate(item.route)}
                className={`flex-row items-center px-4 py-4 ${
                  index < menuItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                }`}
              >
                <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mr-4">
                  <item.icon size={20} color="#2563EB" />
                </View>
                <Text className="flex-1 text-gray-900 dark:text-white font-medium">
                  {item.label}
                </Text>
                <View className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center">
                  <View className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Services Grid */}
        <View className="px-4 py-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            More Services
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {moreServices.map((service) => (
              <View key={service.id} className="w-[23%] mb-3">
                <ServiceCard
                  name={service.name}
                  icon={service.icon}
                  soon={service.soon}
                  onPress={() => !service.soon && navigation.navigate(service.name)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Theme Toggle */}
        <View className="px-4 py-6">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mr-4">
                  {isDarkMode ? (
                    <View className="w-5 h-5 bg-yellow-500 rounded-full" />
                  ) : (
                    <View className="w-5 h-5 bg-blue-500 rounded-full" />
                  )}
                </View>
                <Text className="text-gray-900 dark:text-white font-medium">
                  Dark Mode
                </Text>
              </View>
              <TouchableOpacity
                onPress={toggleTheme}
                className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <View
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-4 py-6 pb-24">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center bg-alert/10 rounded-2xl py-4 border border-alert/20"
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="ml-2 text-alert font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Placeholder screens for other services
export const BusTrackingScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
    <Bus size={64} color="#2563EB" />
    <Text className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Bus Tracking</Text>
    <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center px-8">
      Live map integration coming soon with real-time bus location and ETA
    </Text>
  </View>
);

export const TimetableScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
    <Calendar size={64} color="#2563EB" />
    <Text className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Timetable</Text>
    <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center px-8">
      Your class schedule will appear here
    </Text>
  </View>
);

export const LibraryScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
    <BookOpen size={64} color="#2563EB" />
    <Text className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Library</Text>
    <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center px-8">
      Library services and book search coming soon
    </Text>
  </View>
);

export const MoreServicesScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
    <Settings size={64} color="#2563EB" />
    <Text className="mt-4 text-xl font-bold text-gray-900 dark:text-white">More Services</Text>
    <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center px-8">
      Additional campus services will be available here
    </Text>
  </View>
);
