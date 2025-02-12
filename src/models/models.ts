// src/models/models.ts

export interface Subject {
    id: number;
    name: string;
    chapters?: Chapter[];
  }

export interface Class {
    id: number; // Unique identifier for the class
    name: string; // Name of the class (e.g., "8th", "9th")
    createdAt: Date; // Timestamp when the class was created
    subjects?: Subject[]; // Optional list of subjects associated with the class
  }
  
export interface Option {
      id: number;
      content: string;
      isCorrect: boolean;
      questionId: number;
  }
  
export enum QuestionType {
    DPP = "DPP",
    TEXTUAL = "TEXTUAL",
  }
  
export interface Question {
    id: number;
    content: string;
    type: QuestionType;
    chapterId: number;
    chapter?: Chapter;
    options?: Option[];
    questionPapers?: QuestionPaper[];
  }
  
export interface Chapter {
    id: number;
    title: string;
    subjectId: number;
    subject?: Subject;
    questions?: Question[];
    questionPapers?: QuestionPaper[];
    createdAt:Date | string;
  }
  
export interface QuestionPaper {
    id: number;
    name: string;
    questions?: Question[];
    chapters?: Chapter[];
  }

export interface Option {
    content: string;
    isCorrect: boolean;
  }

