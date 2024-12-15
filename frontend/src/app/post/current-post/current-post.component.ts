import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";
import { AuthService } from '../../user/auth.service';
import { UserDataResponse } from '../../types/user';
import { ConfirmDialogComponent } from '../../global/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-current-post',
    imports: [LoaderComponent, RouterLink, FormsModule],
    standalone: true,
    templateUrl: './current-post.component.html',
    styleUrl: './current-post.component.css'
})
export class CurrentPostComponent implements OnDestroy {
    post: Post | null = null;
    isLoading = true;
    newComment: string = '';
    user: UserDataResponse | null = null
    owner: UserDataResponse | null = null
    isOwner: boolean = false;
    hasUser: boolean = false;

    private subscriptions: Subscription = new Subscription();

    constructor(private authService: AuthService,
         private postService: PostService,
          private activatedRoute: ActivatedRoute,
           private datePipe: DatePipe,
            private router: Router, 
            private dialog: MatDialog) { }

    ngOnInit(): void {
        const userSub = this.authService.getUserData().subscribe(
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
        );
        this.subscriptions.add(userSub);
    }

    getPost(id: string) {
        const postSub = this.postService.getSinglePost(id).subscribe((data) => {
            this.post = data;
            if (this.user?._id == this.post.owner._id) {
                this.isOwner = true;
                this.owner = this.user;
            }
            this.isLoading = false;
        });
        this.subscriptions.add(postSub);
    }

    deletePost() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        const id: string = this.activatedRoute.snapshot.params['postId'];

        const dialogSub = dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.postService.deletePost(id).subscribe({
                    next: (response) => {
                        this.router.navigate(['/posts']);
                    },
                    error: (error) => console.error(error),
                });
            }
        });
        this.subscriptions.add(dialogSub);
    }

    isPosting: boolean = false;

    addComment() {
        if (this.newComment.trim()) {
            this.isPosting = true;
            const id = this.activatedRoute.snapshot.params['postId'];
            if (this.user) {
                const commentSub = this.postService.addComment(id, { avatar: this.user.avatar, username: this.user.username, text: this.newComment }).subscribe({
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
                this.subscriptions.add(commentSub);
            }
        }
    }

    toggleReaction(reaction: 'like' | 'dislike'): void {
        if (this.post && this.user) {
            const reactionSub = this.postService.toggleReaction(this.post._id, this.user._id, reaction).subscribe((updatedPost: Post) => {
            this.post = updatedPost;
          });
          this.subscriptions.add(reactionSub);
        }
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
