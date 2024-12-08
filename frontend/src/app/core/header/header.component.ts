import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    imports: [RouterLink, CommonModule, RouterModule],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    isLoggedIn$: Observable<boolean>;

    constructor(private auth: AuthService) {
        this.isLoggedIn$ = this.auth.isLoggedIn();

        this.auth.checkLoggedIn().subscribe();
     }

    logout(): void {
        this.auth.logout().subscribe();
    }
}
