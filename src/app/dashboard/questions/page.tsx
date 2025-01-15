
// app/dashboard/questions/page.tsx

'use client';
import { Question } from "@/models/models";
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Import shadcn/ui Card
import { Skeleton } from "@/components/ui/skeleton"; // Import shadcn/ui Skeleton
import { Trash2, Edit } from 'lucide-react'; // Import icons

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('/api/questions');
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to fetch questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete question');
      }
      // Refresh the questions list after deletion
      const updatedQuestions = questions.filter((q) => q.id !== questionId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Questions</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
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
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
          <Link href="/dashboard/questions/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create New Question
            </Button>
          </Link>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{question.content}</CardTitle>
                <CardDescription className="text-gray-600">
                  Type: {question.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <p className="text-sm text-gray-500">
                  Created At: {new Date(question.createdAt).toLocaleDateString()}
                </p> */}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Link href={`/dashboard/questions/${question.id}/edit`}>
                  <Button size="sm" variant="outline" className="text-blue-600">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {questions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No questions found. Create one to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}