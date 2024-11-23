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
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient, private router: Router) { }

    register(user: { avatar: string, username: string; email: string; password: string }): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
    }

    login(user: { email: string; password: string }) {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user);
    }

    saveUser(user: { avatar: string, username: string; email: string }): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): { avatar: string, username: string; email: string } | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    logout(): void {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }
}