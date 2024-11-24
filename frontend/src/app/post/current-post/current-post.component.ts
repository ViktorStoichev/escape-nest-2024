import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";

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

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private router: Router) { }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params['postId'];
        this.getPost(id);
    }

    getPost(id: string) {
        this.postService.getSinglePost(id).subscribe((data) => {
            this.post = data;
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
        this.datePipe.transform(date, 'short');
    }
}
