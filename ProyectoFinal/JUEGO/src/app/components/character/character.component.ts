import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { CharacterApiService } from 'src/app/services/character/character-api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {
  characters: Array<Character>
  idUser = 0
  constructor(private router: Router, private fb: FormBuilder, private characterApi: CharacterApiService, private activatedRoute: ActivatedRoute) {
    this.characters = [];

  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idUser = parameters.get('idUser');
    })
    this.characterApi.getCharactersData(this.idUser).subscribe(res => {
      this.characters = res.data;

    });

  }
  play(idCharacter: string) {

    this.router.navigate([this.idUser + "/characters/fight/" + idCharacter]);
  }
  deleteCharacter(idCharacter: string) {
    const confirmDelete = confirm(`¿Estás seguro de eliminar este personaje?`);
    if (confirmDelete) {
      this.characterApi.deleteCharacterData(idCharacter).subscribe(() => {
        window.location.reload();
      }
      )
    };
  }
  createCharacter() {
    this.router.navigate([this.idUser + "/characters/createCharacter"])
  }
  logOut() {
    this.router.navigate(['']);
  }

}

