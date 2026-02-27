import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useStore } from '../store';
import type { Assessment } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

export default function Assessments() {
  const { assessments, addAssessment, updateAssessment, deleteAssessment } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const { register, handleSubmit, reset } = useForm<Omit<Assessment, 'id'>>();

  const onSubmit = (data: Omit<Assessment, 'id'>) => {
    if (editingAssessment) updateAssessment(editingAssessment.id, data);
    else addAssessment({ ...data, id: Date.now().toString() });
    setIsModalOpen(false);
    setEditingAssessment(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Assessments</h1>
          <p className="text-text-secondary mt-1">Manage all assessments and exams</p>
        </div>
        <Button onClick={() => { setEditingAssessment(null); reset(); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />Add Assessment
        </Button>
      </motion.div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['Title', 'Subject', 'Date', 'Total Marks', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assessments.map((a, index) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-text-primary font-medium">{a.title}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{a.subject}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{a.totalMarks}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${a.status === 'completed' ? 'bg-success/10 text-success' : a.status === 'graded' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>{a.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setEditingAssessment(a); setIsModalOpen(true); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-text-secondary" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => confirm('Delete this assessment?') && deleteAssessment(a.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-danger" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingAssessment(null); reset(); }} title={editingAssessment ? 'Edit Assessment' : 'Add New Assessment'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
            <Input {...register('title', { required: true })} defaultValue={editingAssessment?.title} placeholder="Enter assessment title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Subject</label>
            <Input {...register('subject', { required: true })} defaultValue={editingAssessment?.subject} placeholder="Enter subject" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Date</label>
            <Input type="date" {...register('date', { required: true })} defaultValue={editingAssessment?.date} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Total Marks</label>
              <Input type="number" {...register('totalMarks', { required: true, valueAsNumber: true })} defaultValue={editingAssessment?.totalMarks} placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Passing Marks</label>
              <Input type="number" {...register('passingMarks', { required: true, valueAsNumber: true })} defaultValue={editingAssessment?.passingMarks} placeholder="40" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
            <select {...register('status', { required: true })} defaultValue={editingAssessment?.status || 'pending'} className="w-full px-4 py-2 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="graded">Graded</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">{editingAssessment ? 'Update' : 'Create'} Assessment</Button>
            <Button type="button" variant="secondary" onClick={() => { setIsModalOpen(false); setEditingAssessment(null); reset(); }}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
