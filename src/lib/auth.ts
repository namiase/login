import { create } from 'zustand';
import { AuthState } from './types';

// Mock user data - Replace with actual API calls in production
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'John Administrator',
    role: 'admin',
  },
];

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  isAuthenticated: false,
}));

export const login = async (email: string, password: string) => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const { password: _, ...userData } = user;
    useAuthStore.setState({
      user: userData,
      isAuthenticated: true,
    });
    return true;
  }
  return false;
};

export const logout = () => {
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
  });
};

export const requestPasswordReset = async (email: string) => {
  const user = mockUsers.find((u) => u.email === email);
  return !!user;
};