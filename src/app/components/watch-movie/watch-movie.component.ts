import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router,NavigationEnd } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { ProductionService } from '../../services/production.service';
import { Production } from '@app/models/production';
import { CategoryService } from '@app/services/category.service';
import { SeriesService } from '@app/services/series.service';
import { Category } from '@app/models/category';
import { CommentService } from '../../services/comment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../models/comment';
import { Series } from '@app/models/series';



@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.scss']
})
export class WatchMovieComponent implements OnInit {
  movieId: number;
  movie: Movie;
  productions: Production[];
  categories: Category[];
  CommentForm: FormGroup;
  comments: Comment[] = [];
  series: Series;
  seriesOthers: Movie[] = [];
  url: string;
  cinemaMod:boolean=false;


  constructor(private movieService: MovieService, private commentService: CommentService,
    private categoryService: CategoryService, private route: ActivatedRoute,
    private seriesService: SeriesService,
    private productionService: ProductionService,private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });

    this.CommentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required),
      movieId: new FormControl(''),
      comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
      date: new FormControl('')
    });

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
      error => {
        console.log("error");
      });

    this.route.paramMap.subscribe(params => {
      this.movieId = Number(params.get("movieId"));
      this.movieService.getMovieById(this.movieId).subscribe(data => {
        this.movie = data[0];
        this.url = this.movie.language[0];

      }, error => {
        console.log("error");
      })


      this.seriesOthers = [];
      this.seriesService.getSeries().subscribe(data => {
        data.forEach((series) => {
          series.bookIds.forEach((value, index) => {
            if (series.bookIds[index] == this.movieId) {
              this.series = series;
              this.series.bookIds.forEach((bookIds) => {
                if (bookIds != this.movieId) {
                  this.movieService.getMovieById(bookIds).subscribe(others => {
                    this.seriesOthers.push(others[0]);
                  }, error => {
                    console.log("error");
                  })
                }
              })
            }
          })
        })
      },
        error => {
          console.log("error");
        })


      this.commentService.getCommentsByMovieId(this.movieId).subscribe(data => {
        this.comments = data.reverse();
      }, error => {
        console.log("error");
      })

    })


    this.productionService.getProductions().subscribe(data => {
      this.productions = data;
    }, error => {
      console.log("error");
    })
  }

  onSubmit() {
    console.log(this.CommentForm.value);
    this.CommentForm.patchValue({
      movieId: this.movieId,
      date:new Date()
    });

    this.commentService.addComment(this.CommentForm.value).subscribe(data => {
      this.comments.unshift(this.CommentForm.value);
      this.CommentForm.reset();
alert("Yorumunuz icin tesekkur ederiz")
    },
      error => {
        console.log("error");
      })

  }
}
