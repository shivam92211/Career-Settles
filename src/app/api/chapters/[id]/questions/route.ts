// // import { NextResponse } from 'next/server';
// // import { prisma } from '@/lib/prisma';

// // export async function GET(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const chapterId = parseInt(params.id);
// //     if (isNaN(chapterId)) {
// //       return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
// //     }

// //     // Fetch questions related to the chapter
// //     const questions = await prisma.question.findMany({
// //       where: { chapterId },
// //       include: {
// //         chapter: true, // Include chapter details if needed
// //       },
// //     });

// //     return NextResponse.json(questions);
// //   } catch (error) {
// //     console.error('Error fetching questions:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch questions' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse, NextRequest } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } } // Correctly typed params
// ) {
//   try {
//     console.log({ params });

//     // Forcefully resolve params (temporary workaround)
//     const resolvedParams = await Promise.resolve(params);
//     const chapterId = parseInt(resolvedParams.id);

//     if (isNaN(chapterId)) {
//       return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
//     }

//     // Fetch questions related to the chapter
//     const questions = await prisma.question.findMany({
//       where: { chapterId },
//       include: {
//         chapter: true, // Include chapter details if needed
//       },
//     });

//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch questions' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Correctly typed params
) {
  try {
    console.log({ params });

    // Ensure params is resolved before accessing its properties
    const chapterId = parseInt(params.id);
    if (isNaN(chapterId)) {
      return NextResponse.json({ error: 'Invalid chapter ID' }, { status: 400 });
    }

    // Fetch questions related to the chapter
    const questions = await prisma.question.findMany({
      where: { chapterId },
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