import { useState } from 'react';
import { Users, TrendingUp, CheckCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import NotificationPanel from '../components/NotificationPanel';
import AtRiskIndicator from '../components/AtRiskIndicator';

export default function Dashboard() {
  const { students, submissions, performanceData, assessmentComparison } = useStore();
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [timeFilter, setTimeFilter] = useState<'this-month' | 'last-month'>('this-month');
  const [showExportModal, setShowExportModal] = useState(false);
  
  const totalStudents = students.length;
  const avgScore = Math.round(students.reduce((acc, s) => acc + s.overallScore, 0) / students.length);
  const avgCompletion = Math.round(students.reduce((acc, s) => acc + s.completionRate, 0) / students.length);
  const atRiskCount = students.filter(s => s.riskLevel === 'high' || s.riskLevel === 'medium').length;

  const filteredStudents = riskFilter === 'all' ? students : students.filter(s => s.riskLevel === riskFilter);
  const currentData = timeFilter === 'this-month' ? performanceData : performanceData.map(d => ({ ...d, score: d.score - 5 }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-3xl" />
        <div className="relative flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
            <p className="text-text-secondary mt-1">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationPanel />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowExportModal(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl hover:shadow-lg transition-all">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={totalStudents} icon={Users} trend={{ value: 12, isPositive: true }} delay={0} />
        <StatCard title="Average Score" value={`${avgScore}%`} icon={TrendingUp} trend={{ value: 5, isPositive: true }} delay={0.1} />
        <StatCard title="Completion Rate" value={`${avgCompletion}%`} icon={CheckCircle} trend={{ value: 3, isPositive: true }} delay={0.2} />
        <StatCard title="At-Risk Students" value={atRiskCount} icon={Users} delay={0.3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-text-secondary">Filter by Risk:</span>
        {['all', 'low', 'medium', 'high'].map((level) => (
          <button key={level} onClick={() => setRiskFilter(level as typeof riskFilter)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${riskFilter === level ? 'bg-primary text-white' : 'bg-white border border-border hover:border-primary'}`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <ChartCard title="Performance Over Time">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setTimeFilter('this-month')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${timeFilter === 'this-month' ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'}`}>
                This Month
              </button>
              <button onClick={() => setTimeFilter('last-month')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${timeFilter === 'last-month' ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'}`}>
                Last Month
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="score" stroke="url(#colorGradient)" strokeWidth={3} dot={{ fill: '#4F46E5', r: 4 }} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <ChartCard title="Assessment Comparison">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assessmentComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="assessment" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }} />
                <Bar dataKey="avgScore" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Students Overview</h3>
            <span className="text-sm text-text-secondary">{filteredStudents.length} students</span>
          </div>
          <div className="space-y-3">
            {filteredStudents.slice(0, 5).map((student, index) => (
              <motion.div key={student.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + index * 0.1 }} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{student.name}</p>
                  <p className="text-xs text-text-secondary">{student.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-primary">{student.overallScore}%</p>
                    <p className="text-xs text-text-secondary">Score</p>
                  </div>
                  <AtRiskIndicator student={student} />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Submissions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Student', 'Assessment', 'Subject', 'Score', 'Date'].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, index) => (
                  <motion.tr key={s.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + index * 0.1, duration: 0.3 }} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-text-primary font-medium">{s.studentName}</td>
                    <td className="py-3 px-4 text-sm text-text-primary">{s.assessmentTitle}</td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{s.subject}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">{s.score}/{s.totalMarks}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-text-secondary">{new Date(s.submittedAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Export Analytics">
        <div className="space-y-4">
          <p className="text-text-secondary">Select the data you want to export:</p>
          <div className="space-y-2">
            {['Student Performance', 'Assessment Results', 'Attendance Records', 'Progress Reports'].map((item) => (
              <label key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" defaultChecked />
                <span className="text-sm font-medium text-text-primary">{item}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <Button className="flex-1"><Download className="w-4 h-4 mr-2" />Export as CSV</Button>
            <Button variant="secondary" onClick={() => setShowExportModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
