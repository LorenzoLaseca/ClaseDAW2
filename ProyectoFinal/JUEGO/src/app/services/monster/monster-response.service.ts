import { Injectable } from '@angular/core';
import { Monster } from 'src/app/models/monster.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterResponseService {

  data: any;

  constructor() {
  }
}
