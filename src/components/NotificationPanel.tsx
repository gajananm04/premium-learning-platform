import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useStore } from '../store';

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useStore((state) => state.notifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'low-score': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'missed-submission': return <XCircle className="w-4 h-4 text-danger" />;
      case 'at-risk': return <AlertTriangle className="w-4 h-4 text-danger" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
      >
        <Bell className="w-5 h-5 text-text-secondary" />
        {notifications.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-text-primary">Notifications</h3>
              <p className="text-xs text-text-secondary mt-1">{notifications.length} new alerts</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-border last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{notification.studentName}</p>
                      <p className="text-xs text-text-secondary mt-1">{notification.message}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
