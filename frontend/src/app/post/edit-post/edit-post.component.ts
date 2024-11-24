import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../types/post';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../global/loader/loader.component";

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
    data: Post | null = null;
    isLoading = true;
    post = {
        imageUrl: '',
        location: '',
        region: '',
        description: '',
    };

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params['postId'];
        this.postService.getSinglePost(id).subscribe((data) => {
            this.data = data;
            this.isLoading = false;

            this.post.imageUrl = data.place.imageUrl;
            this.post.location = data.place.location;
            this.post.region = data.place.region;
            this.post.description = data.description;
        })
    }

    onSubmit(form:NgForm, event: Event, imageUrl: string, location: string, region: string, description: string) {
        event.preventDefault();

        const id = this.activatedRoute.snapshot.params['postId']
        this.postService.editPost(id, {place: {imageUrl, location, region}, description}).subscribe({
            next: (response) => {
                console.log('Data added successfully:', response);
                this.router.navigate([`/posts/${id}`]);
              },
              error: (error) => {
                console.error('Error adding data:', error);
              },
        })
    }
}
