import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardHome from './pages/DashboardHome';
import ActivityPage from './pages/ActivityPage';
import ProofPage from './pages/ProofPage';
import ApplicationPage from './pages/ApplicationPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import RulesManagement from './pages/RulesManagement';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardHome />} />
        <Route path="activities" element={<ActivityPage />} />
        <Route path="proofs" element={<ProofPage />} />
        <Route path="applications" element={<ApplicationPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="rules" element={<RulesManagement />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
