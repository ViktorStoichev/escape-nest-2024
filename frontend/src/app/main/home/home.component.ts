import { Component } from '@angular/core';
import { PostService } from '../../post/post.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post } from '../../types/post';
import { LoaderComponent } from "../../global/loader/loader.component";
import { SlicePipe } from '../../global/pipes/slice.pipe';

@Component({
    selector: 'app-home',
    imports: [RouterLink, LoaderComponent, SlicePipe],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    posts: Post[] = [];
    isLoading = true;

    constructor(private postService: PostService, private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.loadRecentPosts();
    }

    loadRecentPosts() {
        this.postService.getPosts(4).subscribe((data) => {
            this.posts = data;
            this.isLoading = false;
        })
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
