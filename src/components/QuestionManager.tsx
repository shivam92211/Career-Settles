// src/components/QuestionManager.tsx

import React, { useState, useEffect } from 'react';

const QuestionManager: React.FC<{ chapterId: number }> = ({ chapterId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionType, setQuestionType] = useState('DPP');

  useEffect(() => {
    fetchQuestions();
  }, [chapterId]);

  const fetchQuestions = async () => {
    const response = await fetch(`/api/questions?chapterId=${chapterId}`);
    const data = await response.json();
    setQuestions(data);
  };

  const handleAddQuestion = async () => {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newQuestion, type: questionType, chapterId, role: 'ADMIN' }),
    });
    if (response.ok) {
      fetchQuestions();
      setNewQuestion('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Questions</h2>
      <ul className="list-disc pl-5">
        {questions.map((question: any) => (
          <li key={question.id}>{question.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="New Question"
        className="border p-2"
      />
      <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className="border p-2">
        <option value="DPP">DPP</option>
        <option value="TEXTUAL">Textual</option>
      </select>
      <button onClick={handleAddQuestion} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </div>
  );
};

export default QuestionManager;