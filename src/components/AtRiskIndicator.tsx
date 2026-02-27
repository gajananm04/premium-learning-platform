import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { Student } from '../types';

interface AtRiskIndicatorProps {
  student: Student;
}

export default function AtRiskIndicator({ student }: AtRiskIndicatorProps) {
  if (!student.riskLevel || student.riskLevel === 'low') return null;

  const config = {
    medium: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', label: 'Medium Risk' },
    high: { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', label: 'High Risk' },
  };

  const { color, bg, border, label } = config[student.riskLevel];

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color} ${bg} border ${border}`}
    >
      <AlertTriangle className="w-3 h-3" />
      {label}
    </motion.div>
  );
}
