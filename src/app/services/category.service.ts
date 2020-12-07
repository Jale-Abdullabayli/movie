import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:string="http://localhost:3000/categories";


  constructor(private http:HttpClient) {}

  getCategories(){
    return this.http.get<Category[]>(this.url);
      }

}