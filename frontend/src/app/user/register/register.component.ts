import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    username = '';
    email = '';
    password = '';
  
    constructor(private auth: AuthService) {}
  
    register() {
      this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe(
        () => alert('Registration successful!'),
        (err) => alert('Registration failed. Try again.')
      );
    }
}
