import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: parseInt(params.id) },
      include: { options: true, chapter: true },
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { content, type, chapterId, options } = await req.json();
  
      if (!content || !type || !chapterId || !options || !Array.isArray(options) || options.length === 0) {
        return NextResponse.json({ error: "All fields and at least one option are required" }, { status: 400 });
      }
  
      await prisma.option.deleteMany({
        where: {
            questionId: parseInt(params.id)
        }
      })
      const updatedQuestion = await prisma.question.update({
        where: { id: parseInt(params.id) },
        data: {
          content,
          type,
          chapter: { connect: { id: chapterId } },
          options: {
            createMany: {
              data: options.map((option: { content: string; isCorrect: boolean }) => option),
            },
          },
        },
        include: {options: true}
      });
  
      return NextResponse.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating question:", error);
      return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
    }
  }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await prisma.question.delete({
//       where: { id: parseInt(params.id) },
//     });
//     return NextResponse.json({ message: "Question deleted" });
//   } catch (error) {
//     console.error("Error deleting question:", error);
//     return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
//   }
// }




export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = parseInt(params.id);
    if (isNaN(questionId)) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 });
    }

    // Delete the question
    await prisma.question.delete({
      where: { id: questionId },
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}