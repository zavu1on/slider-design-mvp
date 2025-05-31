import { hashPassword } from '@/entities/auth/lib/password';

export default function SlidesPage() {
  hashPassword('admin').then((v) => console.log(v));

  return <div>Slides</div>;
}
