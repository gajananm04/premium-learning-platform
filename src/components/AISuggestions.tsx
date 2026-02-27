import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Card from './ui/Card';

const suggestions = [
  'Focus on trigonometry concepts in Mathematics - practice 30 mins daily',
  'Review World War II timeline in History - create flashcards',
  'Improve essay structure in English - read sample essays',
];

export default function AISuggestions() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">AI-Powered Suggestions</h3>
      </div>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="p-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold text-sm mt-0.5">{index + 1}.</span>
              <p className="text-sm text-text-primary flex-1">{suggestion}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-gray-50 rounded-xl"
      >
        <p className="text-xs text-text-secondary text-center">
          💡 Suggestions updated based on your recent performance
        </p>
      </motion.div>
    </Card>
  );
}
