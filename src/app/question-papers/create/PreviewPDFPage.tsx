'use client';
import { useRouter } from 'next/navigation';

export default function PreviewPDFPage() {
  const router = useRouter();
  const pdfUrl = new URLSearchParams(window.location.search).get('pdfUrl');

  if (!pdfUrl) {
    router.push('/dashboard/question-papers/create');
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Preview PDF</h1>
      <iframe
        src={pdfUrl}
        width="100%"
        height="800px"
        title="PDF Preview"
        className="border rounded-md"
      />
    </div>
  );
}