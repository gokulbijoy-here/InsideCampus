// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff';
  rollNo?: string;
  department: string;
  avatar?: string;
}

// Lost & Found types
export type ItemCategory = 
  | 'Electronics'
  | 'Books'
  | 'Clothing'
  | 'Accessories'
  | 'Stationery'
  | 'Sports'
  | 'Other';

export type ItemStatus = 'lost' | 'found' | 'claimed';

export interface LostItem {
  id: string;
  title: string;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  time: string;
  images: string[];
  status: ItemStatus;
  reporterId: string;
  reporterName: string;
  matchScore?: number;
  createdAt: string;
}

// Bus Tracking types
export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  estimatedArrival?: number; // minutes
}

export interface BusRoute {
  id: string;
  busNumber: string;
  stops: BusStop[];
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  eta: number; // minutes to next stop
  status: 'on-time' | 'delayed' | 'arrived';
}

// Notification types
export type NotificationType = 'announcement' | 'event' | 'alert' | 'reminder';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  isPinned: boolean;
  createdAt: string;
  link?: string;
}

// Activity types
export interface Activity {
  id: string;
  type: 'notification' | 'lost-item-match' | 'bus-update';
  title: string;
  timestamp: string;
  data?: any;
}

// Service types
export interface Service {
  id: string;
  name: string;
  icon: string;
  route: string;
  isAvailable: boolean;
  soon?: boolean;
}
