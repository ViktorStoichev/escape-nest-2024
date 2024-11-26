import { Component } from '@angular/core';
import { LoaderComponent } from "../../global/loader/loader.component";
import { AuthService } from '../auth.service';
import { PostService } from '../../post/post.service';
import { Post } from '../../types/post';
import { LoginResponse } from '../../types/login';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    user: LoginResponse | null = null;
    userPosts: Post[] = [];
    isLoading: boolean = true;
  
    constructor( private authService: AuthService, private postService: PostService) {}
  
    ngOnInit(): void {
      this.loadUserProfile();
      this.loadUserPosts();
      this.isLoading = false
    }
  
    loadUserProfile(): void {
      // Replace with actual logic to get user profile data
      this.user = this.authService.getUser();
    }
  
    loadUserPosts(): void {
      // Replace with actual logic to get user's posts
      if (this.user) {
          this.postService.getUserPosts(this.user?._id).subscribe((data) => {
            console.log(data);
            this.userPosts = data;
          });
      }
    }
  
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString();
    }
  
    logout(): void {
      this.authService.logout();
    }
}
