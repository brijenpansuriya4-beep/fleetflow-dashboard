import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { USERS } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (userId: string, password: string) => string | null;
  logout: () => void;
  hasAccess: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('fleetflow_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('fleetflow_user');
      }
    }
  }, []);

  const login = (userId: string, password: string): string | null => {
    const found = USERS.find(u => u.id === userId && u.password === password);
    if (!found) return 'Invalid User ID or Password. Please try again.';
    setUser(found);
    localStorage.setItem('fleetflow_user', JSON.stringify(found));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fleetflow_user');
  };

  const hasAccess = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
