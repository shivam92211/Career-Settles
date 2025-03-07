// // app/dashboard/questions/page.tsx

// 'use client';
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { 
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose
// } from '@/components/ui/dialog';

// import axios from 'axios';
// import DashboardLayout from '@/components/layouts/DashboardLayout';
// import Link from 'next/link';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Trash2, Edit } from 'lucide-react';

// interface Question {
//   id: number;
//   content: string;
//   type: string;
//   options: { id: number; content: string; isCorrect: boolean }[];
// }

// export default function QuestionsPage() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
//   const [newQuestionData, setNewQuestionData] = useState<{ content: string; type: string; options: { content: string; isCorrect: boolean }[] }>({
//     content: '',
//     type: '',
//     options: [],
//   });

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('/api/questions');
//         setQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Handle question update
//   const handleEdit = async () => {
//     try {
//       if (!editQuestionId) return;

//       const response = await axios.put(`/api/questions?id=${editQuestionId}`, newQuestionData);
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((q) => (q.id === editQuestionId ? response.data : q))
//       );

//       setIsEditing(false);
//       setEditQuestionId(null);
//       setNewQuestionData({ content: '', type: '', options: [] });
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   // Handle question deletion
//   const handleDeleteQuestion = async (questionId: number) => {
//     try {
//       await axios.delete(`/api/questions?id=${questionId}`);
//       setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
//     } catch (error) {
//       console.error('Error deleting question:', error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         {/* Page Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
//           <Link href="/dashboard/questions/create">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//               Create New Question
//             </Button>
//           </Link>
//         </div>

//         {/* Questions Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//           {questions.map((question) => (
//             <Card key={question.id} className="hover:shadow-lg transition-shadow duration-300">
//               <CardHeader>
//                 <CardTitle className="text-xl">{question.content}</CardTitle>
//                 <CardDescription className="text-gray-600">
//                   Type: {question.type}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="list-disc pl-6">
//                   {question.options.map((option) => (
//                     <li key={option.id} className="text-gray-700">
//                       {option.content} {option.isCorrect && '(Correct)'}
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//               <CardFooter className="flex justify-end space-x-2">
//                 {/* Edit Dialog */}
//                 <Dialog open={isEditing && editQuestionId === question.id} onOpenChange={(open) => setIsEditing(open)}>
//                   <DialogTrigger asChild>
//                     <Button size="sm" variant="outline" className="text-blue-600" onClick={() => {
//                       setEditQuestionId(question.id);
//                       setNewQuestionData({
//                         content: question.content,
//                         type: question.type,
//                         options: question.options.map((option) => ({
//                           content: option.content,
//                           isCorrect: option.isCorrect,
//                         })),
//                       });
//                       setIsEditing(true);
//                     }}>
//                       <Edit className="h-4 w-4 mr-2" />
//                       Edit
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                     <DialogHeader>
//                       <DialogTitle>Edit Question</DialogTitle>
//                     </DialogHeader>
//                     <form>
//                       <div className="space-y-4">
//                         <label className="block">
//                           Content:
//                           <input
//                             type="text"
//                             value={newQuestionData.content}
//                             onChange={(e) =>
//                               setNewQuestionData((prev) => ({ ...prev, content: e.target.value }))
//                             }
//                             className="border border-gray-300 rounded-md p-2 w-full"
//                           />
//                         </label>
//                         <label className="block">
//                           Type:
//                           <select
//                             value={newQuestionData.type}
//                             onChange={(e) =>
//                               setNewQuestionData((prev) => ({ ...prev, type: e.target.value }))
//                             }
//                             className="border border-gray-300 rounded-md p-2 w-full"
//                           >
//                             <option value="DPP">DPP</option>
//                             <option value="TEXTUAL">Textual</option>
//                           </select>
//                         </label>
//                         <label className="block">
//                           Options:
//                           {newQuestionData.options.map((option, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                               <input
//                                 type="text"
//                                 value={option.content}
//                                 onChange={(e) => {
//                                   const newOptions = [...newQuestionData.options];
//                                   newOptions[index].content = e.target.value;
//                                   setNewQuestionData((prev) => ({ ...prev, options: newOptions }));
//                                 }}
//                                 className="border border-gray-300 rounded-md p-2 flex-grow"
//                               />
//                               <input
//                                 type="checkbox"
//                                 checked={option.isCorrect}
//                                 onChange={(e) => {
//                                   const newOptions = [...newQuestionData.options];
//                                   newOptions[index].isCorrect = e.target.checked;
//                                   setNewQuestionData((prev) => ({ ...prev, options: newOptions }));
//                                 }}
//                                 className="mt-1"
//                               />
//                               {/* <span>Correct</span> */}
//                             </div>
//                           ))}
//                           {/* <Button
//                             type="button"
//                             variant="secondary"
//                             onClick={() =>
//                               setNewQuestionData((prev) => ({
//                                 ...prev,
//                                 options: [...prev.options, { content: '', isCorrect: false }],
//                               }))
//                             }
//                           >
//                             Add Option
//                           </Button> */}
//                         </label>
//                       </div>
//                       <div className="flex justify-end gap-2 mt-4">
//                         <DialogClose asChild>
//                           <Button variant="secondary">Cancel</Button>
//                         </DialogClose>
//                         <Button onClick={handleEdit}>Save</Button>
//                       </div>
//                     </form>
//                   </DialogContent>
//                 </Dialog>

//                 {/* Delete Button */}
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => handleDeleteQuestion(question.id)}
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {/* Empty State */}
//         {questions.length === 0 && !isLoading && (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No questions found. Create one to get started!</p>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }





