import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { PostService } from '../../post/post.service';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../global/loader/loader.component';
import { UserDataResponse } from '../../types/user';

@Component({
    selector: 'app-profile',
    imports: [LoaderComponent, RouterLink],
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    user: UserDataResponse | null = null;
    userPosts: Post[] = [];
    isLoading: boolean = true;
  
    constructor( private authService: AuthService, private postService: PostService) {}
  
    ngOnInit(): void {
      this.loadUserProfile();
    }
  
    loadUserProfile(): void {
      this.authService.getUserData().subscribe((data) => {
        this.user = data;
        this.loadUserPosts();
        this.isLoading = false
      });
    }
  
    loadUserPosts(): void {
      if (this.user) {
          this.postService.getUserPosts(this.user._id).subscribe((data) => {
            this.userPosts = data;
          });
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
}
