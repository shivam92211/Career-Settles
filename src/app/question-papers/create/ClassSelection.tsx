// src/app/dashboard/question-papers/create/ClassSelection.tsx

'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Class {
  id: number;
  name: string;
}

interface ClassSelectionProps {
  onClassChange: (classId: number | null) => void;
}

export default function ClassSelection({ onClassChange }: ClassSelectionProps) {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="space-y-2">
      <label htmlFor="class" className="block text-sm font-medium">
        Class
      </label>
      <Select onValueChange={(value) => onClassChange(parseInt(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Select a class" />
        </SelectTrigger>
        <SelectContent>
          {classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.id.toString()}>
              {cls.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}