import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegisterResponse } from '../../types/register';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatchPasswordsDirective } from '../../error/directives/match-passwords.directive';
import { EmailValidatorDirective } from '../../error/directives/validate-email.directive';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule, CommonModule, MatchPasswordsDirective, EmailValidatorDirective],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    user = {
        avatar: '',
        username: '',
        email: '',
        password: '',
        rePassword: ''
    }

    constructor(private auth: AuthService, private router: Router) { }

    register() {
        this.auth.register({ avatar: this.user.avatar, username: this.user.username, email: this.user.email, password: this.user.password }).subscribe(
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
