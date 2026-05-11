import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  displayName: string;
  organizationId: string;
}

interface Wallet {
  id: string;
  currency: string;
  balance: string;
  availableBalance: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  wallets: Wallet[];
  
  setUser: (user: User | null) => void;
  setWallets: (wallets: Wallet[]) => void;
  logout: () => void;
}

const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await AsyncStorage.getItem(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  wallets: [],

  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  
  setWallets: (wallets: Wallet[]) => set({ wallets }),
  
  logout: () => set({ user: null, isAuthenticated: false, wallets: [] }),
}));