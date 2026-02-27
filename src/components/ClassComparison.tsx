import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '../store';
import Card from './ui/Card';

export default function ClassComparison() {
  const comparison = useStore((state) => state.classComparison);
  const isAboveAverage = comparison.delta > 0;

  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Class Comparison</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
            <p className="text-sm text-text-secondary mb-1">Your Score</p>
            <p className="text-2xl font-bold text-gradient">{comparison.studentScore}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-text-secondary mb-1">Class Average</p>
            <p className="text-2xl font-bold text-text-primary">{comparison.classAverage}%</p>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-xl border-2 ${
            isAboveAverage
              ? 'bg-success/5 border-success/20'
              : 'bg-warning/5 border-warning/20'
          }`}
        >
          <div className="flex items-center gap-2">
            {isAboveAverage ? (
              <TrendingUp className="w-5 h-5 text-success" />
            ) : (
              <TrendingDown className="w-5 h-5 text-warning" />
            )}
            <div>
              <p className={`text-sm font-bold ${isAboveAverage ? 'text-success' : 'text-warning'}`}>
                {isAboveAverage ? '+' : ''}{comparison.delta}% {isAboveAverage ? 'above' : 'below'} average
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {isAboveAverage
                  ? 'Great job! Keep up the excellent work!'
                  : 'You can improve! Focus on weak areas.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
