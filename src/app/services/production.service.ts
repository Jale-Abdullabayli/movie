import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Production } from '@app/models/production';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

url:string="http://localhost:3000/productions";

  constructor(private http:HttpClient) { }

  getProductions(){
    return this.http.get<Production[]>(this.url);
      }
}

