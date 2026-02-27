import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import DashboardLayout from './layouts/DashboardLayout';
import CleanLogin from './pages/CleanLogin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Students from './pages/Students';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'student' }) {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace />;
  return <>{children}</>;
}

function App() {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace /> : <CleanLogin />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace /> : <CleanLogin />} />
        <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace /> : <Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRole="admin"><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/assessments" element={<ProtectedRoute allowedRole="admin"><DashboardLayout><Assessments /></DashboardLayout></ProtectedRoute>} />
        <Route path="/students" element={<ProtectedRoute allowedRole="admin"><DashboardLayout><Students /></DashboardLayout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRole="admin"><DashboardLayout><Reports /></DashboardLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
        <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><DashboardLayout><StudentDashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/student/assessments" element={<ProtectedRoute allowedRole="student"><DashboardLayout><Assessments /></DashboardLayout></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRole="student"><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
