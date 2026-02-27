import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        { 'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl': variant === 'primary',
          'bg-white text-text-primary border border-border hover:bg-gray-50 shadow-sm': variant === 'secondary',
          'bg-danger text-white hover:bg-red-600 shadow-lg': variant === 'danger',
          'bg-transparent hover:bg-gray-100': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg' },
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = 'Button';
export default Button;
