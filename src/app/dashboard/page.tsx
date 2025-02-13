// src/app/dashboard/page.tsx


import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DashboardClient from './DashboardClient'; // New client component
import { getDashboardData } from '@/lib/dashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Redirect unauthorized users
  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
        <p className="mt-4 text-lg text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  // Fetch dashboard data on the server side
  const { stats, recentActivity } = await getDashboardData();

  return (
    <DashboardLayout>
      <DashboardClient stats={stats} recentActivity={recentActivity} />
    </DashboardLayout>
  );
}