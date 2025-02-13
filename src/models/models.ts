// src/models/models.ts

export interface Subject {
    id: number;
    name: string;
    chapters?: Chapter[];
  }

export interface Class {
    id: number;
    name: string; 
    createdAt: Date; 
    subjects?: Subject[]; 
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
    createdAt:Date | string;
  }

export interface Option {
    content: string;
    isCorrect: boolean;
  }

