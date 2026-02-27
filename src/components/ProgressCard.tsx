import { motion } from 'framer-motion';
import Card from './ui/Card';

interface ProgressCardProps { subject: string; score: number; progress: number; }

export default function ProgressCard({ subject, score, progress }: ProgressCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-text-primary">{subject}</h3>
        <span className="text-sm font-medium text-text-secondary">{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
        />
      </div>
      <p className="text-xs text-text-secondary mt-2">{progress}% Complete</p>
    </Card>
  );
}
