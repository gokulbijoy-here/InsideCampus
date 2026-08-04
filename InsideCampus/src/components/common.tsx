import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, Bell, User, MapPin, BookOpen, Grid, MoreHorizontal, ChevronRight, Bus } from 'lucide-react-native';

interface QuickAccessTileProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  bgColor?: string;
}

export const QuickAccessTile: React.FC<QuickAccessTileProps> = ({
  icon,
  title,
  onPress,
  bgColor = 'bg-white dark:bg-gray-800',
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${bgColor} rounded-2xl p-4 items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700`}
  >
    {icon}
    <Text className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
      {title}
    </Text>
  </TouchableOpacity>
);

interface NotificationCardProps {
  title: string;
  message: string;
  type: 'announcement' | 'event' | 'alert' | 'reminder';
  isRead: boolean;
  time: string;
  onPress?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  type,
  isRead,
  time,
  onPress,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      case 'event':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
      case 'announcement':
        return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mb-3 p-4 rounded-2xl border ${getTypeColor()} ${!isRead ? 'bg-opacity-50' : ''}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {message}
          </Text>
          <Text className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {time}
          </Text>
        </View>
        {!isRead && (
          <View className="w-2 h-2 bg-primary rounded-full" />
        )}
      </View>
    </TouchableOpacity>
  );
};

interface LostItemCardProps {
  item: {
    id: string;
    title: string;
    category: string;
    location: string;
    date: string;
    status: 'lost' | 'found' | 'claimed';
    matchScore?: number;
  };
  onPress?: () => void;
}

export const LostItemCard: React.FC<LostItemCardProps> = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 dark:border-gray-700"
  >
    <View className="flex-row items-start">
      <View className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl items-center justify-center mr-3">
        <Search size={24} color="#6B7280" />
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <Text className="text-base font-semibold text-gray-900 dark:text-white flex-1">
            {item.title}
          </Text>
          {item.matchScore && (
            <View className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full ml-2">
              <Text className="text-xs font-semibold text-green-600 dark:text-green-400">
                {item.matchScore}% Match
              </Text>
            </View>
          )}
        </View>
        <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {item.category}
        </Text>
        <View className="flex-row items-center mt-2">
          <MapPin size={12} color="#6B7280" />
          <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            {item.location}
          </Text>
        </View>
        <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {item.date}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

interface ServiceCardProps {
  name: string;
  icon: string;
  soon?: boolean;
  onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ name, icon, soon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={soon}
    className="bg-white dark:bg-gray-800 rounded-2xl p-4 items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 opacity-90"
  >
    <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center">
      <Grid size={24} color="#2563EB" />
    </View>
    <Text className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
      {name}
    </Text>
    {soon && (
      <View className="mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
        <Text className="text-xs text-gray-500 dark:text-gray-400">Soon</Text>
      </View>
    )}
  </TouchableOpacity>
);

interface BusBannerProps {
  busNumber: string;
  eta: number;
  stopName: string;
  onPress?: () => void;
}

export const BusBanner: React.FC<BusBannerProps> = ({ busNumber, eta, stopName, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-gradient-to-r from-primary to-secondary-light rounded-2xl p-4 shadow-lg"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <View className="flex-row items-center">
          <Bus size={20} color="#FFFFFF" />
          <Text className="ml-2 text-white font-semibold">
            Bus {busNumber}
          </Text>
        </View>
        <Text className="text-white/90 text-sm mt-1">
          Arriving in {eta} min at {stopName}
        </Text>
      </View>
      <ChevronRight size={24} color="#FFFFFF" />
    </View>
  </TouchableOpacity>
);
