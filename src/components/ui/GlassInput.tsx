import { forwardRef, type InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, icon: Icon, label, ...props }, ref) => (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'w-full px-4 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/40',
            'text-gray-900 placeholder:text-gray-400',
            'shadow-inner focus:shadow-lg',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50',
            'transition-all duration-300',
            Icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
);

GlassInput.displayName = 'GlassInput';
export default GlassInput;
