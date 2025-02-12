import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract metadata and PDF file from the form data
    const name = formData.get('name') as string;
    const questions = JSON.parse(formData.get('questions') as string);
    const pdfFile = formData.get('pdfFile') as File;

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    }

    // Save the PDF file to the server
    const filePath = path.join(uploadDir, pdfFile.name);
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    await writeFile(filePath, buffer);

    // Save the question paper metadata to the database
    const questionPaper = await prisma.questionPaper.create({
      data: {
        name,
        filePath: `/uploads/${pdfFile.name}`, // Relative path to the uploaded file
        questions: {
          connect: questions.map((q: { id: number }) => ({ id: q.id })),
        },
      },
    });

    return NextResponse.json({ success: true, questionPaper });
  } catch (error) {
    console.error('Error saving question paper:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to save question paper' }, { status: 500 });
  }
}