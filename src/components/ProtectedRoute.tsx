import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export const ProtectedRoute = ({ children, roles }: { children: ReactNode; roles?: UserRole[] }) => {
  const { user, hasAccess } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !hasAccess(roles)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};
