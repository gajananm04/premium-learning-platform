import { TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useStore } from '../store';
import StatCard from '../components/StatCard';
import ProgressCard from '../components/ProgressCard';
import ChartCard from '../components/ChartCard';
import Card from '../components/ui/Card';
import AchievementBadges from '../components/AchievementBadges';
import GoalTracking from '../components/GoalTracking';
import ClassComparison from '../components/ClassComparison';
import AISuggestions from '../components/AISuggestions';

export default function StudentDashboard() {
  const students = useStore((state) => state.students);
  const student = students[0];
  const radarData = student.subjects.map((s) => ({ subject: s.subject, score: s.score }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-3xl" />
        <div className="relative p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-border">
          <h1 className="text-3xl font-bold text-gradient">Welcome back, {student.name}!</h1>
          <p className="text-text-secondary mt-1">Here's your learning progress overview</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Overall Score" value={`${student.overallScore}%`} icon={TrendingUp} trend={{ value: 5, isPositive: true }} delay={0} />
        <StatCard title="Completion Rate" value={`${student.completionRate}%`} icon={Award} trend={{ value: 8, isPositive: true }} delay={0.1} />
        <StatCard title="Subjects Enrolled" value={student.subjects.length} icon={Clock} delay={0.2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <AchievementBadges />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <GoalTracking />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <ClassComparison />
        </motion.div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Subject Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {student.subjects.map((subject, index) => (
            <motion.div key={subject.subject} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.1 }}>
              <ProgressCard subject={subject.subject} score={subject.score} progress={subject.progress} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <ChartCard title="Skills Assessment">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" stroke="#6B7280" />
                <PolarRadiusAxis stroke="#6B7280" />
                <Radar name="Score" dataKey="score" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Assessments</h3>
            <div className="space-y-3">
              {[
                { title: 'Final Exam - Calculus', subject: 'Mathematics', date: '2024-04-15' },
                { title: 'Chemistry Lab Test', subject: 'Science', date: '2024-04-18' },
                { title: 'Literature Essay', subject: 'English', date: '2024-04-20' },
              ].map((assessment, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + index * 0.1 }} className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl hover:from-indigo-500/10 hover:to-purple-500/10 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary">{assessment.title}</p>
                    <p className="text-sm text-text-secondary">{assessment.subject}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-medium text-text-secondary">{new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
        <AISuggestions />
      </motion.div>
    </div>
  );
}
