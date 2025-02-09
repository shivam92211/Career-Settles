// app/(dashboard)/questions/[id]/page.tsx (Question Details)
'use client';
import { Question } from "@/models/models";

async function getQuestion(id: string) {
    const res = await fetch(`/api/questions/${id}`);
    const data = await res.json();
    return data as Question;
}

export default async function QuestionDetailsPage() {
    const id = window.location.pathname.split("/")[3];
    const question = await getQuestion(id);
    return (
        <div>
            <h1>Question Details</h1>
            <p>ID: {question?.id}</p>
            <p>Content: {question?.content}</p>
            <p>Type: {question?.type}</p>
            <p>Chapter Id: {question?.chapterId}</p>
            {question?.options?.map((option) => (
              <div key={option.id}>
                <p>Content: {option.content}</p>
                <p>Is Correct: {option.isCorrect ? "Yes" : "No"}</p>
              </div>
            ))}
        </div>
    )
}
