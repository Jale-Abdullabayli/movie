import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../models/category';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:string=`${environment.baseUrl}/categories`;



  constructor(private http:HttpClient) {}

  getCategories(){
    return this.http.get<Category[]>(this.url);
      }

}