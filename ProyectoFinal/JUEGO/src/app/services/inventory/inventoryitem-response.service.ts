import { Injectable } from '@angular/core';
import { InventoryItem } from 'src/app/models/inventoryitem.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryitemResponseService {

  data: InventoryItem[];

  constructor() {
    this.data = [];
  }
}
