import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    getPosts(limit?: number): Observable<Post[]> {
        if (limit) {
            return this.http.get<Post[]>(`/posts?limit=${limit}`);
        }
        return this.http.get<Post[]>('/posts');
    }

    getUserPosts(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`/posts/${userId}/userPosts`);
    }

    getSinglePost(postId: string): Observable<Post> {
        return this.http.get<Post>(`/posts/${postId}/details`);
    }

    createPost(post: { place: { imageUrl: string, location: string, region: string }, owner: {}, description: string }): Observable<Post> {
        return this.http.post<Post>('/posts', post);
    }

    editPost(id: string, post: { place: { imageUrl: string, location: string, region: string }, description: string }): Observable<Post> {
        return this.http.post<Post>(`/posts/${id}/edit`, post);
    }

    deletePost(id: string): Observable<Post> {
        return this.http.delete<Post>(`/posts/${id}`);
    }

    addComment(id: string, comment: { avatar: string, username: string, text: string }): Observable<Comment> {
        return this.http.post<Comment>(`/posts/${id}/comments`, comment);
    }

    like(postId: string, userId: string): Observable<Post> {
        return this.http.put<Post>(`/posts/${postId}/like`, { userId });
    }

    dislike(postId: string, userId: string): Observable<Post> {
        return this.http.put<Post>(`/posts/${postId}/dislike`, { userId });
    }
}
