// src/app/api/questions/route.ts


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        chapter: true, // Include chapter details if needed
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}