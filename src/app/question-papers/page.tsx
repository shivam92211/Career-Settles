
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface QuestionPaper {
  id: number;
  name: string;
  createdAt: Date | string;
}

export default function QuestionPapersPage() {
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await axios.get('/api/question-papers');
        // Sort by date (latest first) and take the top 5
        const sortedPapers = response.data.sort(
          (a: QuestionPaper, b: QuestionPaper) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setQuestionPapers(sortedPapers.slice(0, 5)); // Take the top 5
      } catch (error) {
        console.error('Error fetching question papers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestionPapers();
  }, []);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
    );
  }

  return (
      <Card className="p-6 h-screen w-full">
        {/* Header with buttons */}
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Question Papers</CardTitle>
            <CardDescription>View and manage all your question papers.</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            {/* Paper List Button */}
            <Link href="/question-papers/list">
              <Button variant="outline">Paper List</Button>
            </Link>
            {/* Create New Question Paper Button */}
            <Link href="/question-papers/create">
              <Button>Create New Question Paper</Button>
            </Link>
          </div>
        </CardHeader>

        {/* Table to display question papers */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questionPapers.length > 0 ? (
                questionPapers.map((questionPaper) => (
                  <TableRow key={questionPaper.id}>
                    <TableCell>{questionPaper.name}</TableCell>
                    <TableCell>
                      {new Date(questionPaper.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      
                      <Link href={`/question-papers/preview/${questionPaper.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        
                        </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No question papers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}