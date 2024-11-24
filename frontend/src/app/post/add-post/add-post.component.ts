import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '../../types/post';
import { AuthService } from '../../user/auth.service';
import { LoginResponse } from '../../types/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
    post = {
        imageUrl: '',
        location: '',
        region: '',
        description: '',
    };
    user: LoginResponse | null = null

    constructor(private authService: AuthService, private postService: PostService, private router: Router) { }
    
    
    onSubmit(form: NgForm, event: Event, imageUrl: string, location: string, region: string, description: string) {
        this.user = this.authService.getUser();
        event.preventDefault();

        if (form.valid) {
            console.log('Form submitted:', this.post);
        } else {
            console.error('Form is invalid!');
        }

        this.postService.createPost({ place: { imageUrl, location, region }, owner: this.user?._id, description }).subscribe({
            next: (response: Post) => {
                console.log('Data added successfully:', response);
                this.router.navigate(['/posts']);
            },
            error: (errorMessage: string) => {
                console.error('Error adding data:', errorMessage);
            },
        });
    }
}
