import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Series} from "../models/series"

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  url:string="http://localhost:3000/series";

  constructor(private http:HttpClient) { }
  getSeries(){
    return this.http.get<Series[]>(`${this.url}`);
      }
}
