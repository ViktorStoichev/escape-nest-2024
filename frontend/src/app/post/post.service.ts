import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:3000/posts'

    constructor(private http: HttpClient) { }

    getPosts(limit?: number): Observable<Post[]> {
        if (limit) {
            return this.http.get<Post[]>(`${this.apiUrl}?limit=${limit}`);
        }
        return this.http.get<Post[]>(this.apiUrl);
    }

    getUserPosts(userId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/${userId}/userPosts`);
    }

    getSinglePost(postId: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${postId}/details`);
    }

    createPost(post: { place: { imageUrl: string, location: string, region: string }, owner: {}, description: string }): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, post);
    }

    editPost(id: string, post: { place: { imageUrl: string, location: string, region: string }, description: string }): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/${id}/edit`, post);
    }

    deletePost(id: string): Observable<any> { // Change any
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    addComment(id: string, comment: { avatar: string, username: string, text: string }): Observable<Comment> {
        return this.http.post<Comment>(`${this.apiUrl}/${id}/comments`, comment);
    }

    like(postId: string, userId: string): Observable<Post> {
        return this.http.put<Post>(`${this.apiUrl}/${postId}/like`, { userId });
    }

    dislike(postId: string, userId: string): Observable<Post> {
        return this.http.put<Post>(`${this.apiUrl}/${postId}/dislike`, { userId });
    }
}
