// src/app/dashboard/classes/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Define the Subject and Class interfaces
interface Subject {
  id: number;
  name: string;
  classId: number;
}

interface Class {
  id: number;
  name: string;
  subjects?: Subject[]; // Make subjects optional
}

export default function ClassDetailsPage() {
  const { id } = useParams(); // Get the class ID from the URL
  const [cls, setClass] = useState<Class | null>(null); // Define type for class
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get<Class>(`/api/classes/${id}`); // Fetch class details
        setClass(response.data);
      } catch (err) {
        setError('Failed to fetch class details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClass();
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{cls?.name}</h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Subjects</h2>
          {cls?.subjects && cls.subjects.length > 0 ? (
            <ul className="list-disc pl-6">
              {cls.subjects.map((subject: Subject) => (
                <li key={subject.id} className="text-gray-700">
                  {subject.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No subjects found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}