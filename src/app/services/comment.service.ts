import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Comment} from '../models/comment';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url:string=`${environment.baseUrl}/comments`;


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
