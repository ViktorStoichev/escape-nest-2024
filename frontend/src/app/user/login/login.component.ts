import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../types/login';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from '../../error/directives/validate-email.directive';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [RouterLink, FormsModule, CommonModule],
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
        (res: LoginResponse) => {
          this.auth.saveUser(res);
          this.router.navigate(['/home']);
        },
        (err) => alert('Invalid email or password!')
      );
    }
}
