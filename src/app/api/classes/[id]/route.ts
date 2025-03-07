// src/app/api/classes/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3]; // Extract the class ID from the URL
    console.log({ id });

    // Validate and parse the ID
    const classId = parseInt(id);
    if (isNaN(classId)) {
      return NextResponse.json({ error: 'Invalid class ID' }, { status: 400 });
    }

    // Fetch the class and include its associated subjects
    const cls = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        subjects: true, // Include the associated subjects
      },
    });

    // If the class is not found, return a 404 error
    if (!cls) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Return the class as a JSON response
    return NextResponse.json(cls);
  } catch (error) {
    console.error('Error fetching class:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch class' },
      { status: 500 }
    );
  }
}





export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3]; // Extract the class ID from the URL
    console.log({ id });

    // Validate and parse the ID
    const classId = parseInt(id);
    if (isNaN(classId)) {
      return NextResponse.json({ error: 'Invalid class ID' }, { status: 400 });
    }

    // Parse the request body
    const { name } = await request.json();

    // Validate input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Class name is required and must be a string" },
        { status: 400 }
      );
    }

    // Update the class in the database
    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: { name },
    });

    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    console.error('Error updating class:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to update class' },
      { status: 500 }
    );
  }
}



// src/app/api/classes/[id]/route.ts

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3]; // Extract the class ID from the URL
    console.log({ id });

    // Validate and parse the ID
    const classId = parseInt(id);
    if (isNaN(classId)) {
      return NextResponse.json({ error: 'Invalid class ID' }, { status: 400 });
    }

    // Delete the class from the database
    await prisma.class.delete({
      where: { id: classId },
    });

    return NextResponse.json({ message: 'Class deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting class:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to delete class' },
      { status: 500 }
    );
  }
}