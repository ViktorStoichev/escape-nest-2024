import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatchPasswordsDirective } from '../../error/directives/match-passwords.directive';
import { EmailValidatorDirective } from '../../error/directives/validate-email.directive';
import { UserDataResponse } from '../../types/user';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule, CommonModule, MatchPasswordsDirective, EmailValidatorDirective],
    standalone: true,
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
            (res: UserDataResponse) => {
                console.log('Registration successful!');
                this.router.navigate(['/home']);
            },
            (err) => {
                alert('Registration failed. Try again.');
            }
        );
    }
}
