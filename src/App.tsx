import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Students from './pages/Students';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'student' }) {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace />;
  return <>{children}</>;
}

function App() {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to={user.role === 'admin' ? '/dashboard' : '/student/dashboard'} replace /> : <Signup />} />
        <Route path="/" element={<ProtectedRoute allowedRole="admin"><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="students" element={<Students />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/student" element={<ProtectedRoute allowedRole="student"><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
