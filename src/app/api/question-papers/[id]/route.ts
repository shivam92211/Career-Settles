import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id: parseInt(params.id) },
      include: { questions: true, chapters: true },
    });

    if (!questionPaper) {
      return NextResponse.json({ error: "Question paper not found" }, { status: 404 });
    }

    return NextResponse.json(questionPaper);
  } catch (error) {
    console.error("Error fetching question paper:", error);
    return NextResponse.json({ error: "Failed to fetch question paper" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.questionPaper.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: "Question paper deleted" });
  } catch (error) {
    console.error("Error deleting question paper:", error);
    return NextResponse.json({ error: "Failed to delete question paper" }, { status: 500 });
  }
}