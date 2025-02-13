// src/components/PdfViewer.tsx

'use client';
import { useEffect, useState } from 'react';

interface PdfViewerProps {
  filePath: string; // Full URL to the PDF file on Cloudinary
}

export default function PdfViewer({ filePath }: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    setPdfUrl(filePath);
  }, [filePath]);

  return (
    <div>
      {pdfUrl ? (
        <object data={pdfUrl} type="application/pdf" width="100%" height="600px">
          <p>
            Unable to display PDF.{' '}
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </p>
        </object>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
  
}


