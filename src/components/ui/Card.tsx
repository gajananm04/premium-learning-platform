import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={cn('bg-card rounded-2xl shadow-sm border border-border p-6 transition-shadow duration-300 hover:shadow-xl', className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
);

Card.displayName = 'Card';
export default Card;