// app/dashboard/questions/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import axios from 'axios';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Question {
  id: number;
  content: string;
  type: string;
  options: { id: number; content: string; isCorrect: boolean }[];
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
  const [newQuestionData, setNewQuestionData] = useState<{
    content: string;
    type: string;
    options: { content: string; isCorrect: boolean }[];
  }>({
    content: '',
    type: '',
    options: [],
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        const fetchedQuestions = response.data;

        // Reverse the order so newer questions appear first
        setQuestions([...fetchedQuestions].reverse());
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Handle question update
  const handleEdit = async () => {
    try {
      if (!editQuestionId) return;

      const response = await axios.put(`/api/questions?id=${editQuestionId}`, newQuestionData);

      // Move the updated question to the top of the list
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.filter((q) => q.id !== editQuestionId); // Remove old question
        return [response.data, ...updatedQuestions]; // Prepend updated question
      });

      setIsEditing(false);
      setEditQuestionId(null);
      setNewQuestionData({ content: '', type: '', options: [] });
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // Handle question deletion
  const handleDeleteQuestion = async (questionId: number) => {
    try {
      await axios.delete(`/api/questions?id=${questionId}`);

      // Remove the deleted question from the list
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
          <Link href="/dashboard/questions/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create New Question
            </Button>
          </Link>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{question.content}</CardTitle>
                <CardDescription className="text-gray-600">
                  Type: {question.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  {question.options.map((option) => (
                    <li key={option.id} className="text-gray-700">
                      {option.content} {option.isCorrect && '(Correct)'}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {/* Edit Dialog */}
                <Dialog open={isEditing && editQuestionId === question.id} onOpenChange={(open) => setIsEditing(open)}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-blue-600" onClick={() => {
                      setEditQuestionId(question.id);
                      setNewQuestionData({
                        content: question.content,
                        type: question.type,
                        options: question.options.map((option) => ({
                          content: option.content,
                          isCorrect: option.isCorrect,
                        })),
                      });
                      setIsEditing(true);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Question</DialogTitle>
                    </DialogHeader>
                    <form>
                      <div className="space-y-4">
                        <label className="block">
                          Content:
                          <input
                            type="text"
                            value={newQuestionData.content}
                            onChange={(e) =>
                              setNewQuestionData((prev) => ({ ...prev, content: e.target.value }))
                            }
                            className="border border-gray-300 rounded-md p-2 w-full"
                          />
                        </label>
                        <label className="block">
                          Type:
                          <select
                            value={newQuestionData.type}
                            onChange={(e) =>
                              setNewQuestionData((prev) => ({ ...prev, type: e.target.value }))
                            }
                            className="border border-gray-300 rounded-md p-2 w-full"
                          >
                            <option value="DPP">DPP</option>
                            <option value="TEXTUAL">Textual</option>
                          </select>
                        </label>
                        <label className="block">
                          Options:
                          {newQuestionData.options.map((option, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={option.content}
                                onChange={(e) => {
                                  const newOptions = [...newQuestionData.options];
                                  newOptions[index].content = e.target.value;
                                  setNewQuestionData((prev) => ({ ...prev, options: newOptions }));
                                }}
                                className="border border-gray-300 rounded-md p-2 flex-grow"
                              />
                              <input
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={(e) => {
                                  const newOptions = [...newQuestionData.options];
                                  newOptions[index].isCorrect = e.target.checked;
                                  setNewQuestionData((prev) => ({ ...prev, options: newOptions }));
                                }}
                                className="mt-1"
                              />
                            </div>
                          ))}
                        </label>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleEdit}>Save</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {questions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No questions found. Create one to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}