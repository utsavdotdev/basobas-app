import { create } from 'zustand';

type Role = 'tenant' | 'landlord' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  login: (role) => set({ isAuthenticated: true, role }),
  logout: () => set({ isAuthenticated: false, role: null }),
  setRole: (role) => set({ role }),
}));
