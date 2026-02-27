import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import Card from './ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  delay?: number;
}

export default function StatCard({ title, value, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, duration: 0.5, type: "spring" }}
              className="text-3xl font-bold text-text-primary mb-2"
            >
              {value}
            </motion.p>
            {trend && (
              <p className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
