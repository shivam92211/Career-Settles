// // src/app/api/question-papers/route.ts
// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function POST(req: Request) {
//   try {
//     const { name, questionIds } = await req.json(); // Remove 'description'

//     // Validate required fields
//     if (!name || !questionIds || !Array.isArray(questionIds)) {
//       return NextResponse.json(
//         { error: 'Name and question IDs are required' },
//         { status: 400 }
//       );
//     }

//     // Create the question paper and associate it with selected questions
//     const questionPaper = await prisma.questionPaper.create({
//       data: {
//         name,
//         questions: {
//           connect: questionIds.map((id: number) => ({ id })),
//         },
//       },
//     });

//     return NextResponse.json(questionPaper, { status: 201 });
//   } catch (error) {
//     console.error('Error creating question paper:', error?.message || 'Unknown error');
//     return NextResponse.json(
//       { error: 'Failed to create question paper' },
//       { status: 500 }
//     );
//   }
// }


// src/app/api/question-papers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all question papers with their associated questions
    const questionPapers = await prisma.questionPaper.findMany({
      include: {
        questions: true, // Include associated questions
      },
    });

    return NextResponse.json(questionPapers);
  } catch (error) {
    console.error('Error fetching question papers:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch question papers' },
      { status: 500 }
    );
  }
}