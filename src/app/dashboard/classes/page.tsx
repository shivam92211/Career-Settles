// src/app/dashboard/classes/page.tsx

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
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Link from 'next/link';

interface Class {
  id: number;
  name: string;
  subjects?: { id: number; name: string }[];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editClassId, setEditClassId] = useState<number | null>(null);
  const [newClassName, setNewClassName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const [deleteClassId, setDeleteClassId] = useState<number | null>(null); // State for class to delete

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Handle class update
  const handleEdit = async (classId: number) => {
    try {
      const response = await axios.put(`/api/classes/${classId}`, { name: newClassName });
      setClasses((prevClasses) =>
        prevClasses.map((cls) => (cls.id === classId ? response.data : cls))
      );
      setSuccessMessage(`Class "${newClassName}" updated successfully!`); // Set success message
      setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds

      // Reset the dialog state
      setIsEditing(false);
      setNewClassName(''); // Clear the input field
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Failed to update class. Please try again.");
    }
  };

  // Handle class deletion
  const handleDelete = async () => {
    if (!deleteClassId) return;

    try {
      await axios.delete(`/api/classes/${deleteClassId}`);
      setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== deleteClassId));
      setDeleteClassId(null); // Reset the delete state
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete class. Please try again.");
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
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
          <Link href="/dashboard/classes/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Create New Class
            </Button>
          </Link>
        </div>

        {/* Classes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
      
            <div key={cls.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{cls.name}</h2>
              <p className="text-gray-600">Subjects: {cls.subjects?.length || 0}</p>
              <div className="flex gap-2 mt-4">

              <Link
              key={cls.id}
              href={`/dashboard/classes/${cls.id}`} // Navigate to class details
              className="block"
              >
                <Button
                variant="outline"
                onClick={() => {}}>
                  See
                </Button>
              </Link>

                {/* Edit Dialog */}
                {/* <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditClassId(cls.id);
                        setNewClassName(cls.name);
                        setIsEditing(true); // Open the dialog
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Class Name</DialogTitle>
                    </DialogHeader>
                    <input
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <Button onClick={() => handleEdit(editClassId!)}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog> */}

                {/* Edit Dialog */}
                  <Dialog open={isEditing && editClassId === cls.id} onOpenChange={(open) => setIsEditing(open)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditClassId(cls.id); // Set the ID of the class being edited
                          setNewClassName(cls.name); // Pre-fill the input with the current class name
                          setIsEditing(true); // Open the dialog
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Class Name</DialogTitle>
                      </DialogHeader>
                      <input
                        type="text"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => handleEdit(editClassId!)}>Save</Button>
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
                        This action cannot be undone. This will permanently delete the class and all its associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setDeleteClassId(cls.id); // Set the class ID to delete
                          handleDelete(); // Trigger the deletion
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
      </div>
    </DashboardLayout>
  );
}