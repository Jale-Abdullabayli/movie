import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { MovieService } from '@app/services/movie.service';
import { Movie } from '@app/models/movie';
import { Router,NavigationEnd  } from '@angular/router';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories: Category[];
  filterForm: FormGroup;
  comments: Comment[];
  movies: Movie[];



  constructor(private movieService: MovieService, private categoryService: CategoryService, private commentService: CommentService,private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.filterForm = new FormGroup({
      type: new FormControl(''),
      categoryId: new FormControl(''),
      year: new FormControl(''),
      IMDB: new FormControl('')
    });


    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    },
      error => {
        console.log("error");
      });


    this.commentService.getComments().subscribe(data => {
      this.comments = data.slice(data.length - 5, data.length).reverse();
      console.log(this.comments)
    }, error => {
      console.log("error");
    })


    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    },
      error => {
        console.log("error");
      });

  }

  onSubmit() {

  }



}
