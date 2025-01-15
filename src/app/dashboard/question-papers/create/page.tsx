
// app/(dashboard)/question-papers/create/page.tsx (Create Question Paper)
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, Chapter } from '@/models/models';

export default function CreateQuestionPaperPage() {
  const [name, setName] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/questions');
      const data = await res.json();
      setQuestions(data);
    };

    const fetchChapters = async () => {
      const res = await fetch('/api/chapters');
      const data = await res.json();
      setChapters(data);
    };

    fetchQuestions();
    fetchChapters();
  }, []);

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

    const handleChapterSelect = (chapterId: number) => {
    setSelectedChapters((prevSelected) =>
      prevSelected.includes(chapterId)
        ? prevSelected.filter((id) => id !== chapterId)
        : [...prevSelected, chapterId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedQuestions.length === 0 || selectedChapters.length === 0) {
      alert("Please select at least one question and one chapter.");
      return;
    }

    try {
      const res = await fetch('/api/question-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, questionIds: selectedQuestions, chapterIds: selectedChapters }),
      });

      if (res.ok) {
        router.push("/dashboard/question-papers")
      } else {
        console.error('Failed to create question paper');
      }
    } catch (error) {
      console.error('Error creating question paper:', error);
    }
  };

  return (
    <div>
      <h1>Create Question Paper</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h2>Select Questions:</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => handleQuestionSelect(question.id)}
                />
                {question.content}
              </label>
            </li>
          ))}
        </ul>

        <h2>Select Chapters:</h2>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedChapters.includes(chapter.id)}
                  onChange={() => handleChapterSelect(chapter.id)}
                />
                {chapter.title}
              </label>
            </li>
          ))}
        </ul>

        <button type="submit">Create Question Paper</button>
      </form>
    </div>
  );
}