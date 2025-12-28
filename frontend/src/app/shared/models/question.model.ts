export interface Question {
    id: number;
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
}

export interface QuestionRequest {
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
}
