import { GuestOnly } from '@/components/auth/guest-only';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <GuestOnly>
      <LoginForm />
    </GuestOnly>
  );
}
