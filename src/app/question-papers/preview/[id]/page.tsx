// src/app/question-papers/preview/[id]/page.tsx 

import { notFound } from 'next/navigation';
import axios from 'axios';
import PdfViewer from '@/components/PdfViewer';

export default async function QuestionPaperPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // now params is awaited

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await axios.get(`${baseUrl}/api/question-papers/${id}`);
    const questionPaper = response.data;

    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">{questionPaper.name}</h1>
        <PdfViewer filePath={questionPaper.filePath} />
      </div>
    );
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      notFound();
    }
    console.error('Error fetching question paper:', error.message);
    return <div>Failed to load question paper.</div>;
  }
}

