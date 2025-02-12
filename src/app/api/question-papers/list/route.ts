import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const questionPapers = await prisma.questionPaper.findMany({
      include: {
        questions: true,
      },
    });
    return NextResponse.json(questionPapers);
  } catch (error) {
    console.error('Error fetching question papers:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to fetch question papers' }, { status: 500 });
  }
}