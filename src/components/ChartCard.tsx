import { type ReactNode } from 'react';
import Card from './ui/Card';

interface ChartCardProps { title: string; children: ReactNode; }

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-primary mb-6">{title}</h3>
      {children}
    </Card>
  );
}
