import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
    // Home and About routing
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },

    // User routing
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
