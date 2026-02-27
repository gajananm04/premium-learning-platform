import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, Zap, Users } from 'lucide-react';
import { useStore } from '../store';
import GlassInput from '../components/ui/GlassInput';
import GradientButton from '../components/ui/GradientButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: email || 'admin@example.com',
        role: 'admin' as const
      };
      setUser(user);
      navigate('/dashboard');
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white space-y-8 hidden lg:block"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed">
                Access your premium learning platform and track student outcomes with powerful analytics.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enterprise Security</h3>
                  <p className="text-indigo-100 text-sm">Bank-level encryption for your data</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Real-time Analytics</h3>
                  <p className="text-indigo-100 text-sm">Track performance instantly</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Collaborative Tools</h3>
                  <p className="text-indigo-100 text-sm">Connect students and educators</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-3 pt-4">
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                ✨ AI-Powered
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                🚀 Fast & Reliable
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                🔒 Secure
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Glow Effect Behind Card */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-30" />
            
            {/* Glass Card */}
            <div className="relative backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl shadow-xl p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-indigo-100">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <GlassInput
                  type="email"
                  placeholder="name@company.com"
                  label="Email Address"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <GlassInput
                  type="password"
                  placeholder="Enter your password"
                  label="Password"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/40 bg-white/20 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-white">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-white hover:text-indigo-100 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <GradientButton type="submit" isLoading={isLoading}>
                  Sign In
                </GradientButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-indigo-100">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-white font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-xs text-center text-indigo-100">
                  Demo Mode: Use any email to sign in
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
