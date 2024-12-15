import { Component, OnDestroy, signal } from '@angular/core';
import { PostService } from '../post.service';
import { DatePipe } from '@angular/common';
import { Post } from '../../types/post';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../../global/loader/loader.component";
import { SlicePipe } from '../../global/pipes/slice.pipe';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-publications',
    imports: [RouterLink, LoaderComponent, SlicePipe],
    standalone: true,
    templateUrl: './publications.component.html',
    styleUrl: './publications.component.css'
})
export class PublicationsComponent implements OnDestroy {
    posts = signal<Post[]>([]);
    isLoading = signal(true);

    private subscriptions: Subscription = new Subscription();

    constructor(public postService: PostService, private datePipe: DatePipe) {}

    ngOnInit() {
        this.loadPosts();
    }

    loadPosts() {
        const postsSub = this.postService.getPosts().subscribe((data) => {
            this.posts.set(data);
            this.isLoading.set(false);
        });
        this.subscriptions.add(postsSub);
    }

    formatDate(date: string) {
        return this.datePipe.transform(date, 'short');
    }
    
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
