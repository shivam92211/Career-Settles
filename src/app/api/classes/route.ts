// src/app/classes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        subjects: true,
      },
    });
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    // Ensure error is logged properly
    console.error("Error fetching classes:", error?.message || "Unknown error");
    return NextResponse.json(
      { error: error?.message || "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    // Validate input
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Class name is required and must be a string" },
        { status: 400 }
      );
    }

    // Create the class in the database
    const newClass = await prisma.class.create({
      data: { name },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    // Ensure error is logged properly
    console.error("Error creating class:", error?.message || "Unknown error");
    return NextResponse.json(
      { error: error?.message || "Failed to create class" },
      { status: 500 }
    );
  }
}