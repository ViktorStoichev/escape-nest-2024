import { Component, signal } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../../types/post';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from "../../global/loader/loader.component";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '../../global/pipes/slice.pipe';

@Component({
    selector: 'app-search',
    imports: [LoaderComponent, FormsModule, RouterLink, CommonModule, SlicePipe],
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {
    posts = signal<Post[]>([]);
    filteredPosts = signal<Post[]>([]);
    isLoading = signal(true);
    searchTerm: string = '';

    constructor(public postService: PostService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        this.postService.getPosts().subscribe((data) => {
            this.posts.set(data);
            this.filteredPosts.set(data);
            this.isLoading.set(false);
        });
    }

    filterPosts() {
        this.filteredPosts.set(this.posts().filter(post =>
            post.place.location.toLowerCase().includes(this.searchTerm.toLowerCase())
        ));
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
}
