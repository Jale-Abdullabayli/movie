import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Series} from "../models/series"
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  url:string=`${environment.baseUrl}/series`;

  constructor(private http:HttpClient) { }
  getSeries(){
    return this.http.get<Series[]>(`${this.url}`);
      }
}
