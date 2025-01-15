// src/app/api/chapters/[id]/route.ts

// src/app/api/chapters/[id]/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';



export async function GET(
  request: Request,
  { params }: { params: { id: string } } // Destructure params
) {
  const prisma = new PrismaClient();

  try {
    // Validate and parse the ID
    const chapterId = parseInt(params.id);
    if (isNaN(chapterId)) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }

    // Fetch the chapter from the database
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: {
        subject: true, // Include the associated subject
        questions: true, // Include the associated questions
        questionPapers: true, // Include the associated question papers
      },
    });

    // If the chapter is not found, return a 404 error
    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Return the chapter as a JSON response
    return NextResponse.json(chapter);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapter' },
      { status: 500 }
    );
  }
}