

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Subject } from '@/models/models';
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
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch('/api/subjects');
        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast.error('Failed to fetch subjects. Please try again.'); // Show toast notification
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (subjectId === null) {
      toast.error('Please select a subject.'); // Show toast notification
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
        toast.success('Chapter created successfully!'); // Show success toast
        router.push('/dashboard/chapters');
      } else {
        toast.error('Failed to create chapter. Please try again.'); // Show error toast
        console.error('Failed to create chapter');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.'); // Show error toast
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

              {/* Subject Select */}
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