import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn('w-full px-4 py-2 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300', className)} {...props} />
  )
);

Input.displayName = 'Input';
export default Input;
