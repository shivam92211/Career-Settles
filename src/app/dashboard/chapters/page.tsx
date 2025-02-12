// src/app/dashboard/chapters/page.tsx

'use client';
import { Chapter, Subject } from "@/models/models"; // Import Chapter and Subject types
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import axios from 'axios'; // Import axios
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import { Loader2 } from 'lucide-react'; // Import loading spinner
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"; // Import shadcn/ui Card
import { toast } from 'sonner'; // For toast notifications

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<{ chapter: Chapter; subject: Subject }[]>([]); // Store chapters with their subjects
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestChapters = async () => {
      try {
        // Fetch the latest 5 chapters with their subjects
        const response = await axios.get('/api/chapters/latest');
        console.log('API Response:', response.data); // Log the API response for debugging
        setChapters(response.data); // Set chapters with subjects
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to fetch chapters'); // Set error message
        toast.error('Failed to fetch chapters. Please try again.'); // Show toast notification
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchLatestChapters();
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
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Latest Chapters</h1>
          <Link href="/dashboard/chapters/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Create New Chapter
            </Button>
          </Link>
        </div>

        {/* Chapters List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map(({ chapter, subject }, index) => (
            <Card
              key={chapter?.id || `chapter-${index}`} // Use chapter.id or a fallback key
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/dashboard/chapters/${chapter?.id}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {chapter?.title || 'Untitled Chapter'} {/* Fallback for missing title */}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Subject: {subject?.name || 'N/A'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Created At: {chapter?.createdAt ? new Date(chapter.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {chapters.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No chapters found.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}