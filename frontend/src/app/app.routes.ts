import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './home/about/about.component';

export const routes: Routes = [
    // Home and About routing
    { path: 'about', component: AboutComponent },
    
    // User routing
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];
