import { notFound } from 'next/navigation';
import axios from 'axios'; // Import axios
import PdfViewer from '@/components/PdfViewer'; // A custom PDF viewer component

interface Params {
  params: { id: string }; // Define the type for the dynamic parameter
}

export default async function QuestionPaperPreviewPage({ params }: Params) {
  const { id } = params; // Extract the `id` parameter

  try {
    // Fetch the question paper details using axios
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Use an environment variable for the base URL
    const response = await axios.get(`${baseUrl}/api/question-papers/${id}`);

    // Extract the question paper data
    const questionPaper = response.data;

    // Render the PDF viewer
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">{questionPaper.name}</h1>
        <PdfViewer filePath={questionPaper.filePath} />
      </div>
    );
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      notFound(); // Show a 404 page if the question paper is not found
    }
    console.error('Error fetching question paper:', error.message);
    return <div>Failed to load question paper.</div>;
  }
}