import { motion } from 'framer-motion';
import { useStore } from '../store';
import Card from './ui/Card';

export default function AchievementBadges() {
  const achievements = useStore((state) => state.achievements);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Achievement Badges</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`p-4 rounded-xl text-center transition-all ${
              achievement.earned
                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-primary/20'
                : 'bg-gray-50 border-2 border-gray-200 opacity-50'
            }`}
          >
            <motion.div
              animate={achievement.earned ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="text-4xl mb-2"
            >
              {achievement.icon}
            </motion.div>
            <h4 className="font-semibold text-sm text-text-primary mb-1">{achievement.title}</h4>
            <p className="text-xs text-text-secondary">{achievement.description}</p>
            {achievement.earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="mt-2 text-xs font-medium text-success"
              >
                ✓ Earned
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
