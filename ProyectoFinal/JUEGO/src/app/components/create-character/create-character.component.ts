import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterApiService } from 'src/app/services/character/character-api.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  idUser = ''
  createCharacterForm = this.fb.group({
    name: ['', [Validators.required]],
  })
  constructor(private router: Router, private fb: FormBuilder, private characterApi: CharacterApiService, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idUser = parameters.get('idUser');
    });

  }
  onSubmit() {
    let health = Math.floor(Math.random() * 9) + 1; // Entre 1 y 9
    let attack = Math.floor(Math.random() * (10 - health)) + 1;
    let luck = 10 - health - attack;
    this.characterApi.postCharacterData(this.createCharacterForm.value, this.idUser, health, attack, luck)
    this.router.navigate([this.idUser + '/characters/'])

    
  }

  redirectCharacter() {
    this.router.navigate([this.idUser + '/characters/'])
  }

}

