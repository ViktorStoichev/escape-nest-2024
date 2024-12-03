import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkLoggedIn().pipe(
      map((isLoggedIn) => {
        console.log('--', isLoggedIn);
        if (!isLoggedIn) {
          this.router.navigate(['/404']);
        }
        return isLoggedIn;
      })
    );
  }
  
}