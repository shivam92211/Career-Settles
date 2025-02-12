// import { NextResponse, NextRequest } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(request: NextRequest) {
//   try {
//     const id = request.nextUrl.pathname.split("/")[3];


//     // Fetch the question paper by ID using Prisma
//     const questionPaper = await prisma.questionPaper.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         questions: true, // Include related questions if needed
//       },
//     });

//     if (!questionPaper) {
//       return NextResponse.json({ error: 'Question paper not found' }, { status: 404 });
//     }

//     return NextResponse.json(questionPaper);
//   } catch (error) {
//     console.error('Error fetching question paper:', error?.message || 'Unknown error');
//     return NextResponse.json({ error: 'Failed to fetch question paper' }, { status: 500 });
//   }
// }



import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID format
    if (!/^\d+$/.test(params.id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const questionPaper = await prisma.questionPaper.findUnique({
      where: { id: parseInt(params.id) },
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