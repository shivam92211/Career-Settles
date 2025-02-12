// src/app/api/chapters/[id]/questions/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3]; // Extract the chapter ID from the URL
    console.log({ id });

    // Validate and parse the ID
    const chapterId = parseInt(id);
    if (isNaN(chapterId)) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }

    // Fetch questions related to the chapter
    const questions = await prisma.question.findMany({
      where: { chapterId },
      include: {
        chapter: true, // Include chapter details if needed
      },
    });

    // Return the questions as a JSON response
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}