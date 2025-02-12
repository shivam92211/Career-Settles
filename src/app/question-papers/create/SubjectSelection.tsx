// src/app/dashboard/question-papers/create/SubjectSelection.tsx

'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Subject {
  id: number;
  name: string;
}

interface SubjectSelectionProps {
  classId: number | null;
  onSubjectChange: (subjectId: number | null) => void;
}

export default function SubjectSelection({ classId, onSubjectChange }: SubjectSelectionProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (classId) {
        try {
          const response = await axios.get(`/api/subjects?classId=${classId}`);
          setSubjects(response.data);
        } catch (error) {
          console.error('Error fetching subjects:', error);
        }
      } else {
        setSubjects([]);
      }
    };
    fetchSubjects();
  }, [classId]);

  return (
    <div className="space-y-2">
      <label htmlFor="subject" className="block text-sm font-medium">
        Subject
      </label>
      <Select onValueChange={(value) => onSubjectChange(parseInt(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject.id} value={subject.id.toString()}>
              {subject.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}