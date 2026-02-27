import { User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gradient">Profile</h1>
        <p className="text-text-secondary mt-1">Manage your account information</p>
      </motion.div>

      <Card>
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text-primary">{user?.name}</h2>
            <p className="text-text-secondary mt-1">{user?.email}</p>
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-primary capitalize">
                <Shield className="w-4 h-4 mr-1" />{user?.role}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Personal Information</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
              <Input defaultValue={user?.name} placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
              <Input type="email" defaultValue={user?.email} placeholder="Enter your email" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="secondary">Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
