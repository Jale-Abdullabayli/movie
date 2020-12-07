import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { ActivatedRoute, Router,NavigationEnd  } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  title: string = "Son Eklenen Film izle";
  movies: Movie[] = [];
  categoryId: number;
  categories: Category[];
  lastMovies: Movie[];


  constructor(private movieService: MovieService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.route.queryParams.subscribe(params => {
      this.categoryId = Number(this.route.snapshot.queryParamMap.get("categoryId"));
      this.movieService.getMovies().subscribe(data => {
        if (this.categoryId) {
          this.movies = [];
          for (let movie of data) {
            movie.categoryId.forEach((value, index) => {
              if (movie.categoryId[index] == this.categoryId) {
                this.movies.push(movie);
              }
            });
          }
        }
        else{
          this.movieService.getMovies().subscribe(data => {
            if (this.router.url == "/last-movies") {
              this.movies = data.slice(data.length - 3, data.length);
            }
            else if (this.router.url == "/the-best-movies") {
              for (let movie of data) {
                if (movie.imdb > 7) {
                  this.movies.push(movie);
                }
              }
            }
            else {
              this.movies = data;
            }
      
          },
            error => {
              console.log("error");
            });
        }
        

      },
        error => {
          console.log("error");
        });
    });

   

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
      error => {
        console.log("error");
      });
  }

}
