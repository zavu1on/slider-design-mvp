import { redirect } from 'next/navigation';
import { getSessionOrLogin } from '@/entities/auth';

export default async function NotFound() {
  await getSessionOrLogin();
  redirect('/slides');
}
