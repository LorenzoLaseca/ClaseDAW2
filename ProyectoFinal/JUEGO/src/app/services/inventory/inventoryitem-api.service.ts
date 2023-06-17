import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItem } from 'src/app/models/inventoryitem.model';
import { InventoryitemResponseService } from '../inventory/inventoryitem-response.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryitemApiService {

  constructor(private http: HttpClient) { }
  getCharacterInventoryData(idCharacter: any): Observable<InventoryitemResponseService> {
    return this.http.get<InventoryitemResponseService>(`${"http://localhost:8000/api/characters/" + idCharacter + "/inventory"}`);
  }
  postCharacterInventoryData(idCharacter: any, itemId: any, name: any, quantity: number): InventoryItem {
    let bodyData = new InventoryItem();
    bodyData.characterId = idCharacter;
    bodyData.itemId = itemId;
    bodyData.name = name;
    bodyData.quantity = 1;


    let result = new InventoryItem();
    this.http.post<InventoryItem>(`${"http://localhost:8000/api/characters/" + idCharacter + "/inventory"}`, bodyData)
      .subscribe(
        {
          next(inventoryitem) {
            result = inventoryitem;
          },
          error(err) {
            console.log('Cambia de nombre');
          },
          complete() {
            console.log('El objeto se ha creado con éxito');
          },
        }
      )
    return result;
  }
  putInventoryItemData(body: any): InventoryItem {
    let bodyData = new InventoryItem();
    bodyData.quantity = body.quantity - 1;
    bodyData._id = body._id;
    bodyData.characterId = body.characterId
    bodyData.itemId = body.itemId;
    bodyData.name = body.name;

    this.http.put<InventoryItem>(`${"http://localhost:8000/api/characters/" + body.characterId + "/inventory/" + body.itemId}`, bodyData).subscribe();
    return bodyData;

  };

  putInventoryItemSumaData(body: any): InventoryItem {
    let bodyData = new InventoryItem();
    bodyData.quantity = body.quantity + 1;
    bodyData._id = body._id;
    bodyData.characterId = body.characterId;
    bodyData.itemId = body.itemId;
    bodyData.name = body.name;

    this.http.put<InventoryItem>(`${"http://localhost:8000/api/characters/inventory/" + body._id}`, bodyData).subscribe();
    return bodyData;

  };
  deleteInventoryItemData(body: any) {
    this.http.delete(`${"http://localhost:8000/api/characters/" + body.characterId + "/inventory/" + body.itemId}`).subscribe();
  }



}
