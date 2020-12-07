import { Component, OnInit } from '@angular/core';
import { Category } from '@app/models/category';
import { Movie } from '@app/models/movie';
import { CategoryService } from '@app/services/category.service';
import { MovieService } from '@app/services/movie.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
categoryFilter:boolean=false;
  constructor(private categoryService: CategoryService) { }
  categories: Category[];
  lastMovies: Movie[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    },
      error => {
        console.log("error");
      });
  }

}
