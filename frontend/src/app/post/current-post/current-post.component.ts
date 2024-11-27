import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";
import { LoginResponse } from '../../types/login';
import { AuthService } from '../../user/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-post',
  standalone: true,
  imports: [LoaderComponent, RouterLink, FormsModule],
  templateUrl: './current-post.component.html',
  styleUrl: './current-post.component.css'
})
export class CurrentPostComponent {
    post: Post | null = null;
    isLoading = true;
    newComment: string = '';
    user: LoginResponse | null = null
    owner: LoginResponse | null = null
    isOwner: boolean = false;
    hasUser: boolean = false;

    constructor(private authService: AuthService, private postService: PostService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router) { }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.user ? this.hasUser = true : this.hasUser = false;
        const id = this.activatedRoute.snapshot.params['postId'];
        this.getPost(id);
    }
    
    getPost(id: string) {
        this.postService.getSinglePost(id).subscribe((data) => {
            this.post = data;
            console.log(this.post);
            if (this.user?._id == this.post.owner._id) {
                this.isOwner = true;
                this.owner = this.user;
            }
            this.isLoading = false;
        });
    }

    deletePost() {
        const id: string = this.activatedRoute.snapshot.params['postId'];
        this.postService.deletePost(id).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (error) => console.error(error),
        });;
        this.router.navigate(['/posts']);
    }

    isPosting: boolean = false;

    addComment() {
        if (this.newComment.trim()) {
            this.isPosting = true;
            const id = this.activatedRoute.snapshot.params['postId'];
            if (this.user) {
                this.postService.addComment( id, { avatar: this.user.avatar, username: this.user.username, text: this.newComment }).subscribe({
                    next: (response) => { 
                        this.newComment = '';
                        this.isPosting = false;
                        this.getPost(id)
                    },
                    error: (error) => {
                        console.error('Error posting comment:', error)
                        this.isPosting = false;
                    }
                        
                });
            }
        }
    }

    likePost(): void {
        if (this.post && this.user) {
            const userId = this.user._id
            if (!this.post.likes.includes(userId) && !this.post.dislikes.includes(userId)) {
                this.postService.like(this.post._id, userId).subscribe((updatedPost) => {
                  this.post = updatedPost;
                });
            }
        }
    }

    dislikePost(): void {
        if (this.post && this.user) {
            const userId = this.user._id
            if (!this.post.likes.includes(userId) && !this.post.dislikes.includes(userId)) {
                this.postService.dislike(this.post._id, userId).subscribe((updatedPost) => {
                  this.post = updatedPost;
                });
            }
        }
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
