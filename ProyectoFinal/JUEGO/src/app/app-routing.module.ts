import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CharacterComponent } from './components/character/character.component';
import { CreateCharacterComponent } from './components/create-character/create-character.component';
import { FightComponent } from './components/fight/fight.component';
import { BattleComponent } from './components/battle/battle.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: ":idUser/characters", component: CharacterComponent },
  { path: ":idUser/characters/createCharacter", component: CreateCharacterComponent },
  { path: ":idUser/characters/fight/:idCharacter", component: FightComponent },
  { path: ":idUser/characters/fight/:idCharacter/battle", component: BattleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
