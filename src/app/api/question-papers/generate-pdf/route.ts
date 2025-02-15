// src/app/api/question-papers/generate-pdf/route.ts

import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  // Remove any newline characters before processing:
  text = text.replace(/\r?\n/g, ' ');
  
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const textWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (textWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

export async function POST(req: Request) {
  try {
    const { questions } = await req.json();

    // Create a new PDF document and register fontkit
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Add a page to the PDF
    let page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();

    // Embed a standard font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Define font size and initial vertical offset
    const fontSize = 12;
    let yOffset = height - 50;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionNumber = i + 1;

      // Wrap the question text
      const wrappedLines = wrapText(
        `${questionNumber}. ${question.content}`,
        500,
        helveticaFont,
        fontSize
      );

      // Draw each line of the question
      for (const line of wrappedLines) {
        // If there's not enough space on the current page, add a new one
        if (yOffset < 60) {
          page = pdfDoc.addPage([600, 800]);
          yOffset = 750;
        }
        page.drawText(line, {
          x: 50,
          y: yOffset,
          size: fontSize,
          font: helveticaFont,
        });
        yOffset -= 20;
      }

      // Add a little extra space before listing options
      yOffset -= 10;

      // Draw options vertically (each option on a new line)
      if (question.options && question.options.length > 0) {
        question.options.forEach((option: any, idx: number) => {
          // Check if there's enough vertical space
          if (yOffset < 60) {
            page = pdfDoc.addPage([600, 800]);
            yOffset = 750;
          }
          const label = String.fromCharCode(97 + idx); // 'a', 'b', 'c', ...
          const optionText = `(${label}) ${option.content}`;

          // Optionally, wrap the option text if needed
          const wrappedOptionLines = wrapText(optionText, 500, helveticaFont, fontSize);
          wrappedOptionLines.forEach((optLine) => {
            if (yOffset < 60) {
              page = pdfDoc.addPage([600, 800]);
              yOffset = 750;
            }
            // Draw the option text indented from the question
            page.drawText(optLine, {
              x: 70,
              y: yOffset,
              size: fontSize,
              font: helveticaFont,
            });
            yOffset -= 20;
          });
        });
        // Additional space after options
        yOffset -= 10;
      }
    }

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
