import { QuestionRequest, Question } from './question.model';

export interface Quiz {
    id: number;
    title: string;
    description: string;
    duration: number;
    createdBy: number;
    status: string;
    questions?: Question[];
}

export interface QuizRequest {
    title: string;
    description: string;
    duration: number;
    createdBy: number;
    questions: QuestionRequest[];
}

// Re-export for convenience
export { QuestionRequest };
