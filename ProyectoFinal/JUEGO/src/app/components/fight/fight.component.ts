import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { InventoryItem } from 'src/app/models/inventoryitem.model';
import { CharacterApiService } from 'src/app/services/character/character-api.service';
import { InventoryitemApiService } from 'src/app/services/inventory/inventoryitem-api.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
  character: Character;
  idCharacter: String;
  InventoryItems: InventoryItem[];
  constructor(private characterApi: CharacterApiService, private inventoryApi: InventoryitemApiService, private router: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.character = new Character;
    this.idCharacter = "";
    this.InventoryItems = [];
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idCharacter = parameters.get('idCharacter');

    })
    this.characterApi.getCharacterData(this.idCharacter).subscribe(res => {
      this.character = res.data;
    });
    this.inventoryApi.getCharacterInventoryData(this.idCharacter).subscribe(res => {
      this.InventoryItems = res.data;

    });
  }
  startBattle(idCharacter: String, userId: String) {

    this.router.navigate([userId + "/characters/fight/" + idCharacter + "/battle"]);
  }
  goBack(userId: String) {
    this.router.navigate([userId + "/characters"]);
  }

}
