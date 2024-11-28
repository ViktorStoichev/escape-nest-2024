import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserDataResponse } from '../types/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {
        this.checkLoggedIn();
    }

    private checkLoggedIn() {
        this.http.get(`/auth/me`).subscribe(
          () => {
            this.isLoggedInSubject.next(true);
          },
          () => {
            this.isLoggedInSubject.next(false);
          }
        );
      }

    register(user: { avatar: string, username: string; email: string; password: string }): Observable<UserDataResponse> {
        return this.http.post<UserDataResponse>(`/auth/register`, user).pipe(
            tap(() => {
              this.isLoggedInSubject.next(true);
              this.router.navigate(['/home']);
            })
          );
    }

    login(user: { email: string; password: string }): Observable<UserDataResponse> {
        return this.http.post<UserDataResponse>(`/auth/login`, user).pipe(
            tap(() => {
              this.isLoggedInSubject.next(true);
              this.router.navigate(['/home']);
            })
          );
    }

    visitUser(userId: string): Observable<UserDataResponse> {
        return this.http.get<UserDataResponse>(`/auth/visit-profile/${userId}`);
    }

    getUserData(): Observable<UserDataResponse> {
        return this.http.get<UserDataResponse>(`/auth/me`);
    }

    logout(): Observable<void> {
        return this.http.post<void>(`/auth/logout`, {}).pipe(
            tap(() => {
              this.isLoggedInSubject.next(false);
              this.router.navigate(['/login']);
            })
          );
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }
}
