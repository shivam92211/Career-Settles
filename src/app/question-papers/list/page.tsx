
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface QuestionPaper {
  id: number;
  name: string;
  filePath: string;
  questions: { id: number; content: string }[];
}

export default function QuestionPaperListPage() {
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await axios.get('/api/question-papers/list');
        setQuestionPapers(response.data);
      } catch (error) {
        console.error('Error fetching question papers:', error);
      }
    };
    fetchQuestionPapers();
  }, []);

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'question-paper.pdf';
    link.click();
  };

  return (
      <div className="h-screen px-6 pt-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-xl font-bold">Saved Question Papers</h1>
          {/* Create New Question Paper Button */}
          <Link href="/question-papers/create">
            <Button className="mt-4 md:mt-0">Create New Question Paper</Button>
          </Link>
        </div>

        {/* Table Section */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionPapers.length > 0 ? (
              questionPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>{paper.name}</TableCell>
                  <TableCell>{paper.questions.length} questions</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* View Button */}
                      <Link href={`/question-papers/preview/${paper.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      {/* Download Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(paper.filePath)}
                      >
                        Download
                      </Button>
                    </div>
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
      </div>
  );
}