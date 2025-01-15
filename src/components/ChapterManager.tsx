// src/components/ChapterManager.tsx

'use client'

import React, { useState, useEffect } from 'react';

const ChapterManager: React.FC<{ subjectId: number }> = ({ subjectId }) => {
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState('');

  useEffect(() => {
    fetchChapters();
  }, [subjectId]);

  const fetchChapters = async () => {
    const response = await fetch(`/api/chapters?subjectId=${subjectId}`);
    const data = await response.json();
    setChapters(data);
  };

  const handleAddChapter = async () => {
    const response = await fetch('/api/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newChapter, subjectId, role: 'ADMIN' }),
    });
    if (response.ok) {
      fetchChapters();
      setNewChapter('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Chapters</h2>
      <ul className="list-disc pl-5">
        {chapters.map((chapter: any) => (
          <li key={chapter.id}>{chapter.title}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newChapter}
        onChange={(e) => setNewChapter(e.target.value)}
        placeholder="New Chapter"
        className="border p-2"
      />
      <button onClick={handleAddChapter} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Chapter
      </button>
    </div>
  );
};

export default ChapterManager;