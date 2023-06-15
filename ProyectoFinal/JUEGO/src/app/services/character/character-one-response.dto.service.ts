import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterOneResponseService {
  data: Character;

  constructor() {
    this.data = new Character();

  }
}