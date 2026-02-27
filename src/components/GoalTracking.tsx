import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useStore } from '../store';
import Card from './ui/Card';

export default function GoalTracking() {
  const goal = useStore((state) => state.goal);
  const percentage = Math.round((goal.currentScore / goal.targetScore) * 100);
  const remaining = goal.targetScore - goal.currentScore;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Goal Tracking</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Target Score</p>
            <p className="text-2xl font-bold text-text-primary">{goal.targetScore}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Current Score</p>
            <p className="text-2xl font-bold text-gradient">{goal.currentScore}%</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Progress</span>
            <span className="text-sm font-bold text-primary">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
            />
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl border border-indigo-500/20">
          <p className="text-sm text-text-secondary">
            {remaining > 0 ? (
              <>You need <span className="font-bold text-primary">{remaining}%</span> more to reach your goal!</>
            ) : (
              <span className="font-bold text-success">🎉 Goal achieved!</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
