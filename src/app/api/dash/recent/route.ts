// src/app/api/dash/recent/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch recent chapters (last 3)
    const recentChapters = await prisma.chapter.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        title: true,
        createdAt: true,
      },
    });

    // Fetch recent questions (last 3)
    const recentQuestions = await prisma.question.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        content: true,
        createdAt: true,
      },
    });

    // Combine and format the recent activity
    const recentActivity = [
      ...recentChapters.map((chapter) => ({
        type: 'Chapter',
        message: `Added a new chapter: ${chapter.title}`,
        timestamp: chapter.createdAt,
      })),
      ...recentQuestions.map((question) => ({
        type: 'Question',
        message: `Created a new question: ${question.content}`,
        timestamp: question.createdAt,
      })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by timestamp

    // Return the recent activity as a JSON response
    return NextResponse.json(recentActivity);
  } catch (error) {
    console.error('Error fetching recent activity:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
}