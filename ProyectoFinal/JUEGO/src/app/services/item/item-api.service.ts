import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponseService } from './item-response.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  constructor(private http: HttpClient) { 

  }
  getItemRandomData(): Observable<any> {
    return this.http.get<any>(`${"http://localhost:8000/api/items/random"}`);
  }
}
