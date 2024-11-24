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

export const routes: Routes = [
    // Home and About routing
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },

    // User routing
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    // Post routing
    { path: 'posts', children: [
        { path: '', component: PublicationsComponent },
        { path: 'add-post', component: AddPostComponent },
        { path: 'search', component: SearchComponent },
        { path: ':postId', component: CurrentPostComponent },
        { path: ':postId/edit', component: EditPostComponent }
    ]  },

    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
