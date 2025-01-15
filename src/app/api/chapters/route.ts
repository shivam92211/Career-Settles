// src/app/api/chapters/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET request to fetch chapters by subjectId
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: {
        subjectId: parseInt(subjectId),
      },
    });

    return NextResponse.json(chapters, { status: 200 });
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}

// POST request to create a new chapter
export async function POST(req: Request) {
  try {
    const { title, subjectId } = await req.json();

    if (!title || !subjectId) {
      return NextResponse.json(
        { error: 'Title and subject ID are required' },
        { status: 400 }
      );
    }

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        subject: { connect: { id: subjectId } }, // Connect to the existing subject using subjectId
      },
    });

    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
}



