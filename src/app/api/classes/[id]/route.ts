// src/app/api/classes/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3]; // Extract the class ID from the URL
    console.log({ id });

    // Validate and parse the ID
    const classId = parseInt(id);
    if (isNaN(classId)) {
      return NextResponse.json({ error: 'Invalid class ID' }, { status: 400 });
    }

    // Fetch the class and include its associated subjects
    const cls = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        subjects: true, // Include the associated subjects
      },
    });

    // If the class is not found, return a 404 error
    if (!cls) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Return the class as a JSON response
    return NextResponse.json(cls);
  } catch (error) {
    console.error('Error fetching class:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch class' },
      { status: 500 }
    );
  }
}