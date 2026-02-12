import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { LanguageProvider } from './i18n/LanguageContext';
import LoginStep1 from './pages/auth/LoginStep1';
import LoginStep2 from './pages/auth/LoginStep2';
import RegisterStep1 from './pages/auth/RegisterStep1';
import RegisterStep2 from './pages/auth/RegisterStep2';
import TwoFactorEmail from './pages/auth/TwoFactorEmail';
import TwoFactorApp from './pages/auth/TwoFactorApp';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordSent from './pages/auth/ForgotPasswordSent';
import ResetPassword from './pages/ResetPassword';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ReleaseNotesPage from './pages/ReleaseNotesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import AssignProducts from './pages/admin/AssignProducts';
import ProductMetrics from './pages/ProductMetrics';
import CreatorMarketplace from './pages/CreatorMarketplace';
import Health from './pages/Health';
import DesignSystem from './pages/DesignSystem';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <LanguageProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            padding: '16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: {
              borderLeft: '4px solid #3ACE76',
              background: '#fff',
              color: '#3D3D3D',
            },
            iconTheme: {
              primary: '#3ACE76',
              secondary: '#EBFAF1',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #FC3E3E',
              background: '#fff',
              color: '#3D3D3D',
            },
            iconTheme: {
              primary: '#FC3E3E',
              secondary: '#FEF2F2',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={<LoginStep1 />} />
          <Route path="/login/email" element={<LoginStep2 />} />
          <Route path="/register" element={<RegisterStep1 />} />
          <Route path="/register/password" element={<RegisterStep2 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/2fa/email" element={<TwoFactorEmail />} />
          <Route path="/2fa/app" element={<TwoFactorApp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/metrics/:slug"
            element={
              <ProtectedRoute>
                <ProductMetrics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/release-notes"
            element={
              <ProtectedRoute>
                <ReleaseNotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<AssignProducts />} />
            <Route path="components" element={<DesignSystem />} />
            <Route path="creators" element={<CreatorMarketplace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
