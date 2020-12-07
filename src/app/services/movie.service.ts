import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movie } from '../models/movie';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

url:string=`${environment.baseUrl}/movies`;


  constructor(private http:HttpClient) { }

  getMovies(){
return this.http.get<Movie[]>(this.url);
  }

  filterMovies(movie:Movie){
    return this.http.get<Movie[]>(`${this.url}?language[0]=${movie.language}`)
  }

  getMovieById(movieId:number){
return this.http.get<Movie[]>(`${this.url}?id=${movieId}`);
  }

}
