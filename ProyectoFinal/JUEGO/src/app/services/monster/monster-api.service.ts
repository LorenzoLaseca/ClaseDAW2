import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonsterResponseService } from './monster-response.service';
import { Monster } from 'src/app/models/monster.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MonsterApiService {

  constructor(private http: HttpClient) {

  }
  getMonsterRandomData(): Observable<any> {
    return this.http.get<any>(`${"http://localhost:8000/api/monsters/random"}`);
  }
}
