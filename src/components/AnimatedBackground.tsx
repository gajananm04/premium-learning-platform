import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-50/30 to-cyan-50/30" />
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}
