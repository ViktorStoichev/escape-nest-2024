import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
    // User routing
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
