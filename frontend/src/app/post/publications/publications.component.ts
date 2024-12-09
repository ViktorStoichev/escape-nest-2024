import { Component, signal } from '@angular/core';
import { PostService } from '../post.service';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../global/loader/loader.component";
import { SlicePipe } from '../../global/pipes/slice.pipe';

@Component({
    selector: 'app-publications',
    imports: [RouterLink, LoaderComponent, SlicePipe],
    standalone: true,
    templateUrl: './publications.component.html',
    styleUrl: './publications.component.css'
})
export class PublicationsComponent {
    posts = signal<Post[]>([]);
    isLoading = signal(true);

    constructor(public postService: PostService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        this.postService.getPosts().subscribe((data) => {
            this.posts.set(data);
            this.isLoading.set(false);
        });
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
