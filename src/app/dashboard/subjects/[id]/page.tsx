// src/app/dashboard/subjects/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Define the Chapter and Subject interfaces
interface Chapter {
  id: number;
  title: string;
  subjectId: number;
}

interface Subject {
  id: number;
  name: string;
  chapters?: Chapter[]; // Make chapters optional
}

export default function SubjectDetailsPage() {
  const { id } = useParams(); // Get the subject ID from the URL
  const [subject, setSubject] = useState<Subject | null>(null); // Define type for subject
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get<Subject>(`/api/subjects/${id}`); // Specify the response type
        setSubject(response.data);
      } catch (err) {
        setError('Failed to fetch subject details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {subject?.name}
        </h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Chapters</h2>
          {subject?.chapters && subject.chapters.length > 0 ? ( // Check if chapters exist and has length > 0
            <ul className="list-disc pl-6">
              {subject.chapters.map((chapter: Chapter) => ( // Define type for chapter
                <li key={chapter.id} className="text-gray-700">
                  {chapter.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No chapters found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}