import { Menu, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

interface NavbarProps { onMenuClick: () => void; }

export default function Navbar({ onMenuClick }: NavbarProps) {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-border"
    >
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-text-primary">Student Learning Outcomes</h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full animate-pulse" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
