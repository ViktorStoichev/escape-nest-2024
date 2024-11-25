import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";
import { LoginResponse } from '../../types/login';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-current-post',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './current-post.component.html',
  styleUrl: './current-post.component.css'
})
export class CurrentPostComponent {
    post: Post | null = null;
    isLoading = true;
    // newComment: string = '';
    user: LoginResponse | null = null
    owner: LoginResponse | null = null
    isOwner: boolean = false;

    constructor(private authService: AuthService, private postService: PostService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router) { }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        const id = this.activatedRoute.snapshot.params['postId'];
        this.getPost(id);
    }
    
    getPost(id: string) {
        this.postService.getSinglePost(id).subscribe((data) => {
            this.post = data;
            if (this.user?._id == this.post.owner._id) {
                this.isOwner = true;
                this.owner = this.user;
            }
            this.isLoading = false;
        })
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

    // addComment() {
    //     if (this.newComment.trim()) {
    //         this.post?.comments.push({
    //             username: 'User', // Replace with the actual username
    //             content: this.newComment,
    //         });
    //         this.newComment = ''; // Clear the input field
    //     }
    // }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
