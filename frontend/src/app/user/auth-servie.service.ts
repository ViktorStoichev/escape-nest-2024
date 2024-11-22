import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthServieService {
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient, private router: Router) { }

    register(user: { username: string; email: string; password: string }) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(user: { email: string; password: string }) {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    saveUser(user: { username: string; email: string }): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): { username: string; email: string } | null {
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
