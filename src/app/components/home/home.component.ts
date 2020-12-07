import { Component, OnInit } from '@angular/core';
import { Movie } from '@app/models/movie';
import { MovieService } from '@app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[]=[];


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {
        this.movies=data.slice(data.length - 7, data.length);   
    })
  }

}
