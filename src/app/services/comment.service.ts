import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Comment} from '../models/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url: string = "http://localhost:3000/comments"

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Comment[]>(`${this.url}`);
  }

  getCommentsByMovieId(movieId:number) {
    return this.http.get<Comment[]>(`${this.url}?movieId=${movieId}`);
  }
  addComment(comment:Comment){
    return this.http.post<Comment>(this.url,comment);
  }
}
