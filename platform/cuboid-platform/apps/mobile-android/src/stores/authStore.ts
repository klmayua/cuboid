import { create } from 'zustand';
import { persist, createJSONStorage } from '@react-native-async-storage/async-storage';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      wallets: [],

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setWallets: (wallets) => set({ wallets }),
      
      logout: () => set({ user: null, isAuthenticated: false, wallets: [] }),
    }),
    {
      name: 'cuboid-auth',
      storage: createJSONStorage(() => AsyncStorage)),
    }
  )
);