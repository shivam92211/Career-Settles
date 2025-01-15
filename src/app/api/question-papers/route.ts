import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
      const questionPapers = await prisma.questionPaper.findMany({
        include: { questions: true, chapters: true }, // Include related data
      });
      return NextResponse.json(questionPapers);
    } catch (error) {
      console.error("Error fetching question papers:", error);
      return NextResponse.json({ error: "Failed to fetch question papers" }, { status: 500 });
    }
  }

export async function POST(req: Request) {
  try {
    const { name, questionIds, chapterIds } = await req.json();

    if (!name || !questionIds || !Array.isArray(questionIds) || questionIds.length === 0 || !chapterIds || !Array.isArray(chapterIds) || chapterIds.length === 0) {
      return NextResponse.json({ error: "Name and at least one question ID and chapter ID are required" }, { status: 400 });
    }

    const newQuestionPaper = await prisma.questionPaper.create({
      data: {
        name,
        questions: {
          connect: questionIds.map((id: number) => ({ id })),
        },
        chapters: {
          connect: chapterIds.map((id: number) => ({ id })),
        },
      },
      include: {questions: true, chapters: true}
    });

    return NextResponse.json(newQuestionPaper, { status: 201 });
  } catch (error) {
    console.error("Error creating question paper:", error);
    return NextResponse.json({ error: "Failed to create question paper" }, { status: 500 });
  }
}