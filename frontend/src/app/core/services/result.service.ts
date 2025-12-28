import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result, ResultRequest } from '../../shared/models/result.model';

@Injectable({
    providedIn: 'root'
})
export class ResultService {
    private apiUrl = 'http://localhost:8080/api/result';

    constructor(private http: HttpClient) { }

    saveResult(result: ResultRequest): Observable<Result> {
        return this.http.post<Result>(`${this.apiUrl}/save`, result);
    }

    getUserResults(userId: number): Observable<Result[]> {
        return this.http.get<Result[]>(`${this.apiUrl}/user/${userId}`);
    }

    getQuizResults(quizId: number): Observable<Result[]> {
        return this.http.get<Result[]>(`${this.apiUrl}/quiz/${quizId}`);
    }
}
