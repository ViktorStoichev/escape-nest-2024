import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../types/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    email = '';
    password = '';
  
    constructor(private auth: AuthService, private router: Router) {}
  
    login() {
      this.auth.login({ email: this.email, password: this.password }).subscribe(
        (res: LoginResponse) => {
          this.auth.saveUser(res);
          this.router.navigate(['/home']);
        },
        (err) => alert('Invalid email or password!')
      );
    }
}
