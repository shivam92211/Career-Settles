// // src/app/dashboard/chapters/[id]/page.tsx

// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { Chapter, Question } from "@/models/models"; // Import Chapter and Question types
// import axios from 'axios'; // Import axios
// import { Loader2 } from 'lucide-react'; // Import loading spinner
// import Link from 'next/link'; // Import Link for navigation
// import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
// import DashboardLayout from '@/components/layouts/DashboardLayout';

// export default function ChapterDetailsPage() {
//   const { id } = useParams(); // Get the chapter ID from the URL
//   const [chapter, setChapter] = useState<Chapter | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

 
//   useEffect(() => {
//     const fetchChapterAndQuestions = async () => {
//       try {
//         // Fetch chapter details
//         const chapterResponse = await axios.get(`/api/chapters/${id}`);
//         setChapter(chapterResponse.data);
  
//         // Fetch questions related to the chapter
//         const questionsResponse = await axios.get(`/api/chapters/${id}/questions`);
//         setQuestions(questionsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Failed to fetch data'); // Set error message
//       } finally {
//         setIsLoading(false); // Set loading to false
//       }
//     };
//     fetchChapterAndQuestions();
//   }, [id]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-600">{error}</p>
//       </div>
//     );
//   }

//   // Function to handle question deletion
//     const handleDeleteQuestion = async (questionId: number) => {
//         try {
//         await axios.delete(`/api/questions/${questionId}`);
//         // Refresh the questions list after deletion
//         const questionsResponse = await axios.get(`/api/chapters/${id}/questions`);
//         setQuestions(questionsResponse.data);
//         } catch (error) {
//         console.error('Error deleting question:', error);
//         }
//     };

//   return (
//     <DashboardLayout>
//       <div className="p-6">
        
//       {/* Chapter Details */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Chapter Details</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <p className="text-gray-800"><strong>ID:</strong> {chapter?.id}</p>
//         <p className="text-gray-800"><strong>Title:</strong> {chapter?.title}</p>
//         <p className="text-gray-800"><strong>Subject ID:</strong> {chapter?.subjectId}</p>
//         <p className="text-gray-800"><strong>Created At:</strong> {chapter?.createdAt ? new Date(chapter.createdAt).toLocaleDateString() : 'N/A'}</p>
//       </div>

//       {/* Questions Section */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions</h2>
//       {questions.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//           {questions.map((question) => (
//             <div
//               key={question.id}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.content}</h3>
//               <p className="text-gray-600">Type: {question.type}</p>
//               {/* <p className="text-gray-600">Created At: {new Date(question.createdAt).toLocaleDateString()}</p> */}
//               <div className="mt-4 flex space-x-2">
//                 <Link href={`/dashboard/questions/${question.id}/edit`}>
//                   <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                     Edit
//                   </Button>
//                 </Link>
//                 <Button
//                   className="bg-red-600 hover:bg-red-700 text-white"
//                   onClick={() => handleDeleteQuestion(question.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600">No questions found for this chapter.</p>
//       )}

//       {/* Add Question Button */}
//       <div className="mt-8">
//         <Link href={`/dashboard/chapters/${id}/questions/create`}>
//           <Button className="bg-green-600 hover:bg-green-700 text-white">
//             Add New Question
//           </Button>
//         </Link>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }



// src/app/dashboard/chapters/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Chapter, Question } from '@/models/models'; // Import Chapter and Question types
import axios from 'axios'; // Import axios
import { Loader2 } from 'lucide-react'; // Import loading spinner
import Link from 'next/link'; // Import Link for navigation
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ChapterDetailsPage() {
  const { id } = useParams(); // Get the chapter ID from the URL
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchChapterAndQuestions = async () => {
      try {
        // Fetch chapter details
        const chapterResponse = await axios.get(`/api/chapters/${id}`);
        setChapter(chapterResponse.data);

        // Fetch questions related to the chapter
        const questionsResponse = await axios.get(`/api/chapters/${id}/questions`);
        setQuestions(questionsResponse.data);
        setFilteredQuestions(questionsResponse.data); // Initialize filtered questions
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data'); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchChapterAndQuestions();
  }, [id]);

  // Handle question deletion
  const handleDeleteQuestion = async (questionId: number) => {
    try {
      await axios.delete(`/api/questions/${questionId}`);
      // Refresh the questions list after deletion
      const questionsResponse = await axios.get(`/api/chapters/${id}/questions`);
      setQuestions(questionsResponse.data);
      setFilteredQuestions(questionsResponse.data); // Reset filters
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Filter questions based on search term and type
  // useEffect(() => {
  //   let filtered = [...questions];

  //   // Filter by search term (case-insensitive)
  //   if (searchTerm.trim()) {
  //     filtered = filtered.filter((question) =>
  //       question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       question.options.some((option) =>
  //         option.content.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   }

  //   // Filter by type
  //   if (filterType) {
  //     filtered = filtered.filter((question) => question.type === filterType);
  //   }

  //   setFilteredQuestions(filtered);
  // }, [searchTerm, filterType, questions]);

  useEffect(() => {
    const fetchChapterAndQuestions = async () => {
      try {
        // Fetch chapter details
        const chapterResponse = await axios.get(`/api/chapters/${id}`);
        setChapter(chapterResponse.data);
  
        // Fetch questions related to the chapter
        const questionsResponse = await axios.get(`/api/chapters/${id}/questions`);
        console.log('API Response:', questionsResponse.data); // Log the response
        setQuestions(questionsResponse.data);
        setFilteredQuestions(questionsResponse.data); // Initialize filtered questions
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data'); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchChapterAndQuestions();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Chapter Details */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chapter Details</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="text-gray-800"><strong>ID:</strong> {chapter?.id}</p>
          <p className="text-gray-800"><strong>Title:</strong> {chapter?.title}</p>
          <p className="text-gray-800"><strong>Subject ID:</strong> {chapter?.subjectId}</p>
          <p className="text-gray-800">
            <strong>Created At:</strong>{' '}
            {chapter?.createdAt ? new Date(chapter.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by question or option..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-grow"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All Types</option>
            <option value="DPP">DPP</option>
            <option value="TEXTUAL">Textual</option>
          </select>
        </div>

        {/* Questions Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions</h2>
{/*         
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.content}</h3>
                <p className="text-gray-600">Type: {question.type}</p>
                <ul className="list-disc pl-6 mt-2">
                  {question.options.map((option) => (
                    <li key={option.id} className="text-gray-700">
                      {option.content} {option.isCorrect && '(Correct)'}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Link href={`/dashboard/questions/${question.id}/edit`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No questions found matching the criteria.</p>
        )} */}

        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.content}</h3>
                <p className="text-gray-600">Type: {question.type}</p>
                <ul className="list-disc pl-6 mt-2">
                  {/* Safeguard against undefined options */}
                  {(question.options || []).map((option) => (
                    <li key={option.id} className="text-gray-700">
                      {option.content} {option.isCorrect && '(Correct)'}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-2">
                  <Link href={`/dashboard/questions/${question.id}/edit`}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No questions found matching the criteria.</p>
        )}

        {/* Add Question Button */}
        <div className="mt-8">
          <Link href={`/dashboard/chapters/${id}/questions/create`}>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Add New Question
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}