import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../types/login';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDataResponse } from '../../types/user';

@Component({
    selector: 'app-login',
    imports: [RouterLink, FormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    user = {
        email: '',
        password: ''
    }
  
    constructor(private auth: AuthService, private router: Router) {}
  
    login() {
      this.auth.login({ email: this.user.email, password: this.user.password }).subscribe(
        (res: UserDataResponse) => {
            console.log('Logged in');
            this.router.navigate(['/home']);
        },
        (err) => alert('Invalid email or password!')
      );
    }
}
