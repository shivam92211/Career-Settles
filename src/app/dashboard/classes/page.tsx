'use client';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Class } from "@/models/models"; // Assuming you have a Class model
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from 'lucide-react'; // Loading spinner from lucide-react
import axios from 'axios'; // Import axios

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes'); // Fetch classes from API
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
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
          <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
          <Link href="/dashboard/classes/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Create New Class
            </Button>
          </Link>
        </div>
        {/* Classes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <Link
              key={cls.id}
              href={`/dashboard/classes/${cls.id}`} // Navigate to class details
              className="block"
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cls.name}
                </h2>
                <p className="text-gray-600">Subjects: {cls.subjects?.length || 0}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* Empty State */}
        {classes.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No classes found. Create one to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}