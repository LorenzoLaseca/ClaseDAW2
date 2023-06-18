import { Injectable } from '@angular/core';
import { CharacterResponseService } from './character-response.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Character } from 'src/app/models/character.model';
import { CharacterOneResponseService } from './character-one-response.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  constructor(private http: HttpClient) {

  }

  getCharactersData(idUser: any): Observable<CharacterResponseService> {
    return this.http.get<CharacterResponseService>(`${"http://localhost:8000/api/users/" + idUser + "/characters"}`);
  }

  deleteCharacterData(idCharacter: any): Observable<Character> {
    return this.http.delete<Character>(`${"http://localhost:8000/api/characters/" + idCharacter}`);
  }
  postCharacterData(body: any, idUser: any, health: any, attack: any, luck: any): Character {
    let bodyData = new Character();
    bodyData.userId = idUser;
    bodyData.name = body.name;
    bodyData.level = 1;
    bodyData.health = health;
    bodyData.attack = attack;
    bodyData.luck = luck;


    let result = new Character();
    this.http.post<Character>(`${"http://localhost:8000/api/characters/"}`, bodyData)
      .subscribe(
        {
          next(character) {
            result = character;
          },
          error(err) {
            alert('Cambia de nombre soplamocos');
          },
          complete() {
            alert('El personaje se ha creado con éxito');
          },
        }
      )
    return result;
  }

  getCharacterData(idCharacter: any): Observable<CharacterOneResponseService> {
    return this.http.get<CharacterOneResponseService>(`${"http://localhost:8000/api/characters/" + idCharacter}`);
  }
  putCharacterData(body: Character): Character {
    let bodyData = new Character();
    bodyData.userId = body.userId;
    bodyData.name = body.name;
    bodyData.level = body.level;
    bodyData.health = body.health;
    bodyData.attack = body.attack;
    bodyData.luck = body.luck;
    this.http.put<Character>(`${"http://localhost:8000/api/characters/" + body._id}`, bodyData).subscribe();
    return bodyData;

  };
}