// // src/app/dashboard/questions/create/page.tsx

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import DashboardLayout from '@/components/layouts/DashboardLayout';

// interface Subject {
//   id: number;
//   name: string;
// }

// interface Chapter {
//   id: number;
//   title: string;
// }

// enum QuestionType {
//   DPP = 'DPP',
//   TEXTUAL = 'TEXTUAL',
// }

// export default function CreateQuestionPage() {
//   const [content, setContent] = useState('');
//   const [type, setType] = useState<QuestionType>(QuestionType.DPP);
//   const [subjectId, setSubjectId] = useState<number | null>(null);
//   const [chapterId, setChapterId] = useState<number | null>(null);
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [options, setOptions] = useState<{ content: string; isCorrect: boolean }[]>([
//     { content: '', isCorrect: false },
//     { content: '', isCorrect: false },
//     { content: '', isCorrect: false },
//     { content: '', isCorrect: false },
//   ]);
//   const router = useRouter();

//   // Fetch all subjects
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get<Subject[]>('/api/subjects');
//         setSubjects(response.data);
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   // Fetch chapters based on selected subject
//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (subjectId) {
//         try {
//           const response = await axios.get<Chapter[]>(`/api/chapters?subjectId=${subjectId}`);
//           setChapters(response.data);
//         } catch (error) {
//           console.error('Error fetching chapters:', error);
//         }
//       }
//     };
//     fetchChapters();
//   }, [subjectId]);

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index].content = value;
//     setOptions(newOptions);
//   };

//   const handleCorrectOptionChange = (index: number) => {
//     const newOptions = options.map((option, i) => ({
//       ...option,
//       isCorrect: i === index,
//     }));
//     setOptions(newOptions);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!subjectId || !chapterId) {
//       alert('Please select a subject and chapter');
//       return;
//     }
  
//     if (options.some((option) => option.content === '')) {
//       alert('Please fill all options');
//       return;
//     }
  
//     if (!options.some((option) => option.isCorrect)) {
//       alert('Please select a correct option');
//       return;
//     }
  
//     try {
//       const response = await axios.post('/api/questions', {
//         content,
//         type,
//         chapterId,
//         options,
//       });
  
//       if (response.status === 201) {
//         router.push('/dashboard/questions');
//       }
//     } catch (error) {
//       console.error('Error creating question:', error);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div>
//       <h1>Create Question</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="subject">Subject:</label>
//         <select
//           id="subject"
//           value={subjectId || ''}
//           onChange={(e) => setSubjectId(parseInt(e.target.value))}
//         >
//           <option value="">Select a subject</option>
//           {subjects.map((subject) => (
//             <option key={subject.id} value={subject.id}>
//               {subject.name}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="chapter">Chapter:</label>
//         <select
//           id="chapter"
//           value={chapterId || ''}
//           onChange={(e) => setChapterId(parseInt(e.target.value))}
//         >
//           <option value="">Select a chapter</option>
//           {chapters.map((chapter) => (
//             <option key={chapter.id} value={chapter.id}>
//               {chapter.title}
//             </option>
//           ))}
//         </select>

//         <label htmlFor="content">Question:</label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         <label>Options:</label>
//         {options.map((option, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               value={option.content}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               placeholder={`Option ${index + 1}`}
//             />
//             <input
//               type="radio"
//               name="correctOption"
//               checked={option.isCorrect}
//               onChange={() => handleCorrectOptionChange(index)}
//             />
//             <label>Correct</label>
//           </div>
//         ))}

//         <label htmlFor="type">Question Type:</label>
//         <select
//           id="type"
//           value={type}
//           onChange={(e) => setType(e.target.value as QuestionType)}
//         >
//           <option value={QuestionType.DPP}>DPP</option>
//           <option value={QuestionType.TEXTUAL}>Textual</option>
//         </select>

//         <button type="submit">Create Question</button>
//       </form>
//     </div>
//     </DashboardLayout>
//   );
// }


// src/app/dashboard/questions/create/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button'; // Import shadcn/ui Button
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; // Import shadcn/ui Card
import { Input } from '@/components/ui/input'; // Import shadcn/ui Input
import { Textarea } from '@/components/ui/textarea'; // Import shadcn/ui Textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import shadcn/ui Select
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Import shadcn/ui RadioGroup
import { Label } from '@/components/ui/label'; // Import shadcn/ui Label
import { Loader2 } from 'lucide-react'; // Import loading spinner
import { Subject, Chapter, QuestionType } from '@/models/models';

// interface Subject {
//   id: number;
//   name: string;
// }

// interface Chapter {
//   id: number;
//   title: string;
// }

// enum QuestionType {
//   DPP = 'DPP',
//   TEXTUAL = 'TEXTUAL',
// }

export default function CreateQuestionPage() {
  const [content, setContent] = useState('');
  const [type, setType] = useState<QuestionType>(QuestionType.DPP);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [options, setOptions] = useState<{ content: string; isCorrect: boolean }[]>([
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get<Subject[]>('/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch chapters based on selected subject
  useEffect(() => {
    const fetchChapters = async () => {
      if (subjectId) {
        try {
          const response = await axios.get<Chapter[]>(`/api/chapters?subjectId=${subjectId}`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      }
    };
    fetchChapters();
  }, [subjectId]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].content = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subjectId || !chapterId) {
      setError('Please select a subject and chapter');
      return;
    }

    if (options.some((option) => option.content === '')) {
      setError('Please fill all options');
      return;
    }

    if (!options.some((option) => option.isCorrect)) {
      setError('Please select a correct option');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/questions', {
        content,
        type,
        chapterId,
        options,
      });

      if (response.status === 201) {
        router.push('/dashboard/questions');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      setError('Failed to create question');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject Selection */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select onValueChange={(value) => setSubjectId(parseInt(value))}>
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

              {/* Chapter Selection */}
              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter</Label>
                <Select onValueChange={(value) => setChapterId(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((chapter) => (
                      <SelectItem key={chapter.id} value={chapter.id.toString()}>
                        {chapter.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Question Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Question</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the question"
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <Label>Options</Label>
                {options.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      type="text"
                      value={option.content}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <RadioGroup
                      value={option.isCorrect ? index.toString() : ''}
                      onValueChange={() => handleCorrectOptionChange(index)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>Correct</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {/* Question Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Question Type</Label>
                <Select onValueChange={(value) => setType(value as QuestionType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={QuestionType.DPP}>DPP</SelectItem>
                    <SelectItem value={QuestionType.TEXTUAL}>Textual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600">{error}</p>}

              {/* Submit Button */}
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Create Question'
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}