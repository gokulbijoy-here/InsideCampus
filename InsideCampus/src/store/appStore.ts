import { create } from 'zustand';
import { User, LostItem, Notification, Activity } from '../types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Theme state
  isDarkMode: boolean;
  
  // Data state
  lostItems: LostItem[];
  notifications: Notification[];
  recentActivities: Activity[];
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  addLostItem: (item: LostItem) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  logout: () => void;
}

// Mock data for development
const mockUser: User = {
  id: '1',
  name: 'Gokul',
  email: 'gokul@campus.edu',
  role: 'student',
  rollNo: 'CS2024001',
  department: 'Computer Science',
  avatar: 'https://ui-avatars.com/api/?name=Gokul&background=2563EB&color=fff',
};

const mockLostItems: LostItem[] = [
  {
    id: '1',
    title: 'Black Backpack',
    category: 'Accessories',
    description: 'Black backpack with laptop compartment',
    location: 'Library',
    date: '2024-01-15',
    time: '14:30',
    images: [],
    status: 'lost',
    reporterId: '1',
    reporterName: 'Gokul',
    matchScore: 95,
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    title: 'Blue Water Bottle',
    category: 'Other',
    description: 'Milton blue water bottle',
    location: 'Sports Complex',
    date: '2024-01-14',
    time: '10:00',
    images: [],
    status: 'found',
    reporterId: '2',
    reporterName: 'Admin',
    createdAt: '2024-01-14T10:00:00Z',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Semester Results Published',
    message: 'Your semester results are now available on the portal.',
    type: 'alert',
    isRead: false,
    isPinned: true,
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    title: 'Campus Event Tomorrow',
    message: 'Annual tech fest starts tomorrow at 10 AM.',
    type: 'event',
    isRead: false,
    isPinned: false,
    createdAt: '2024-01-14T15:00:00Z',
  },
  {
    id: '3',
    title: 'Library Hours Extended',
    message: 'Library will remain open until 10 PM during exams.',
    type: 'announcement',
    isRead: true,
    isPinned: false,
    createdAt: '2024-01-13T12:00:00Z',
  },
];

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  user: mockUser,
  isAuthenticated: true,
  isLoading: false,
  isDarkMode: false,
  lostItems: mockLostItems,
  notifications: mockNotifications,
  recentActivities: [],
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  addLostItem: (item) =>
    set((state) => ({ lostItems: [item, ...state.lostItems] })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
