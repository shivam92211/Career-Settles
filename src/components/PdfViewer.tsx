// 'use client';
// import { useEffect, useState } from 'react';

// interface PdfViewerProps {
//   filePath: string; // Relative path to the PDF file
// }

// export default function PdfViewer({ filePath }: PdfViewerProps) {
//   const [pdfUrl, setPdfUrl] = useState<string>('');

//   useEffect(() => {
//     // Construct the full URL to the PDF file
//     const baseUrl = window.location.origin;
//     setPdfUrl(`${baseUrl}${filePath}`);
//   }, [filePath]);

//   return (
//     <div>
//       {pdfUrl ? (
//         <iframe
//           src={pdfUrl}
//           width="100%"
//           height="600px"
//           title="PDF Preview"
//           style={{ border: 'none' }}
//         />
//       ) : (
//         <p>Loading PDF...</p>
//       )}
//     </div>
//   );
// }




'use client';
import { useEffect, useState } from 'react';

interface PdfViewerProps {
  filePath: string; // Relative path to the PDF file
}

export default function PdfViewer({ filePath }: PdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    // Construct the full URL to the PDF file
    const baseUrl = window.location.origin;
    setPdfUrl(`${baseUrl}${filePath}`);
  }, [filePath]);

  return (
    <div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Preview"
          style={{ border: 'none' }}
        />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}