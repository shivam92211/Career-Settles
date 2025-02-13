// src/app/api/question-papers/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest
) {
  const id = request.nextUrl.pathname.split('/')[3]
  try {
    // Validate ID format
    if (!/^\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id: parseInt(id) },
      include: { questions: true },
    });

    if (!questionPaper) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(questionPaper);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}