import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from "../../global/loader/loader.component";
import { Post } from '../../types/post';
import { PostService } from '../../post/post.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDataResponse } from '../../types/user';

@Component({
    selector: 'app-visited-profile',
    imports: [LoaderComponent, RouterLink],
    standalone: true,
    templateUrl: './visited-profile.component.html',
    styleUrl: './visited-profile.component.css'
})
export class VisitedProfileComponent implements OnInit {
    user: UserDataResponse | null = null;
    userPosts: Post[] = [];
    isLoading: boolean = true;

    constructor( private authService: AuthService, private postService: PostService, private activateRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadUserProfile();
    }

    loadUserProfile(): void {
        const userId = this.activateRoute.snapshot.params['userId'];
        this.authService.visitUser(userId).subscribe((data) => {
            this.user = data;
            this.loadUserPosts();
            this.isLoading = false;
        });
    }

    loadUserPosts(): void {
        if (this.user) {
            this.postService.getUserPosts(this.user?._id).subscribe((data) => {
              this.userPosts = data;
            });
        }
      }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }
}
