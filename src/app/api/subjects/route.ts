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





// src/app/subjects/route.ts

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Extract the subject ID from query params
    const { name } = await req.json();

    // Validate input
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
    }
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Subject name is required and must be a string' }, { status: 400 });
    }

    // Update the subject in the database
    const updatedSubject = await prisma.subject.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    return NextResponse.json(updatedSubject, { status: 200 });
  } catch (error) {
    console.error('Error updating subject:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to update subject' }, { status: 500 });
  }
}








// src/app/subjects/route.ts

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Extract the subject ID from query params

    // Validate input
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
    }

    // Delete the subject from the database
    await prisma.subject.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Subject deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting subject:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to delete subject' }, { status: 500 });
  }
}