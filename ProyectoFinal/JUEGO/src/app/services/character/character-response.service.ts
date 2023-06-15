import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterResponseService {
    data: Character[];
  
    constructor() {
      this.data = [];
    }
  }