import Pending from '@/components/Memberships/Pending';
import { Suspense } from 'react';

export default function PendingPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Pending />
    </Suspense>
  );
}
