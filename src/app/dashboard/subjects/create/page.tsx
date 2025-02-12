// src/app/dashboard/subjects/create/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { Input } from '@/components/ui/input'; // shadcn/ui Input
import { Label } from '@/components/ui/label'; // shadcn/ui Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // shadcn/ui Select
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // shadcn/ui Card
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from 'sonner'; // For toast notifications
import Link from 'next/link';
import { Class } from '@/models/models'; // Import the Class model

export default function CreateSubjectPage() {
  const [subjectName, setSubjectName] = useState(''); // State for subject name
  const [classId, setClassId] = useState<number | null>(null); // State for selected class ID
  const [classes, setClasses] = useState<Class[]>([]); // State for list of classes
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch all classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes');
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
        toast.error('Failed to fetch classes. Please try again.'); // Show toast notification
      }
    };
    fetchClasses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!classId) {
      toast.error('Please select a class.'); // Show toast notification
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className: classes.find((cls) => cls.id === classId)?.name, subjectName }), // Send both fields
      });

      if (res.ok) {
        toast.success('Subject created successfully!'); // Show success toast
        router.push('/dashboard/subjects');
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to create subject. Please try again.');
        console.error('Failed to create subject:', errorData.error);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.'); // Show error toast
      console.error('Error creating subject:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-50 p-4 sm:p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Subject</CardTitle>
            <CardDescription className="text-center">
              Add a new subject to your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Class Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={classId?.toString() || ''}
                  onValueChange={(value) => setClassId(parseInt(value))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Name Field */}
              <div className="space-y-2">
                <Label htmlFor="subjectName">Subject Name</Label>
                <Input
                  id="subjectName"
                  type="text"
                  placeholder="Enter subject name (e.g., Mathematics)"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Subject'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-600">
            <p>
              Go back to{' '}
              <Link href="/dashboard/subjects" className="text-blue-600 hover:underline">
                Subjects
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}