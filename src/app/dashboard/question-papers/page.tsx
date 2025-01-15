// app/(dashboard)/question-papers/page.tsx (Question Papers List)
'use client';
import { QuestionPaper } from "@/models/models";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuestionPapersPage() {
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      const res = await fetch('/api/question-papers');
      const data = await res.json();
      setQuestionPapers(data);
    };

    fetchQuestionPapers();
  }, []);

  return (
    <div>
      <h1>Question Papers</h1>
      <ul>
        {questionPapers.map((questionPaper) => (
          <li key={questionPaper.id}>
            <Link href={`/dashboard/question-papers/${questionPaper.id}`}>
              {questionPaper.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/dashboard/question-papers/create">Create New Question Paper</Link>
    </div>
  );
}

