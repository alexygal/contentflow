import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  requiredRole?: 'creator' | 'admin' | null;
}

export default function ProtectedRoute({ children, requiredRole = null }: Props) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
