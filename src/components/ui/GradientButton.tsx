import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, isLoading, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative w-full px-6 py-3.5 rounded-xl font-semibold text-white',
        'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600',
        'shadow-lg hover:shadow-2xl',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        'transition-all duration-400',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'overflow-hidden',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      <span className="relative z-10">{isLoading ? 'Signing in...' : children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  )
);

GradientButton.displayName = 'GradientButton';
export default GradientButton;
