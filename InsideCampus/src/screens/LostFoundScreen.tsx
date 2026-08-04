import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Search, Filter, Plus, MapPin, Calendar, Clock, Camera, ChevronRight, Check } from 'lucide-react-native';
import { useAppStore } from '../../store/appStore';
import { LostItemCard } from '../../components/common';
import { ItemCategory } from '../../types';

interface LostFoundScreenProps {
  navigation: any;
}

export const LostFoundScreen: React.FC<LostFoundScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const { lostItems } = useAppStore();

  const filteredItems = lostItems.filter(
    (item) =>
      item.status === activeTab &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const aiMatches = lostItems.filter((item) => item.matchScore && item.matchScore > 90);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 px-4 pt-12 pb-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lost & Found
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 mb-4">
          <Search size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3 text-gray-900 dark:text-white"
            placeholder="Search items..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('lost')}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === 'lost' ? 'bg-white dark:bg-gray-600 shadow' : ''
            }`}
          >
            <Text
              className={`font-semibold ${
                activeTab === 'lost' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Lost Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('found')}
            className={`flex-1 py-2 rounded-lg items-center ${
              activeTab === 'found' ? 'bg-white dark:bg-gray-600 shadow' : ''
            }`}
          >
            <Text
              className={`font-semibold ${
                activeTab === 'found' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Found Items
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        {/* AI Matches Banner */}
        {aiMatches.length > 0 && activeTab === 'lost' && (
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              AI Matches for You
            </Text>
            {aiMatches.map((item) => (
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
                onPress={() => navigation.navigate('LostItemDetail', { item })}
              />
            ))}
          </View>
        )}

        {/* Recent Feed */}
        <View>
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Recent {activeTab === 'lost' ? 'Lost' : 'Found'} Items
          </Text>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
                onPress={() => navigation.navigate('LostItemDetail', { item })}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Search size={48} color="#9CA3AF" />
              <Text className="mt-4 text-gray-500 dark:text-gray-400 text-center">
                No items found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ReportLostItem')}
        className="absolute bottom-20 right-4 w-14 h-14 bg-primary rounded-2xl items-center justify-center shadow-lg"
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

// Report Lost Item Multi-step Form
export const ReportLostItemScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '' as ItemCategory | '',
    location: '',
    date: '',
    time: '',
    description: '',
    images: [] as string[],
  });

  const categories: ItemCategory[] = [
    'Electronics',
    'Books',
    'Clothing',
    'Accessories',
    'Stationery',
    'Sports',
    'Other',
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // In production, this would save to backend
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 px-4 pt-12 pb-4 shadow-sm">
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Report Lost Item
        </Text>

        {/* Progress Indicator */}
        <View className="flex-row items-center">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  s <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {s < step ? (
                  <Check size={20} color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold">{s}</Text>
                )}
              </View>
              {s < 3 && (
                <View
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-xs text-gray-500 dark:text-gray-400">Details</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">Photos</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">Review</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        {/* Step 1: Details */}
        {step === 1 && (
          <>
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Item Name
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white"
                placeholder="e.g., Black Backpack"
                placeholderTextColor="#9CA3AF"
                value={formData.itemName}
                onChangeText={(text) => setFormData({ ...formData, itemName: text })}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </Text>
              <View className="flex-row flex-wrap">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-2 rounded-xl mr-2 mb-2 border ${
                      formData.category === cat
                        ? 'bg-primary border-primary'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Text
                      className={`font-medium ${
                        formData.category === cat ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lost Location
              </Text>
              <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
                <MapPin size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900 dark:text-white"
                  placeholder="Where did you lose it?"
                  placeholderTextColor="#9CA3AF"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                />
              </View>
            </View>

            <View className="flex-row space-x-4 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </Text>
                <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
                  <Calendar size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#9CA3AF"
                    value={formData.date}
                    onChangeText={(text) => setFormData({ ...formData, date: text })}
                  />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </Text>
                <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
                  <Clock size={20} color="#6B7280" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 dark:text-white"
                    placeholder="HH:MM"
                    placeholderTextColor="#9CA3AF"
                    value={formData.time}
                    onChangeText={(text) => setFormData({ ...formData, time: text })}
                  />
                </View>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-white h-32 text-top"
                placeholder="Describe your item in detail..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
              />
            </View>
          </>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <View className="items-center justify-center py-12">
            <View className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Camera size={48} color="#9CA3AF" />
            </View>
            <Text className="mt-4 text-gray-500 dark:text-gray-400 text-center">
              Add photos of your item
            </Text>
            <TouchableOpacity className="mt-4 bg-primary px-6 py-3 rounded-xl">
              <Text className="text-white font-semibold">Upload Photos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Review Information
            </Text>
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 dark:text-gray-400">Item Name:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">{formData.itemName}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 dark:text-gray-400">Category:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">{formData.category}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 dark:text-gray-400">Location:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">{formData.location}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500 dark:text-gray-400">Date & Time:</Text>
                <Text className="text-gray-900 dark:text-white font-medium">
                  {formData.date} at {formData.time}
                </Text>
              </View>
              <View className="mt-2">
                <Text className="text-gray-500 dark:text-gray-400 mb-1">Description:</Text>
                <Text className="text-gray-900 dark:text-white">{formData.description}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="flex-row px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {step > 1 && (
          <TouchableOpacity
            onPress={handleBack}
            className="flex-1 mr-2 bg-gray-100 dark:bg-gray-700 rounded-xl py-3 items-center"
          >
            <Text className="text-gray-700 dark:text-gray-300 font-semibold">Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={step === 3 ? handleSubmit : handleNext}
          className={`flex-1 ${step > 1 ? 'ml-2' : ''} bg-primary rounded-xl py-3 items-center`}
        >
          <Text className="text-white font-semibold">
            {step === 3 ? 'Submit Report' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
