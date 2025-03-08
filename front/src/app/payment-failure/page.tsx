import Failure from '@/components/Memberships/Failure';
import { Suspense } from 'react';

export default function FailurePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Failure />
    </Suspense>
  );
}
