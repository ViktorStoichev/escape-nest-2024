import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterResponse } from '../../types/register';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    avatar = '';
    username = '';
    email = '';
    password = '';
    rePassword = '';
  
    constructor(private auth: AuthService, private router: Router) {}
  
    register() {
      this.auth.register({ avatar: this.avatar, username: this.username, email: this.email, password: this.password }).subscribe(
        (res: RegisterResponse) => {
            console.log(res.message);
            alert('Registration successful!');
            this.router.navigate(['/login']);
          },
          (err) => {
            alert('Registration failed. Try again.');
          }
      );
    }
}
