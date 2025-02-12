// src/app/subjects/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get('classId');

    let subjects;

    if (classId) {
      // Fetch subjects filtered by classId
      subjects = await prisma.subject.findMany({
        where: {
          classId: parseInt(classId),
        },
      });
    } else {
      // Fetch all subjects if no classId is provided
      subjects = await prisma.subject.findMany();
    }

    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching subjects:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}

// POST: Create a new subject
export async function POST(req: Request) {
  try {
    const { className, subjectName } = await req.json();

    // Validate required fields
    if (!className || !subjectName) {
      return NextResponse.json(
        { error: "Both className and subjectName are required" },
        { status: 400 }
      );
    }

    // Find or create the class
    const classRecord = await prisma.class.upsert({
      where: { name: className },
      update: {}, // No updates needed if the class already exists
      create: { name: className }, // Create the class if it doesn't exist
    });

    // Create the subject and associate it with the class
    const newSubject = await prisma.subject.create({
      data: {
        name: subjectName,
        classId: classRecord.id, // Associate the subject with the class
      },
    });

    return NextResponse.json(newSubject, { status: 201 });
  } catch (error) {
    // Ensure error is logged properly
    console.error("Error creating subject:", error?.message || "Unknown error");
    return NextResponse.json(
      { error: error?.message || "Failed to create subject" },
      { status: 500 }
    );
  }
}