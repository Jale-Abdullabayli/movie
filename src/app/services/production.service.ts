import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Production } from '@app/models/production';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {

url:string=`${environment.baseUrl}/productions`;


  constructor(private http:HttpClient) { }

  getProductions(){
    return this.http.get<Production[]>(this.url);
      }
}

