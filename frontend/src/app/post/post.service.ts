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

    getSinglePost(id: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`);
    }

    createPost(post: { place: { imageUrl: string, location: string, address: string }, owner: string, description: string }): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, post);
    }

    editPost(id: string, post: { place: { imageUrl: string, location: string, address: string }, owner: string, description: string }): Observable<Post> {
        return this.http.post<Post>(`${this.apiUrl}/${id}/edit`, post);
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
