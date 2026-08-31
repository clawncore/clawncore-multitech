import { Briefcase } from 'lucide-react';
import { ComingSoon } from '@/components/ComingSoon';

export default function CareersPage() {
  return (
    <ComingSoon
      title="Careers"
      subtitle="We're building something extraordinary. Job openings and applications will be available here soon."
      icon={<Briefcase className="w-10 h-10 text-blue-400" />}
    />
  );
}
