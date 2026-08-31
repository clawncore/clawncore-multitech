import { LogIn } from 'lucide-react';
import { ComingSoon } from '@/components/ComingSoon';

export default function Login() {
  return (
    <ComingSoon
      title="Sign In"
      subtitle="Secure authentication is on its way. You'll be able to access your account very soon."
      icon={<LogIn className="w-10 h-10 text-blue-400" />}
    />
  );
}
