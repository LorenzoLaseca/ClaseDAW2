import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemResponseService {
    data: Item;
  
    constructor() {
      this.data = new Item;
      
    }
  
}
