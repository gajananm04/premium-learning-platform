import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Desktop: sidebar visible by default, Mobile: hidden by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Desktop: always open
      } else {
        setSidebarOpen(false); // Mobile: closed by default
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: toggle collapsed mode
      setIsCollapsed(!isCollapsed);
    } else {
      // Mobile: open overlay
      setSidebarOpen(true);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AnimatedBackground />
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={isCollapsed}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <Navbar onMenuClick={handleMenuClick} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 lg:p-8">{children}</div>
        </motion.main>
      </div>
    </div>
  );
}
