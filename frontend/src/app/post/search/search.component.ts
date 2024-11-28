import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../../types/post';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from "../../global/loader/loader.component";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    imports: [LoaderComponent, FormsModule, RouterLink, CommonModule],
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    posts: Post[] = [];
    filteredPosts: Post[] = [];
    isLoading = true;
    searchTerm: string = '';

    constructor(public postService: PostService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        this.postService.getPosts().subscribe((data) => {
            this.posts = data;
            this.filteredPosts = data;
            this.isLoading = false;
        });
    }

    filterPosts() {
        this.filteredPosts = this.posts.filter(post =>
            post.place.location.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
