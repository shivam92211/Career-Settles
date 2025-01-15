// src/app/api/chapters/latest/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch the latest 5 chapters with their subjects
    const chapters = await prisma.chapter.findMany({
      take: 5, // Limit to 5 chapters
      orderBy: { createdAt: 'desc' }, // Order by creation date (newest first)
      include: { subject: true }, // Include the associated subject
    });

    // Format the response to match the expected structure
    const formattedChapters = chapters.map((chapter) => ({
      chapter: {
        id: chapter.id,
        title: chapter.title, // Ensure the title field is included
        subjectId: chapter.subjectId,
        createdAt: chapter.createdAt,
      },
      subject: chapter.subject, // Include the associated subject
    }));

    return NextResponse.json(formattedChapters);
  } catch (error) {
    console.error('Error fetching latest chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest chapters' },
      { status: 500 }
    );
  }
}