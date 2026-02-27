import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Users, BarChart3, User, X } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../utils/cn';

interface SidebarProps { isOpen: boolean; onClose: () => void; }

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const user = useStore((state) => state.user);
  const links = user?.role === 'admin' ? [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/assessments', icon: FileText, label: 'Assessments' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
    { to: '/profile', icon: User, label: 'Profile' },
  ] : [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/assessments', icon: FileText, label: 'My Assessments' },
    { to: '/student/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full bg-white border-r border-border z-50 w-64 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">LearnTrack</span>
            </div>
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) => cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                    isActive ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
                <p className="text-xs text-text-secondary truncate capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
