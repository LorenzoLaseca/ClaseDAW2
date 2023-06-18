import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character.model';
import { Monster } from 'src/app/models/monster.model';
import { CharacterApiService } from 'src/app/services/character/character-api.service';
import { MonsterApiService } from 'src/app/services/monster/monster-api.service';
import { ItemApiService } from 'src/app/services/item/item-api.service';
import { Item } from 'src/app/models/item.model';
import { InventoryitemApiService } from 'src/app/services/inventory/inventoryitem-api.service';
import { InventoryItem } from 'src/app/models/inventoryitem.model';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  character: Character;
  InventoryItems: InventoryItem[];
  idCharacter: String;
  vidaPersonaje: number;
  fuerzaPersonaje: number;
  suertePersonaje: number;
  random: number;
  resultado: String;
  item: any;
  monster: any;
  randomImagen: number;
  itemsDisabled: boolean = false;
  mostrarInventory: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private itemApi: ItemApiService, private inventoryItemApi: InventoryitemApiService, private characterApi: CharacterApiService, private inventoryApi: InventoryitemApiService, private monsterApi: MonsterApiService, private activatedRoute: ActivatedRoute) {
    this.character = new Character;
    this.InventoryItems = [];
    this.idCharacter = "";
    this.vidaPersonaje = 0;
    this.fuerzaPersonaje = 0;
    this.suertePersonaje = 0;
    this.random = 0;
    this.resultado = "";
    this.randomImagen = 0;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parameters: any) => {
      this.idCharacter = parameters.get('idCharacter');
    });
    this.characterApi.getCharacterData(this.idCharacter).subscribe(res => {
      this.character = res.data;
      this.vidaPersonaje = this.character.health;
      this.fuerzaPersonaje = this.character.attack;
      this.suertePersonaje = this.character.luck;
    });

    this.itemApi.getItemRandomData().subscribe(
      (data: any) => {
        this.item = data;
        console.log(this.item);
      },
      (error: any) => {
        console.error('Error al obtener los datos del item:', error);
      }
    );

    this.monsterApi.getMonsterRandomData().subscribe(
      (data: any) => {
        this.monster = data;
        console.log(this.monster);
      },
      (error: any) => {
        console.error('Error al obtener los datos del monstruo:', error);
      }
    );
    this.inventoryApi.getCharacterInventoryData(this.idCharacter).subscribe(res => {
      this.InventoryItems = res.data;
    });
    this.randomImagen = (Math.floor(Math.random() * 12) + 1);
  }



  lightAttack() {
    let calclightAttack = 1 + Math.trunc(this.fuerzaPersonaje / 3);
    let precisionLightAttack = 90 + this.suertePersonaje;
    if (this.monster.health > 0 && this.vidaPersonaje > 0) {
      this.random = Math.trunc(Math.random() * 100);
      if (this.random < precisionLightAttack) {
        this.monster.health -= calclightAttack;
        this.vidaPersonaje -= this.monster.attack;
        this.resultado = (calclightAttack + " de daño con un ataque Light, " + this.monster.attack + " de daño por el enemigo");
        this.hasGanadoOPerdido(this.monster.health, this.vidaPersonaje);
      }
    }


  }
  mediumAttack() {
    let calcMediumAttack = 3 + Math.trunc(this.fuerzaPersonaje / 2);
    let precisionMediumAttack = 70 + this.suertePersonaje;
    if (this.monster.health > 0 && this.vidaPersonaje > 0) {
      this.random = Math.trunc(Math.random() * 100);
      if (this.random < precisionMediumAttack) {
        this.monster.health -= calcMediumAttack;
        this.vidaPersonaje -= this.monster.attack;
        this.resultado = (calcMediumAttack + " de daño con un ataque Medium, " + this.monster.attack + " de daño por el enemigo");
        this.hasGanadoOPerdido(this.monster.health, this.vidaPersonaje);
      }
    }
  }
  heavyAttack() {
    let calcHeavyAttack = 5 + this.fuerzaPersonaje;
    let precisionHeavyAttack = 50 + this.suertePersonaje;
    if (this.monster.health > 0 && this.vidaPersonaje > 0) {
      this.random = Math.trunc(Math.random() * 100);
      if (this.random < precisionHeavyAttack) {
        this.monster.health -= calcHeavyAttack;
        this.vidaPersonaje -= this.monster.attack;
        this.resultado = (calcHeavyAttack + " de daño con un ataque Heavy, " + this.monster.attack + " de daño por el enemigo");
        this.hasGanadoOPerdido(this.monster.health, this.vidaPersonaje);
      }
    }
  }

  getInventoryItem() {
    if (this.mostrarInventory) {
      this.mostrarInventory = false;
      return;
    } else {
      this.inventoryApi
        .getCharacterInventoryData(this.idCharacter)
        .subscribe((res) => {
          this.InventoryItems = res.data;
        });
      this.mostrarInventory = true;
    }
  }

  usarItem(id: string) {
    const itemIndex = this.InventoryItems.findIndex((element) => element._id === id);

    if (itemIndex !== -1 && !this.InventoryItems[itemIndex].used && !this.itemsDisabled) {
      const element = this.InventoryItems[itemIndex];

      this.InventoryItems.forEach((item, index) => {
        if (item._id === id) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.InventoryItems.splice(index, 1);
          }
        }
      });


      if (element.name === "Recupera 100% vida") {
        this.vidaPersonaje = this.character.health;
      } else if (element.name === "Recupera 50% vida" && this.vidaPersonaje < this.character.health) {
        let vidaRecuperada = this.character.health * 0.50;
        let nuevaVida = this.vidaPersonaje + vidaRecuperada;
        this.vidaPersonaje = Math.trunc(Math.min(nuevaVida, this.character.health));
      } else if (element.name === "Recupera 25% vida" && this.vidaPersonaje < this.character.health) {
        let vidaRecuperada = this.character.health * 0.25;
        let nuevaVida = this.vidaPersonaje + vidaRecuperada;
        this.vidaPersonaje = Math.trunc(Math.min(nuevaVida, this.character.health));
      } else if (element.name === "Duplica daño siguiente ataque") {
        this.fuerzaPersonaje *= 2;
      } else if (element.name === "Duplica suerte siguiente ataque") {
        this.suertePersonaje *= 2;
      }

      this.InventoryItems[itemIndex].used = true;

      this.updateInventory(element);

      this.itemsDisabled = true;
    }
  }


  updateInventory(itemInventory: InventoryItem) {
    if (itemInventory.quantity > 1) {
      this.inventoryItemApi.putInventoryItemData(itemInventory);
    } else {
      this.inventoryItemApi.deleteInventoryItemData(itemInventory);
    }


  }

  hasGanadoOPerdido(vidaEnemigo: number, vidaPersonaje: number) {
    if (vidaEnemigo <= 0) {
      alert("Has ganado la batalla");
      this.character.level += 1;
      this.statAleatoria();
      let existe = false;
      this.characterApi.putCharacterData(this.character);
      this.InventoryItems.forEach(InventoryItem => {
        if (InventoryItem.itemId === this.item._id.toString()) {
          existe = true;
          this.inventoryItemApi.putInventoryItemSumaData(InventoryItem);
        }
      });

      if (!existe) {
        this.inventoryItemApi.postCharacterInventoryData(this.character._id, this.item._id, this.item.name, 1);
      }
      this.router.navigate([this.character.userId + "/characters/fight/" + this.character._id]);
    } else if (vidaPersonaje <= 0) {
      alert("Has perdido la batalla");
      this.router.navigate([this.character.userId + "/characters/fight/" + this.character._id]);
    }
  }
  statAleatoria() {
    let statsPosibles = ['health', 'attack', 'luck'];
    let indiceAleatorio = Math.floor(Math.random() * statsPosibles.length);
    if (indiceAleatorio == 0) {
      this.character.health += 1;
    } else if (indiceAleatorio == 1) {
      this.character.attack += 1;
    } else if (indiceAleatorio == 2) {
      this.character.luck += 1;
    }
  }



}
