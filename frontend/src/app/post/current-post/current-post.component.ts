import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";
import { AuthService } from '../../user/auth.service';
import { FormsModule } from '@angular/forms';
import { UserDataResponse } from '../../types/user';

@Component({
    selector: 'app-current-post',
    imports: [LoaderComponent, RouterLink, FormsModule],
    standalone: true,
    templateUrl: './current-post.component.html',
    styleUrl: './current-post.component.css'
})
export class CurrentPostComponent {
    post: Post | null = null;
    isLoading = true;
    newComment: string = '';
    user: UserDataResponse | null = null
    owner: UserDataResponse | null = null
    isOwner: boolean = false;
    hasUser: boolean = false;

    constructor(private authService: AuthService, private postService: PostService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router) { }

    ngOnInit(): void {
        this.authService.getUserData().subscribe(
            (response) => {
                this.user = response;
                this.hasUser = true;
                const id = this.activatedRoute.snapshot.params['postId'];
                this.getPost(id);
            },
            (error) => {
                this.hasUser = false;
                const id = this.activatedRoute.snapshot.params['postId'];
                this.getPost(id);
            }
        )
    }

    getPost(id: string) {
        this.postService.getSinglePost(id).subscribe((data) => {
            this.post = data;
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
                this.router.navigate(['/posts']);
            },
            error: (error) => console.error(error),
        });;
    }

    isPosting: boolean = false;

    addComment() {
        if (this.newComment.trim()) {
            this.isPosting = true;
            const id = this.activatedRoute.snapshot.params['postId'];
            if (this.user) {
                this.postService.addComment(id, { avatar: this.user.avatar, username: this.user.username, text: this.newComment }).subscribe({
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

    toggleReaction(reaction: 'like' | 'dislike'): void {
        if (this.post && this.user) {
          this.postService.toggleReaction(this.post._id, this.user._id, reaction).subscribe((updatedPost: Post) => {
            this.post = updatedPost;
          });
        }
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
