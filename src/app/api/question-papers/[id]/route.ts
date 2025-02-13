// src/app/api/question-papers/[id]/route.ts


import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Validate ID format
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    // Fetch the question paper by ID
    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: true,
      },
    });

    if (!questionPaper) {
      return NextResponse.json({ error: 'Question paper not found' }, { status: 404 });
    }

    return NextResponse.json(questionPaper);
  } catch (error) {
    console.error('Error fetching question paper:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
