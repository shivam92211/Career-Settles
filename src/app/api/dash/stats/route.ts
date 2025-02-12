// src/app/api/dash/stats/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch total subjects
    const totalSubjects = await prisma.subject.count();

    // Fetch total chapters
    const totalChapters = await prisma.chapter.count();

    // Fetch total questions
    const totalQuestions = await prisma.question.count();

    // Return the stats as a JSON response
    return NextResponse.json({
      totalSubjects,
      totalChapters,
      totalQuestions,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}