import { Metadata } from 'next';
import { Login } from '@/pages/Login';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return <Login />;
}
