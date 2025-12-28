import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Load user from localStorage on init
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, { username, password }).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user.token || '');
                this.currentUserSubject.next(user);
            })
        );
    }

    register(username: string, password: string, role: string = 'USER'): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, { username, password, role }).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user.token || '');
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return !!this.currentUserSubject.value;
    }

    isAdmin(): boolean {
        const user = this.currentUser;
        return user?.role === 'ADMIN';
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
