import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, Filter, Check, Info, Calendar, AlertTriangle, Megaphone } from 'lucide-react-native';
import { useAppStore } from '../../store/appStore';
import { NotificationCard } from '../../components/common';

interface NotificationsScreenProps {
  navigation: any;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'announcements' | 'events' | 'alerts'>('all');
  const { notifications, markNotificationRead } = useAppStore();

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const pinnedNotifications = filteredNotifications.filter((n) => n.isPinned);
  const otherNotifications = filteredNotifications.filter((n) => !n.isPinned);

  // Group by date
  const groupByDate = (items: typeof notifications) => {
    const groups: { [key: string]: typeof notifications } = {};
    items.forEach((item) => {
      const date = new Date(item.createdAt).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    });
    return groups;
  };

  const groupedNotifications = groupByDate(otherNotifications);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={16} color="#EF4444" />;
      case 'event':
        return <Calendar size={16} color="#3B82F6" />;
      case 'announcement':
        return <Megaphone size={16} color="#10B981" />;
      default:
        return <Info size={16} color="#6B7280" />;
    }
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 px-4 pt-12 pb-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Notifications
        </Text>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'announcements', label: 'Announcements' },
              { id: 'events', label: 'Events' },
              { id: 'alerts', label: 'Alerts' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-xl border ${
                  activeFilter === filter.id
                    ? 'bg-primary border-primary'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                }`}
              >
                <Text
                  className={`font-medium ${
                    activeFilter === filter.id ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* Pinned Section */}
        {pinnedNotifications.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <Bell size={18} color="#EF4444" />
              <Text className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Pinned
              </Text>
            </View>
            {pinnedNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                isRead={notification.isRead}
                time={new Date(notification.createdAt).toLocaleDateString()}
                onPress={() => markNotificationRead(notification.id)}
              />
            ))}
          </View>
        )}

        {/* Timeline Feed */}
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <View key={date} className="mb-6">
            <View className="flex-row items-center mb-3">
              <View className="w-2 h-2 bg-primary rounded-full mr-2" />
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {date}
              </Text>
            </View>
            {items.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                isRead={notification.isRead}
                time={new Date(notification.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                onPress={() => markNotificationRead(notification.id)}
              />
            ))}
          </View>
        ))}

        {filteredNotifications.length === 0 && (
          <View className="items-center justify-center py-12">
            <Bell size={48} color="#9CA3AF" />
            <Text className="mt-4 text-gray-500 dark:text-gray-400 text-center">
              No notifications
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
