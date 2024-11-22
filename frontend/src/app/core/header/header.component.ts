import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    user: { username: string; email: string } | null = null;

    constructor(private auth: AuthService, private router: Router) {}
  
    ngOnInit(): void {
      this.user = this.auth.getUser();
    }
  
    logout(): void {
      this.auth.logout();
      this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
      return this.auth.isLoggedIn();
    }
}
