import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDataResponse } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [RouterLink, FormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
    user = {
        email: '',
        password: ''
    }

    errorMsg: string = '';

    private subscriptions: Subscription = new Subscription();

    constructor(private auth: AuthService, private router: Router) { }

    login() {
        const loginSub = this.auth.login({ email: this.user.email, password: this.user.password }).subscribe(
            (res: UserDataResponse) => {
                this.errorMsg = '';
                this.router.navigate(['/home']);
            },
            (err) => {
                this.showError(err.error.message);
            }
        );
        this.subscriptions.add(loginSub);
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
