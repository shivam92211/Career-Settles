// src/app/api/question-papers/save/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract metadata and PDF file from the form data
    const name = formData.get('name') as string;
    const questions = JSON.parse(formData.get('questions') as string);
    const pdfFile = formData.get('pdfFile') as File;

    if (!pdfFile) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload the PDF file to Cloudinary
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw', // Specify raw for non-image files
          folder: 'question-papers',
          public_id: pdfFile.name,
          transformation: [{ content_disposition: 'inline' }], // Ensure inline preview
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const cloudinaryData = cloudinaryResponse as { secure_url: string };

    // Log the secure_url for debugging
    console.log('Cloudinary URL:', cloudinaryData.secure_url);

    // Save the question paper metadata to the database
    const questionPaper = await prisma.questionPaper.create({
      data: {
        name,
        filePath: cloudinaryData.secure_url, // Store the Cloudinary URL in the database
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