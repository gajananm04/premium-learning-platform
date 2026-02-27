import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, User, Shield, Mail, Lock } from 'lucide-react';
import { useStore } from '../store';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: '1',
      name: selectedRole === 'admin' ? 'John Doe' : 'Alice Johnson',
      email: email || (selectedRole === 'admin' ? 'admin@example.com' : 'student@example.com'),
      role: selectedRole
    };
    setUser(user);
    navigate(selectedRole === 'admin' ? '/dashboard' : '/student/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-100/30 via-transparent to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4 shadow-lg"
          >
            <BarChart3 className="w-7 h-7 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            LearnTrack
          </h1>
          <p className="text-gray-500 text-sm">Student Learning Outcomes Platform</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'admin'
                  ? 'border-indigo-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Shield className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'admin' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <p className={`text-sm font-medium ${selectedRole === 'admin' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Admin
              </p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedRole === 'student'
                  ? 'border-indigo-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <User className={`w-6 h-6 mx-auto mb-2 ${selectedRole === 'student' ? 'text-indigo-600' : 'text-gray-400'}`} />
              <p className={`text-sm font-medium ${selectedRole === 'student' ? 'text-indigo-600' : 'text-gray-600'}`}>
                Student
              </p>
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign In as {selectedRole === 'admin' ? 'Admin' : 'Student'}
            </motion.button>

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="text-xs text-center text-gray-600">
              Demo Mode: Click "Sign In" to access the platform
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
