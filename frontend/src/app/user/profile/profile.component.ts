import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostService } from '../../post/post.service';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../global/loader/loader.component';
import { UserDataResponse } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    imports: [LoaderComponent, RouterLink],
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnDestroy, OnInit {
    user: UserDataResponse | null = null;
    userPosts: Post[] = [];
    isLoading: boolean = true;

    private subscriptions: Subscription = new Subscription();

    constructor(private authService: AuthService, private postService: PostService) { }

    ngOnInit(): void {
        this.loadUserProfile();
    }

    loadUserProfile(): void {
        const userSub = this.authService.getUserData().subscribe((data) => {
            this.user = data;
            this.loadUserPosts();
            this.isLoading = false
        });
        this.subscriptions.add(userSub);
    }

    loadUserPosts(): void {
        if (this.user) {
            const userPostsSub = this.postService.getUserPosts(this.user._id).subscribe((data) => {
                this.userPosts = data;
            });
            this.subscriptions.add(userPostsSub);
        }
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    logout(): void {
        this.authService.logout().subscribe(
            () => {
            },
            error => {
                console.error('Logout failed', error);
            }
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
