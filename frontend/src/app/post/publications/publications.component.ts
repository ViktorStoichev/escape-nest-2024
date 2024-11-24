import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../global/loader/loader.component";

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.css'
})
export class PublicationsComponent {
    posts: Post[] = [];
    isLoading = true;

    constructor(public postService: PostService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        this.postService.getPosts().subscribe((data) => {
            this.posts = data;
            this.isLoading = false;
        });
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
