import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Notification {
    id: number;
    userId: number;
    message: string;
    read: boolean;
    type: string;
    relatedId: number;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = 'http://localhost:8080/api/notifications';
    private unreadCountSubject = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadCountSubject.asObservable();

    constructor(private http: HttpClient, private authService: AuthService) {
        // Poll for notifications every 30 seconds if user is logged in
        timer(0, 30000).pipe(
            switchMap(() => {
                const user = this.authService.currentUser;
                if (user) {
                    return this.getUnreadCount(user.id);
                }
                return [];
            })
        ).subscribe();
    }

    getUserNotifications(userId: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/${userId}`);
    }

    getUnreadCount(userId: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/${userId}/unread-count`).pipe(
            tap(count => this.unreadCountSubject.next(count))
        );
    }

    markAsRead(id: number): Observable<Notification> {
        return this.http.put<Notification>(`${this.apiUrl}/${id}/read`, {}).pipe(
            tap(() => {
                const currentCount = this.unreadCountSubject.value;
                if (currentCount > 0) {
                    this.unreadCountSubject.next(currentCount - 1);
                }
            })
        );
    }
}
