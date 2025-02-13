// src/app/dashboard/question-papers/create/CreateQuestionPaperPage.tsx

'use client';
import { useState } from 'react';
import ClassSelection from './ClassSelection';
import SubjectSelection from './SubjectSelection';
import QuestionList from './QuestionList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axios from 'axios';

interface Question {
  id: number;
  content: string;
}

export default function CreateQuestionPaperPage() {
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [name, setName] = useState<string>(''); // Name of the question paper
  const [isLoading, setIsLoading] = useState(false);

  const handleAddQuestion = (question: Question) => {
    setSelectedQuestions((prev) =>
      prev.some((q) => q.id === question.id)
        ? prev.filter((q) => q.id !== question.id) // Remove question
        : [...prev, question] // Add question
    );
  };

  const handlePreviewPDF = async () => {
    if (!name || selectedQuestions.length === 0) {
      alert('Please provide a name and select at least one question.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/question-papers/generate-pdf', {
        name,
        questions: selectedQuestions,
      }, { responseType: 'blob' });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      window.open(url, '_blank'); // Open the PDF in a new tab
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert('Failed to generate PDF preview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!name || selectedQuestions.length === 0) {
      alert('Please provide a name and select at least one question.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/question-papers/generate-pdf', {
        name,
        questions: selectedQuestions,
      }, { responseType: 'blob' });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.pdf`; // Use the name for the downloaded file
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePDF = async () => {
    if (!name || selectedQuestions.length === 0) {
      alert('Please provide a name and select at least one question.');
      return;
    }

    setIsLoading(true);

    try {
      // Generate the PDF as a Blob
      const response = await axios.post('/api/question-papers/generate-pdf', {
        name,
        questions: selectedQuestions,
      }, { responseType: 'blob' });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Create a FormData object to send the PDF and metadata
      const formData = new FormData();
      formData.append('name', name);
      formData.append('questions', JSON.stringify(selectedQuestions));
      formData.append('pdfFile', pdfBlob, `${name}.pdf`);

      // Send the data to the backend for saving
      await axios.post('/api/question-papers/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Question paper saved successfully!');
    } catch (error) {
      console.error('Error saving question paper:', error);
      alert('Failed to save question paper. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Create Question Paper</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter question paper name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* Class Selection */}
        <ClassSelection onClassChange={setSelectedClassId} />
        {/* Subject Selection */}
        <SubjectSelection classId={selectedClassId} onSubjectChange={setSelectedSubjectId} />
        {/* Question List */}
        <QuestionList
          subjectId={selectedSubjectId}
          onAddQuestion={handleAddQuestion}
          selectedQuestions={selectedQuestions}
        />
        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button onClick={handlePreviewPDF} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Generating...' : 'Preview PDF'}
          </Button>
          <Button onClick={handleGeneratePDF} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Generating...' : 'Generate PDF'}
          </Button>
          <Button onClick={handleSavePDF} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}