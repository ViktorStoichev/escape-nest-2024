import { Routes } from '@angular/router';
import { UserGuard } from './user/user.guard';
import { GuestGuard } from './user/guest.guard';

export const routes: Routes = [
    // Home and About routing
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./main/home/home.component').then((c) => c.HomeComponent) },
    { path: 'about', loadComponent: () => import('./main/about/about.component').then((c) => c.AboutComponent) },

    // User routing
    { path: 'register', loadComponent: () => import('./user/register/register.component').then((c) => c.RegisterComponent), canActivate: [GuestGuard] },
    { path: 'login', loadComponent: () => import('./user/login/login.component').then((c) => c.LoginComponent), canActivate: [GuestGuard] },
    { path: 'profile', loadComponent: () => import('./user/profile/profile.component').then((c) => c.ProfileComponent), canActivate: [UserGuard] },
    { path: 'visit-profile/:userId', loadComponent: () => import('./user/visited-profile/visited-profile.component').then((c) => c.VisitedProfileComponent ), canActivate: [UserGuard] },

    // Post routing
    { path: 'posts', children: [
        { path: '', loadComponent: () => import('./post/publications/publications.component').then((c) => c.PublicationsComponent) },
        { path: 'add-post', loadComponent: () => import('./post/add-post/add-post.component').then((c) => c.AddPostComponent), canActivate: [UserGuard] },
        { path: 'search', loadComponent: () => import('./post/search/search.component').then((c) => c.SearchComponent), canActivate: [UserGuard] },
        { path: ':postId', loadComponent: () => import('./post/current-post/current-post.component').then((c) => c.CurrentPostComponent) },
        { path: ':postId/edit', loadComponent: () => import('./post/edit-post/edit-post.component').then((c) => c.EditPostComponent), canActivate: [UserGuard] }
    ]  },

    { path: '404', loadComponent: () => import('./error/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent) },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
