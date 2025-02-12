// src/app/api/questions/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get('chapterId');
    const subjectId = searchParams.get('subjectId');
    const where = {};
    if (chapterId) where['chapterId'] = parseInt(chapterId);
    if (subjectId) where['chapter'] = { subjectId: parseInt(subjectId) };

    const questions = await prisma.question.findMany({
      where,
      include: {
        chapter: {
          include: {
            subject: true,
          },
        },
        options: true, // Include the options for each question
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}


// POST request to create a new question
export async function POST(req: Request) {
  try {
    const { content, type, chapterId, options } = await req.json();

    // Validate required fields
    if (!content || !type || !chapterId || !options) {
      return NextResponse.json(
        { error: 'Content, type, chapterId, and options are required' },
        { status: 400 }
      );
    }

    // Create the question and its options
    const question = await prisma.question.create({
      data: {
        content,
        type,
        chapterId,
        options: {
          create: options.map((option: { content: string; isCorrect: boolean }) => ({
            content: option.content,
            isCorrect: option.isCorrect,
          })),
        },
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}

