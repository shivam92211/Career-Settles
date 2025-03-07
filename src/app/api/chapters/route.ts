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
    console.error('Error fetching chapters:', error?.message || 'Unknown error');
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

    // Validate required fields
    if (!title || !subjectId) {
      return NextResponse.json(
        { error: 'Title and subject ID are required' },
        { status: 400 }
      );
    }

    // Create the chapter and associate it with the subject
    const newChapter = await prisma.chapter.create({
      data: {
        title,
        subject: { connect: { id: subjectId } }, // Connect to the existing subject using subjectId
      },
    });

    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
}



// src/app/api/chapters/route.ts

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Extract the chapter ID from query params
    const { title } = await req.json();

    // Validate input
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Chapter title is required and must be a string' }, { status: 400 });
    }

    // Update the chapter in the database
    const updatedChapter = await prisma.chapter.update({
      where: { id: parseInt(id) },
      data: { title },
    });

    return NextResponse.json(updatedChapter, { status: 200 });
  } catch (error) {
    console.error('Error updating chapter:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
  }
}



// src/app/api/chapters/route.ts

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Extract the chapter ID from query params

    // Validate input
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }

    // Delete the chapter from the database
    await prisma.chapter.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Chapter deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting chapter:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to delete chapter' }, { status: 500 });
  }
}