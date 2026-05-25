'use client';
import { trpc } from '@/trpc/trpc';

export default function Health() {
  const healthQuery = trpc.health.useQuery();
  console.log(healthQuery);
  return (
    <div>
      <h1>Health Route</h1>
    </div>
  );
}
