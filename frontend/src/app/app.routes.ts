import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './user/auth.guard';
import { PublicationsComponent } from './post/publications/publications.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { SearchComponent } from './post/search/search.component';
import { CurrentPostComponent } from './post/current-post/current-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { GuestGuard } from './user/guest.guard';

export const routes: Routes = [
    // Home and About routing
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home/home.component').then((c) => c.HomeComponent) },
    { path: 'about', loadComponent: () => import('./home/about/about.component').then((c) => c.AboutComponent) },

    // User routing
    { path: 'register', loadComponent: () => import('./user/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./user/login/login.component').then((c) => c.LoginComponent) },
    { path: 'profile', loadComponent: () => import('./user/profile/profile.component').then((c) => c.ProfileComponent) },
    { path: 'visit-profile/:userId', loadComponent: () => import('./user/visited-profile/visited-profile.component').then((c) => c.VisitedProfileComponent ) },

    // Post routing
    { path: 'posts', children: [
        { path: '', loadComponent: () => import('./post/publications/publications.component').then((c) => c.PublicationsComponent) },
        { path: 'add-post', loadComponent: () => import('./post/add-post/add-post.component').then((c) => c.AddPostComponent) },
        { path: 'search', loadComponent: () => import('./post/search/search.component').then((c) => c.SearchComponent) },
        { path: ':postId', loadComponent: () => import('./post/current-post/current-post.component').then((c) => c.CurrentPostComponent) },
        { path: ':postId/edit', loadComponent: () => import('./post/edit-post/edit-post.component').then((c) => c.EditPostComponent) }
    ]  },

    { path: '404', loadComponent: () => import('./error/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent) },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
