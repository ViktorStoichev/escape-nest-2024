import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../types/post';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../global/loader/loader.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-post',
    imports: [FormsModule, CommonModule, LoaderComponent],
    standalone: true,
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnDestroy, OnInit {
    data: Post | null = null;
    isLoading = true;
    post = {
        imageUrl: '',
        location: '',
        region: '',
        description: '',
    };

    private subscriptions: Subscription = new Subscription();

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params['postId'];
        const postSub = this.postService.getSinglePost(id).subscribe((data) => {
            this.data = data;
            this.isLoading = false;

            this.post.imageUrl = data.place.imageUrl;
            this.post.location = data.place.location;
            this.post.region = data.place.region;
            this.post.description = data.description;
        });
        this.subscriptions.add(postSub);
    }

    onSubmit(form:NgForm, event: Event, imageUrl: string, location: string, region: string, description: string) {
        event.preventDefault();

        const id = this.activatedRoute.snapshot.params['postId']
        const editSub = this.postService.editPost(id, {place: {imageUrl, location, region}, description}).subscribe({
            next: (response) => {
                this.router.navigate([`/posts/${id}`]);
              },
              error: (error) => {
                console.error('Error adding data:', error);
              },
        });
        this.subscriptions.add(editSub);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
