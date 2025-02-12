// src/app/api/question-papers/generate-pdf/route.ts
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export async function POST(req: Request) {
  try {
    const { questions } = await req.json();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Add a page to the PDF
    const page = pdfDoc.addPage([600, 800]); // Width: 600, Height: 800
    const { height } = page.getSize();

    // Define font size and margins
    const fontSize = 12;
    let yOffset = height - 50;

    // Add content to the PDF
    questions.forEach((question: any, index: number) => {
      const text = `${index + 1}. ${question.content}`;
      page.drawText(text, {
        x: 50,
        y: yOffset,
        size: fontSize,
      });
      yOffset -= 20; // Move down for the next line

    
      // const getOptionLabel = (index: number): string => {
      //   const firstChar = String.fromCharCode(97 + Math.floor(index / 26)); // 'a' to 'z'
      //   const secondChar = String.fromCharCode(97 + (index % 26)); // 'a' to 'z'
      //   return index < 26 ? `(${firstChar})` : `(${firstChar}${secondChar})`;
      // };

      // Add options (if available)
      if (question.options && question.options.length > 0) {
        let xOffset = 50; // Start at x = 50
        question.options.forEach((option: any, index: number) => {
          const label = String.fromCharCode(97 + index); // Convert index to 'a', 'b', 'c', etc.
          const optionText = `(${label}) ${option.content}`; // Add the label before the option content
          page.drawText(optionText, {
            x: xOffset,
            y: yOffset,
            size: fontSize,
          });
          xOffset += 120; // Move horizontally for the next option (adjust spacing as needed)
        });
        yOffset -= 30; // Move down after all options are rendered
      }

      // Add spacing between questions
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a downloadable response
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="question-paper.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}