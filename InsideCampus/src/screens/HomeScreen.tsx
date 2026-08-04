import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Home, Search, Bell, User, MapPin, BookOpen, Grid, MoreHorizontal, Sun, Moon } from 'lucide-react-native';
import { useAppStore } from '../../store/appStore';
import { QuickAccessTile, BusBanner, LostItemCard, NotificationCard } from '../../components/common';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, isDarkMode, toggleTheme, notifications, lostItems } = useAppStore();

  const quickAccessServices = [
    { id: '1', name: 'Lost & Found', icon: Search, route: 'LostFound' },
    { id: '2', name: 'Notifications', icon: Bell, route: 'Notifications' },
    { id: '3', name: 'Bus Tracking', icon: MapPin, route: 'BusTracking' },
    { id: '4', name: 'Timetable', icon: BookOpen, route: 'Timetable' },
    { id: '5', name: 'Library', icon: BookOpen, route: 'Library' },
    { id: '6', name: 'More', icon: MoreHorizontal, route: 'MoreServices' },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <ScrollView className="flex-1 px-4 pt-12 pb-24">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-sm text-gray-500 dark:text-gray-400">Good Morning 👋</Text>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Hello, {user?.name || 'User'}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity onPress={toggleTheme} className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              {isDarkMode ? (
                <Sun size={20} color="#F59E0B" />
              ) : (
                <Moon size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Notifications')}
              className="relative p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <Bell size={20} color="#6B7280" />
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-alert w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-xs text-white font-bold">{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')}
              className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
            >
              <Text className="text-white font-bold text-lg">
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Bus Banner */}
        <View className="mb-6">
          <BusBanner
            busNumber="03"
            eta={5}
            stopName="Main Gate"
            onPress={() => navigation.navigate('BusTracking')}
          />
        </View>

        {/* Quick Access Grid */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Access
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickAccessServices.map((service) => (
              <View key={service.id} className="w-[31%] mb-3">
                <QuickAccessTile
                  icon={<service.icon size={24} color="#2563EB" />}
                  title={service.name}
                  onPress={() => navigation.navigate(service.route)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* AI Matches Banner */}
        {lostItems.some(item => item.matchScore && item.matchScore > 90) && (
          <View className="mb-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('LostFound')}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl items-center justify-center mr-3">
                    <Search size={20} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-green-800 dark:text-green-400">
                      AI Match Found!
                    </Text>
                    <Text className="text-xs text-green-600 dark:text-green-500">
                      95% match for your lost item
                    </Text>
                  </View>
                </View>
                <MoreHorizontal size={20} color="#10B981" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Activity */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium text-sm">View All</Text>
            </TouchableOpacity>
          </View>

          {notifications.slice(0, 3).map((notification) => (
            <NotificationCard
              key={notification.id}
              title={notification.title}
              message={notification.message}
              type={notification.type}
              isRead={notification.isRead}
              time={new Date(notification.createdAt).toLocaleDateString()}
              onPress={() => navigation.navigate('Notifications')}
            />
          ))}
        </View>

        {/* Recent Lost Items */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Lost Items
            </Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium text-sm">View All</Text>
            </TouchableOpacity>
          </View>

          {lostItems.slice(0, 2).map((item) => (
            <LostItemCard
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                category: item.category,
                location: item.location,
                date: item.date,
                status: item.status,
                matchScore: item.matchScore,
              }}
              onPress={() => navigation.navigate('LostFound')}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
