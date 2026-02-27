import { Search, User } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

export default function Students() {
  const students = useStore((state) => state.students);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Students</h1>
          <p className="text-text-secondary mt-1">View and manage student information</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <Input type="text" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div key={student.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary truncate">{student.name}</h3>
                  <p className="text-sm text-text-secondary truncate">{student.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Overall Score</span>
                  <span className="text-sm font-semibold text-text-primary">{student.overallScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Completion Rate</span>
                  <span className="text-sm font-semibold text-text-primary">{student.completionRate}%</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${student.completionRate}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
