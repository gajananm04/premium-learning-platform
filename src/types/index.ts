export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  overallScore: number;
  completionRate: number;
  subjects: SubjectProgress[];
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface SubjectProgress {
  subject: string;
  score: number;
  progress: number;
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
  status: 'pending' | 'completed' | 'graded';
}

export interface Submission {
  id: string;
  studentName: string;
  assessmentTitle: string;
  subject: string;
  score: number;
  totalMarks: number;
  submittedAt: string;
}

export interface PerformanceData {
  month: string;
  score: number;
}

export interface AssessmentComparison {
  assessment: string;
  avgScore: number;
}

export interface Notification {
  id: string;
  type: 'low-score' | 'missed-submission' | 'at-risk';
  message: string;
  studentName: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface Goal {
  targetScore: number;
  currentScore: number;
}

export interface ClassComparison {
  studentScore: number;
  classAverage: number;
  delta: number;
}
