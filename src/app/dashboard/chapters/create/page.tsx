// src/app/dashboard/chapters/create/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Class, Subject } from '@/models/models'; // Import Class and Subject models
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { Input } from '@/components/ui/input'; // shadcn/ui Input
import { Label } from '@/components/ui/label'; // shadcn/ui Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // shadcn/ui Select
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'; // shadcn/ui Card
import { toast } from 'sonner'; // For toast notifications
import Link from 'next/link';

export default function CreateChapterPage() {
  const [title, setTitle] = useState('');
  const [classId, setClassId] = useState<number | null>(null); // State for selected class ID
  const [subjectId, setSubjectId] = useState<number | null>(null); // State for selected subject ID
  const [classes, setClasses] = useState<Class[]>([]); // State for list of classes
  const [subjects, setSubjects] = useState<Subject[]>([]); // State for list of subjects
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
        toast.error('Failed to fetch classes. Please try again.');
      }
    };
    fetchClasses();
  }, []);

  // Fetch subjects based on the selected class
  useEffect(() => {
    const fetchSubjects = async () => {
      if (classId) {
        try {
          const res = await fetch(`/api/subjects?classId=${classId}`);
          const data = await res.json();
          setSubjects(data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
          toast.error('Failed to fetch subjects. Please try again.');
        }
      } else {
        setSubjects([]); // Reset subjects if no class is selected
      }
    };
    fetchSubjects();
  }, [classId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!classId || !subjectId) {
      toast.error('Please select a class and a subject.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subjectId }),
      });

      if (res.ok) {
        toast.success('Chapter created successfully!');
        router.push('/dashboard/chapters');
      } else {
        toast.error('Failed to create chapter. Please try again.');
        console.error('Failed to create chapter');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error creating chapter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-50 p-4 sm:p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create Chapter</CardTitle>
            <CardDescription className="text-center">
              Add a new chapter to your dashboard.
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

              {/* Subject Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={subjectId?.toString() || ''}
                  onValueChange={(value) => setSubjectId(parseInt(value))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">Chapter Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter chapter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Chapter'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-600">
            <p>
              Go back to{' '}
              <Link href="/dashboard/chapters" className="text-blue-600 hover:underline">
                Chapters
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}