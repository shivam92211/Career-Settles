// src/app/dashboard/subjects/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,  
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { Loader2 } from 'lucide-react';
import axios from 'axios';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Link from 'next/link';

interface Subject {
  id: number;
  name: string;
  chapters?: { id: number; title: string }[];
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editSubjectId, setEditSubjectId] = useState<number | null>(null);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [deleteSubjectId, setDeleteSubjectId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Handle subject update
  const handleEdit = async () => {
    try {
      if (!editSubjectId || !newSubjectName) return;

      const response = await axios.put(`/api/subjects?id=${editSubjectId}`, { name: newSubjectName });
      setSubjects((prevSubjects) =>
        prevSubjects.map((subject) => (subject.id === editSubjectId ? response.data : subject))
      );

      setIsEditing(false);
      setNewSubjectName('');
    } catch (error) {
      console.error('Error updating subject:', error);
      alert('Failed to update subject. Please try again.');
    }
  };

  // Handle subject deletion
  const handleDelete = async () => {
    try {
      if (!deleteSubjectId) return;

      await axios.delete(`/api/subjects?id=${deleteSubjectId}`);
      setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== deleteSubjectId));
      setDeleteSubjectId(null);
    } catch (error) {
      console.error('Error deleting subject:', error);
      alert('Failed to delete subject. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
          <Link href="/dashboard/subjects/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Create New Subject
            </Button>
          </Link>
        </div>

        {/* Subjects List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h2>
              <p className="text-gray-600">Chapters: {subject.chapters?.length || 0}</p>
              <div className="flex gap-2 mt-4">

                {/* See all questions*/}
                <Link
                key={subject.id}
                href={`/dashboard/subjects/${subject.id}`} // Correctly pass the subject ID
                className="block"
                >
                <Button variant="outline" onClick={() => {}}>
                      See
                    </Button>
                </Link>

                {/* Edit Dialog */}
                <Dialog open={isEditing && editSubjectId === subject.id} onOpenChange={(open) => setIsEditing(open)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => {
                      setEditSubjectId(subject.id);
                      setNewSubjectName(subject.name);
                      setIsEditing(true);
                    }}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Subject Name</DialogTitle>
                    </DialogHeader>
                    <input
                      type="text"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleEdit}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>



                {/* Delete AlertDialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the subject and all its associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setDeleteSubjectId(subject.id);
                          handleDelete();
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No subjects found. Create one to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}