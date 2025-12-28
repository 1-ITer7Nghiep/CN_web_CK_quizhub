export interface Result {
    id: number;
    userId: number;
    quizId: number;
    score: number;
    timestamp: string;
    quizTitle: string;
}

export interface ResultRequest {
    userId: number;
    quizId: number;
    score: number;
    quizTitle: string;
}
