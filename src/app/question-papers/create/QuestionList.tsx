// src/app/dashboard/question-papers/create/QuestionList.tsx

'use client';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import axios from 'axios';



interface Question {
  id: number;
  content: string;
  options?: { id: number; content: string; isCorrect: boolean }[]; // Add options field
}

interface QuestionListProps {
  subjectId: number | null;
  onAddQuestion: (question: Question) => void;
  selectedQuestions: Question[]; // Pass the selected questions to determine button state
}

export default function QuestionList({ subjectId, onAddQuestion, selectedQuestions }: QuestionListProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (subjectId) {
        try {
          const response = await axios.get(`/api/questions?subjectId=${subjectId}`);
          setQuestions(response.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      } else {
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [subjectId]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Questions</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.content}</TableCell>
                <TableCell>
                  {/* <Button
                    onClick={() => onAddQuestion(question)}
                    variant={selectedQuestions.some((q) => q.id === question.id) ? 'destructive' : 'default'}
                  >
                    {selectedQuestions.some((q) => q.id === question.id) ? 'Remove' : 'Add'}
                  </Button> */}
                  <Button
                    onClick={() => onAddQuestion(question)} // Pass the full question object
                    variant={selectedQuestions.some((q) => q.id === question.id) ? 'destructive' : 'default'}
                  >
                    {selectedQuestions.some((q) => q.id === question.id) ? 'Remove' : 'Add'}
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No questions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}