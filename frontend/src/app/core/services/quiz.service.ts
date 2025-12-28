import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, QuizRequest } from '../../shared/models/quiz.model';
import { Question } from '../../shared/models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private apiUrl = 'http://localhost:8080/api/quizzes';

    constructor(private http: HttpClient) { }

    getAllQuizzes(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.apiUrl);
    }

    getQuizzesByUser(userId: number): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(`${this.apiUrl}/user/${userId}`);
    }

    getQuizById(id: number): Observable<Quiz> {
        return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
    }

    createQuiz(quiz: QuizRequest): Observable<Quiz> {
        return this.http.post<Quiz>(this.apiUrl, quiz);
    }

    updateQuiz(id: number, quiz: QuizRequest): Observable<Quiz> {
        return this.http.put<Quiz>(`${this.apiUrl}/${id}`, quiz);
    }

    deleteQuiz(id: number, userId: number, isAdmin: boolean): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}?userId=${userId}&isAdmin=${isAdmin}`);
    }

    parseFile(file: File): Observable<any[]> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any[]>(`${this.apiUrl}/parse-file`, formData);
    }
}
