import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, Lock, Chrome, LayoutGrid } from 'lucide-react-native';
import { useAppStore } from '../../store/appStore';

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'One App. Many Services.',
      subtitle: 'Access all campus utilities in one place',
    },
    {
      title: 'Smarter Campus Life',
      subtitle: 'Track buses, find lost items, get notifications',
    },
    {
      title: 'Stay Connected',
      subtitle: 'Never miss important announcements',
    },
  ];

  return (
    <LinearGradient
      colors={['#2563EB', '#1D4ED8']}
      className="flex-1"
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const slideIndex = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layout.width);
          setCurrentSlide(slideIndex);
        }}
      >
        {slides.map((slide, index) => (
          <View key={index} className="w-full flex-1 justify-center items-center px-8">
            <View className="w-32 h-32 bg-white/20 rounded-3xl items-center justify-center mb-8">
              <LayoutGrid size={64} color="#FFFFFF" />
            </View>
            <Text className="text-3xl font-bold text-white text-center mb-4">
              {slide.title}
            </Text>
            <Text className="text-lg text-white/80 text-center">
              {slide.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-center items-center mb-8">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 mx-1 rounded-full ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </View>

      <View className="px-8 pb-12 space-y-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="bg-white rounded-2xl py-4 items-center shadow-lg"
        >
          <Text className="text-primary font-bold text-lg">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="bg-white/20 rounded-2xl py-4 items-center border border-white/30"
        >
          <Text className="text-white font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAppStore();

  const handleLogin = () => {
    // Mock login - in production, this would call an API
    setUser({
      id: '1',
      name: 'Gokul',
      email: email || 'gokul@campus.edu',
      role: userType,
      rollNo: userType === 'student' ? 'CS2024001' : undefined,
      department: 'Computer Science',
      avatar: 'https://ui-avatars.com/api/?name=Gokul&background=2563EB&color=fff',
    });
    navigation.replace('MainTabs');
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-24 h-24 bg-primary rounded-3xl items-center justify-center mb-4">
            <LayoutGrid size={48} color="#FFFFFF" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            InsideCampus
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mt-2">
            Your Campus Companion
          </Text>
        </View>

        {/* User Type Toggle */}
        <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex-row mb-6">
          <TouchableOpacity
            onPress={() => setUserType('student')}
            className={`flex-1 py-3 rounded-lg items-center ${
              userType === 'student' ? 'bg-white dark:bg-gray-700 shadow' : ''
            }`}
          >
            <Text className={`font-semibold ${userType === 'student' ? 'text-primary' : 'text-gray-500'}`}>
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType('staff')}
            className={`flex-1 py-3 rounded-lg items-center ${
              userType === 'staff' ? 'bg-white dark:bg-gray-700 shadow' : ''
            }`}
          >
            <Text className={`font-semibold ${userType === 'staff' ? 'text-primary' : 'text-gray-500'}`}>
              Staff
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {userType === 'student' ? 'College Email / Register No.' : 'Staff Email'}
          </Text>
          <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
            <Mail size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900 dark:text-white"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </Text>
          <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
            <Lock size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900 dark:text-white"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-8">
          <Text className="text-primary font-medium">Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-primary rounded-2xl py-4 items-center mb-6 shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <Text className="mx-4 text-gray-500 dark:text-gray-400">or continue with</Text>
          <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </View>

        {/* SSO Buttons */}
        <View className="flex-row space-x-4 mb-8">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white dark:bg-gray-800 rounded-xl py-3 border border-gray-200 dark:border-gray-700 shadow-sm">
            <Chrome size={20} color="#DB4437" />
            <Text className="ml-2 font-medium text-gray-700 dark:text-gray-300">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white dark:bg-gray-800 rounded-xl py-3 border border-gray-200 dark:border-gray-700 shadow-sm">
            <LayoutGrid size={20} color="#00A4EF" />
            <Text className="ml-2 font-medium text-gray-700 dark:text-gray-300">Microsoft</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
