import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../types/register';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    register(user: { avatar: string, username: string; email: string; password: string }): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`/auth/register`, user);
    }

    login(user: { email: string; password: string }) {
        return this.http.post<LoginResponse>(`/auth/login`, user);
    }

    saveUser(user: { _id: string, avatar: string, username: string; email: string }): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): { _id: string, avatar: string, username: string; email: string, createdAt: string, updatedAt: string } | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    visitUser(userId: string): Observable<LoginResponse> {
        return this.http.get<LoginResponse>(`/auth/visit-profile/${userId}`);
    }

    logout(): void {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }
}
