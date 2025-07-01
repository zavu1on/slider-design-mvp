import type { Metadata } from 'next';
import { Profile } from '@/pages/Profile';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function ProfilePage() {
  return <Profile />;
}
