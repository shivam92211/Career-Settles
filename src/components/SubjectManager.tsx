// src/components/SubjectManager.tsx

'use client'

import React, { useState, useEffect } from 'react';

const SubjectManager: React.FC = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const response = await fetch('/api/subjects');
    const data = await response.json();
    setSubjects(data);
  };

  const handleAddSubject = async () => {
    const response = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSubject, role: 'ADMIN' }), // Assume role is passed correctly
    });
    if (response.ok) {
      fetchSubjects();
      setNewSubject('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Subjects</h2>
      <ul className="list-disc pl-5">
        {subjects.map((subject: any) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="New Subject"
        className="border p-2"
      />
      <button onClick={handleAddSubject} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Subject
      </button>
    </div>
  );
};

export default SubjectManager;