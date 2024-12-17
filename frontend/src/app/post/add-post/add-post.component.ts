import { Component, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Post } from '../../types/post';
import { AuthService } from '../../user/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserDataResponse } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-post',
    imports: [FormsModule, CommonModule],
    standalone: true,
    templateUrl: './add-post.component.html',
    styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnDestroy {
    post = {
        imageUrl: '',
        location: '',
        region: '',
        description: '',
    };
    user: UserDataResponse | null = null

    private subscriptions: Subscription = new Subscription();

    constructor(private authService: AuthService, private postService: PostService, private router: Router) { }


    onSubmit(form: NgForm, event: Event, imageUrl: string, location: string, region: string, description: string) {
        event.preventDefault();
        
        const userSub = this.authService.getUserData().subscribe((data) => {
            this.user = data;
            this.postService.createPost({ place:
                { imageUrl, location, region }, owner: { _id: this.user?._id, avatar: this.user?.avatar, username: this.user?.username }, description }
               ).subscribe({
               next: (response: Post) => {
                   this.router.navigate(['/posts']);
               },
               error: (errorMessage: string) => {
                   console.error('Error adding data:', errorMessage);
               },
           });
        });
        this.subscriptions.add(userSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
