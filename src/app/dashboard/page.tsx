// src/app/dashboard/page.tsx
'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please Login</div>;
  }

  return (
    <DashboardLayout>
      <>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {session.user?.name}!</h1>
        <p className="text-gray-600">Here is whats happening today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Chapters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">45</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">120</p>
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
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <p className="text-gray-700">Added a new chapter: <strong>Circular Motion</strong></p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <p className="text-gray-700">Created a new question paper: <strong>Physics Midterm</strong></p>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <p className="text-gray-700">Updated subject: <strong>Chemistry</strong></p>
            </li>
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
    </DashboardLayout>
    
  );
}