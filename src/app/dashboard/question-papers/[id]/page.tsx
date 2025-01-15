// app/(dashboard)/question-papers/[id]/page.tsx (Question Paper Details)
'use client';
import { QuestionPaper } from "@/models/models";

async function getQuestionPaper(id: string) {
  const res = await fetch(`/api/question-papers/${id}`);
  const data = await res.json();
  return data as QuestionPaper;
}

export default async function QuestionPaperDetailsPage({ params }: { params: { id: string } }) {
  const questionPaper = await getQuestionPaper(params.id);

  return (
    <div>
      <h1>Question Paper Details</h1>
      <p>ID: {questionPaper?.id}</p>
      <p>Name: {questionPaper?.name}</p>

      <h2>Questions:</h2>
      {questionPaper?.questions?.map((question) => (
        <div key={question.id}>
          <p>{question.content}</p>
        </div>
      ))}

      <h2>Chapters:</h2>
      {questionPaper?.chapters?.map((chapter) => (
        <div key={chapter.id}>
          <p>{chapter.title}</p>
        </div>
      ))}
    </div>
  );
}
