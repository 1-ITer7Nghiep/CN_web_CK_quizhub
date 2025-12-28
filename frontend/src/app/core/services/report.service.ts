import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Report {
    id: number;
    quizId: number;
    reporterId: number;
    reason: string;
    status: string;
    createdAt: string;
}

export interface ReportRequest {
    quizId: number;
    reporterId: number;
    reason: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private apiUrl = `${environment.apiUrl}/reports`;

    constructor(private http: HttpClient) { }

    createReport(report: ReportRequest): Observable<Report> {
        return this.http.post<Report>(this.apiUrl, report);
    }

    getAllReports(): Observable<Report[]> {
        return this.http.get<Report[]>(this.apiUrl);
    }

    updateReportStatus(id: number, status: string): Observable<Report> {
        return this.http.put<Report>(`${this.apiUrl}/${id}/status?status=${status}`, {});
    }
}
