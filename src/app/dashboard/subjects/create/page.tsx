'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from 'sonner'; // For toast notifications
import Link from 'next/link';

export default function CreateSubjectPage() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        toast.success('Subject created successfully!');
        router.push('/dashboard/subjects');
      } else {
        toast.error('Failed to create subject. Please try again.');
        console.error('Failed to create subject');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
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
              <div className="space-y-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter subject name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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