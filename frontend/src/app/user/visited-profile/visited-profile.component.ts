import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderComponent } from "../../global/loader/loader.component";
import { Post } from '../../types/post';
import { PostService } from '../../post/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDataResponse } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-visited-profile',
    imports: [LoaderComponent, RouterLink],
    standalone: true,
    templateUrl: './visited-profile.component.html',
    styleUrl: './visited-profile.component.css'
})
export class VisitedProfileComponent implements OnDestroy, OnInit {
    user: UserDataResponse | null = null;
    userPosts: Post[] = [];
    isLoading: boolean = true;

    private subscriptions: Subscription = new Subscription();

    constructor( private authService: AuthService, private postService: PostService, private activateRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadUserProfile();
    }

    loadUserProfile(): void {
        const userId = this.activateRoute.snapshot.params['userId'];
        const visitUserSub = this.authService.visitUser(userId).subscribe((data) => {
            this.user = data;
            this.loadUserPosts();
            this.isLoading = false;
        });
        this.subscriptions.add(visitUserSub);
    }

    loadUserPosts(): void {
        if (this.user) {
            const userPostsSub = this.postService.getUserPosts(this.user?._id).subscribe((data) => {
              this.userPosts = data;
            });
            this.subscriptions.add(userPostsSub);
        }
      }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
