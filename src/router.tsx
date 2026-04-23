import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public pages
import LandingApp from '../landing';
import FeaturesPage from './pages/public/FeaturesPage';
import PricingPage from './pages/public/PricingPage';
import BlogPage from './pages/public/BlogPage';
import BlogPostPage from './pages/public/BlogPostPage';
import HelpPage from './pages/public/HelpPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import CompleteProfilePage from './pages/auth/CompleteProfilePage';

// Dashboard pages
import OverviewPage from './pages/dashboard/OverviewPage';
import CreatePage from './pages/dashboard/CreatePage';
import OperationsPage from './pages/dashboard/OperationsPage';
import PartnershipsPage from './pages/dashboard/PartnershipsPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import ApprovalsPage from './pages/dashboard/ApprovalsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import AdminPage from './pages/dashboard/AdminPage';
import TeamDashboardPage from './pages/dashboard/TeamDashboardPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing page — standalone, uses its own internal layout */}
          <Route path="/" element={<LandingApp />} />

          {/* Public pages — shared nav + footer */}
          <Route element={<PublicLayout />}>
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>

          {/* Auth pages — centered card layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
          </Route>

          {/* Dashboard — protected, requires auth */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="operations" element={<OperationsPage />} />
            <Route path="partnerships" element={<PartnershipsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="team" element={<TeamDashboardPage />} />
          </Route>

          {/* Admin — protected at router level with role check */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminPage />} />
          </Route>

          {/* Post-signup brand setup — requires auth, no layout wrapper */}
          <Route path="/auth/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
