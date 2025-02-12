// src/app/api/subjects/[id]/route.ts 

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(
  req: NextRequest
) {
  try {
    const id = req.nextUrl.pathname.split('/')[3];
    // Ensure params is resolved before accessing params.id
    const subjectId = parseInt(id); // Parse the ID from params
    if (isNaN(subjectId)) {
      return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
    }

    // Fetch the subject from the database
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        chapters: true, // Include chapters if needed
      },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    // Return the subject as a JSON response
    return NextResponse.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subject' },
      { status: 500 }
    );
  }
}