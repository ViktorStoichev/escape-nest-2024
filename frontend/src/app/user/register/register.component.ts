import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { MatchPasswordsDirective } from '../../directives/match-passwords.directive';
import { EmailValidatorDirective } from '../../directives/validate-email.directive';
import { UserDataResponse } from '../../types/user';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule, CommonModule, MatchPasswordsDirective, EmailValidatorDirective],
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
    user = {
        avatar: '',
        username: '',
        email: '',
        password: '',
        rePassword: ''
    }

    errorMsg: string = '';

    private subscriptions: Subscription = new Subscription();

    constructor(private auth: AuthService, private router: Router) { }

    register() {
        const registerSub = this.auth.register({ avatar: this.user.avatar, username: this.user.username, email: this.user.email, password: this.user.password }).subscribe(
            (res: UserDataResponse) => {
                this.errorMsg = '';
                this.router.navigate(['/home']);
            },
            (err) => {
                this.showError(err.error.message);
            }
        );
        this.subscriptions.add(registerSub);
    }

    showError(message: string) {
        this.errorMsg = message;
    
        setTimeout(() => {
          this.errorMsg = '';
        }, 5000);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
