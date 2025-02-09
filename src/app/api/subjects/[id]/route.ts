// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const subject = await prisma.subject.findUnique({
//       where: { id: parseInt(params.id) },
//     });

//     if (!subject) {
//       return NextResponse.json({ error: "Subject not found" }, { status: 404 });
//     }

//     return NextResponse.json(subject);
//   } catch (error) {
//     console.error("Error fetching subject:", error);
//     return NextResponse.json({ error: "Failed to fetch subject" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     try {
//       const { name } = await req.json();
//       const updatedSubject = await prisma.subject.update({
//         where: { id: parseInt(params.id) },
//         data: { name },
//       });
//       return NextResponse.json(updatedSubject);
//     } catch (error) {
//       console.error("Error updating subject:", error);
//       return NextResponse.json({ error: "Failed to update subject" }, { status: 500 });
//     }
//   }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await prisma.subject.delete({
//       where: { id: parseInt(params.id) },
//     });
//     return NextResponse.json({ message: "Subject deleted" });
//   } catch (error) {
//     console.error("Error deleting subject:", error);
//     return NextResponse.json({ error: "Failed to delete subject" }, { status: 500 });
//   }
// }



// src/app/api/subjects/[id]/route.ts

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } } // Destructure params
// ) {
//   try {
//     const subject = await prisma.subject.findUnique({
//       where: { id: parseInt(params.id) }, // Use params.id directly
//       include: {
//         chapters: true, // Include chapters if needed
//       },
//     });

//     if (!subject) {
//       return NextResponse.json(
//         { error: 'Subject not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(subject, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching subject:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch subject' },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } } // Destructure params and ensure it's awaited
// ) {
//   try {
//     const subjectId = parseInt(params.id); // Parse the ID from params
//     if (isNaN(subjectId)) {
//       return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
//     }

//     const subject = await prisma.subject.findUnique({
//       where: { id: subjectId },
//       include: {
//         chapters: true, // Include chapters if needed
//       },
//     });

//     if (!subject) {
//       return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
//     }

//     return NextResponse.json(subject);
//   } catch (error) {
//     console.error('Error fetching subject:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch subject' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(
  req: NextRequest
) {
  try {
    const id = req.nextUrl.pathname.split('/')[3];
    // Ensure params is resolved before accessing params.id
    const subjectId = parseInt(id); // Parse the ID from params
    if (isNaN(subjectId)) {
      return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
    }

    // Fetch the subject from the database
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        chapters: true, // Include chapters if needed
      },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    // Return the subject as a JSON response
    return NextResponse.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subject' },
      { status: 500 }
    );
  }
}