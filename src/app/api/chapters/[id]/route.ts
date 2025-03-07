// src/app/api/chapters/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(req: NextRequest) {
  try {
    // const chapterId = parseInt(params.id);
    const id = req.nextUrl.pathname.split('/')[3];
    console.log({ id });

    const chapterId = parseInt(id);

    // Fetch questions with their options
    const questions = await prisma.question.findMany({
      where: { chapterId },
      include: {
        options: true, // Ensure options are included
      },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}