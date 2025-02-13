// src/app/dashboard/DashboardClient.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Stats {
  totalSubjects: number;
  totalChapters: number;
  totalQuestions: number;
}

interface ActivityLog {
  type: string;
  message: string;
  timestamp: Date;
}

interface DashboardClientProps {
  stats: Stats | null;
  recentActivity: ActivityLog[];
}

export default function DashboardClient({ stats, recentActivity }: DashboardClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for smoother transitions
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
        <p className="text-gray-600">Here is what's happening today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats?.totalSubjects ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats?.totalChapters ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{stats?.totalQuestions ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'Chapter'
                        ? 'bg-blue-600'
                        : activity.type === 'Question'
                        ? 'bg-green-600'
                        : 'bg-purple-600'
                    }`}
                  ></span>
                  <p className="text-gray-700">{activity.message}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No recent activity found.</p>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/subjects">
          <Card className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Subjects</CardTitle>
              <CardDescription className="text-gray-200">Manage and organize subjects.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/chapters">
          <Card className="bg-green-600 text-white hover:bg-green-700 transition duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Chapters</CardTitle>
              <CardDescription className="text-gray-200">Add and edit chapters for subjects.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/questions">
          <Card className="bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Questions</CardTitle>
              <CardDescription className="text-gray-200">Create and manage questions.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/dashboard/question-papers">
          <Card className="bg-red-600 text-white hover:bg-red-700 transition duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Question Papers</CardTitle>
              <CardDescription className="text-gray-200">Generate and organize question papers.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </>
  );
}