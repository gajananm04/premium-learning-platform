import { create } from 'zustand';
import type { User, Student, Assessment, Submission, PerformanceData, AssessmentComparison, Notification, Achievement, Goal, ClassComparison } from '../types';

interface AppState {
  user: User | null;
  students: Student[];
  assessments: Assessment[];
  submissions: Submission[];
  performanceData: PerformanceData[];
  assessmentComparison: AssessmentComparison[];
  notifications: Notification[];
  achievements: Achievement[];
  goal: Goal;
  classComparison: ClassComparison;
  setUser: (user: User | null) => void;
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (id: string, assessment: Partial<Assessment>) => void;
  deleteAssessment: (id: string) => void;
  logout: () => void;
}

const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', overallScore: 87, completionRate: 92, riskLevel: 'low', subjects: [
    { subject: 'Mathematics', score: 85, progress: 90 },
    { subject: 'Science', score: 92, progress: 95 },
    { subject: 'English', score: 88, progress: 88 },
    { subject: 'History', score: 83, progress: 92 },
  ]},
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', overallScore: 78, completionRate: 85, riskLevel: 'medium', subjects: [
    { subject: 'Mathematics', score: 75, progress: 80 },
    { subject: 'Science', score: 80, progress: 88 },
    { subject: 'English', score: 82, progress: 90 },
    { subject: 'History', score: 76, progress: 82 },
  ]},
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', overallScore: 55, completionRate: 60, riskLevel: 'high', subjects: [
    { subject: 'Mathematics', score: 52, progress: 55 },
    { subject: 'Science', score: 58, progress: 65 },
    { subject: 'English', score: 60, progress: 62 },
    { subject: 'History', score: 50, progress: 58 },
  ]},
];

const mockAssessments: Assessment[] = [
  { id: '1', title: 'Midterm Exam - Algebra', subject: 'Mathematics', date: '2024-03-15', totalMarks: 100, passingMarks: 40, status: 'completed' },
  { id: '2', title: 'Physics Quiz', subject: 'Science', date: '2024-03-20', totalMarks: 50, passingMarks: 20, status: 'graded' },
  { id: '3', title: 'Essay Writing', subject: 'English', date: '2024-03-25', totalMarks: 100, passingMarks: 40, status: 'pending' },
];

const mockSubmissions: Submission[] = [
  { id: '1', studentName: 'Alice Johnson', assessmentTitle: 'Midterm Exam - Algebra', subject: 'Mathematics', score: 85, totalMarks: 100, submittedAt: '2024-03-15T10:30:00' },
  { id: '2', studentName: 'Bob Smith', assessmentTitle: 'Physics Quiz', subject: 'Science', score: 40, totalMarks: 50, submittedAt: '2024-03-20T14:20:00' },
];

const mockPerformanceData: PerformanceData[] = [
  { month: 'Jan', score: 75 }, { month: 'Feb', score: 78 }, { month: 'Mar', score: 82 },
  { month: 'Apr', score: 85 }, { month: 'May', score: 83 }, { month: 'Jun', score: 87 },
];

const mockAssessmentComparison: AssessmentComparison[] = [
  { assessment: 'Math', avgScore: 82 }, { assessment: 'Science', avgScore: 86 },
  { assessment: 'English', avgScore: 85 }, { assessment: 'History', avgScore: 79 },
];

const mockNotifications: Notification[] = [
  { id: '1', type: 'low-score', message: 'scored below 60% in Mathematics', studentName: 'Charlie Davis', timestamp: '2024-03-20T10:30:00' },
  { id: '2', type: 'missed-submission', message: 'missed Essay Writing submission', studentName: 'Bob Smith', timestamp: '2024-03-21T14:00:00' },
  { id: '3', type: 'at-risk', message: 'flagged as high-risk student', studentName: 'Charlie Davis', timestamp: '2024-03-22T09:00:00' },
];

const mockAchievements: Achievement[] = [
  { id: '1', title: 'Top Performer', description: 'Scored above 90% in all subjects', icon: '🏆', earned: false },
  { id: '2', title: 'Most Improved', description: 'Improved by 15% this semester', icon: '📈', earned: true },
  { id: '3', title: 'Consistent Performer', description: 'Maintained 85%+ for 3 months', icon: '⭐', earned: true },
];

const mockGoal: Goal = {
  targetScore: 90,
  currentScore: 87,
};

const mockClassComparison: ClassComparison = {
  studentScore: 87,
  classAverage: 78,
  delta: 9,
};

export const useStore = create<AppState>((set) => ({
  user: null,
  students: mockStudents,
  assessments: mockAssessments,
  submissions: mockSubmissions,
  performanceData: mockPerformanceData,
  assessmentComparison: mockAssessmentComparison,
  notifications: mockNotifications,
  achievements: mockAchievements,
  goal: mockGoal,
  classComparison: mockClassComparison,
  setUser: (user) => set({ user }),
  addAssessment: (assessment) => set((state) => ({ assessments: [...state.assessments, assessment] })),
  updateAssessment: (id, updatedAssessment) => set((state) => ({
    assessments: state.assessments.map((a) => a.id === id ? { ...a, ...updatedAssessment } : a),
  })),
  deleteAssessment: (id) => set((state) => ({ assessments: state.assessments.filter((a) => a.id !== id) })),
  logout: () => set({ user: null }),
}));
