import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Reports() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Reports & Analytics</h1>
          <p className="text-text-secondary mt-1">Comprehensive performance insights</p>
        </div>
        <Button><Download className="w-4 h-4 mr-2" />Export Report</Button>
      </motion.div>
      <Card>
        <p className="text-text-secondary">Reports content coming soon...</p>
      </Card>
    </div>
  );
}
