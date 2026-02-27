import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, User, Shield } from 'lucide-react';
import { useStore } from '../store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: '1', name: selectedRole === 'admin' ? 'John Doe' : 'Alice Johnson', email: email || (selectedRole === 'admin' ? 'admin@example.com' : 'student@example.com'), role: selectedRole };
    setUser(user);
    navigate(selectedRole === 'admin' ? '/dashboard' : '/student/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4 shadow-lg"
          >
            <BarChart3 className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gradient mb-2">LearnTrack</h1>
          <p className="text-text-secondary">Student Learning Outcomes Platform</p>
        </div>
        <Card>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Sign In</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ role: 'admin', icon: Shield, label: 'Admin' }, { role: 'student', icon: User, label: 'Student' }].map(({ role, icon: Icon, label }) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedRole(role as 'admin' | 'student')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedRole === role ? 'border-primary bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'border-border hover:border-primary/50'}`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${selectedRole === role ? 'text-primary' : 'text-text-secondary'}`} />
                <p className={`text-sm font-medium ${selectedRole === role ? 'text-primary' : 'text-text-secondary'}`}>{label}</p>
              </motion.button>
            ))}
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" size="lg">Sign In as {selectedRole === 'admin' ? 'Admin' : 'Student'}</Button>
          </form>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="w-full mt-4 px-6 py-3 rounded-xl border border-border bg-white text-text-primary font-medium hover:border-primary hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Sign Up
          </motion.button>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl border border-indigo-500/20">
            <p className="text-xs text-text-secondary text-center">Demo Mode: Click "Sign In" to access the platform</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
