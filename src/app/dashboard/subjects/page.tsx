
// src/app/dashboard/subjects/page.tsx
'use client';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Subject } from "@/models/models";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react'; // Loading spinner from lucide-react
import axios from 'axios'; // Import axios

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects'); // Use axios.get instead of fetch
        setSubjects(response.data); // Access data directly from the response
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
          <Link href="/dashboard/subjects/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Create New Subject
            </Button>
          </Link>
        </div>

        {/* Subjects List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/dashboard/subjects/${subject.id}`} // Correctly pass the subject ID
              className="block"
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {subject.name}
                </h2>
                <p className="text-gray-600">Chapters: {subject.chapters?.length || 0}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No subjects found. Create one to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}