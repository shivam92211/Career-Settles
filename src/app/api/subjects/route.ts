// src/app/subjects/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const subjects = await prisma.subject.findMany();
//     return NextResponse.json(subjects);
//   } catch (error) {
//     console.error("Error fetching subjects:", error);
//     return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
//   }
// }


export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        chapters: true, // Include chapters in the response
      },
    });

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Subject name is required" }, { status: 400 });
    }

    const newSubject = await prisma.subject.create({
      data: { name },
    });

    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    console.error("Error creating subject:", error);
    return NextResponse.json({ error: "Failed to create subject" }, { status: 500 });
  }
}