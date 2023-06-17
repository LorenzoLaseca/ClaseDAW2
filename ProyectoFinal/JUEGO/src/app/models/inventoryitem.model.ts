export class InventoryItem {
    _id: string;
    characterId: string;
    itemId: string;
    name:string;
    quantity: number;
    used: boolean;
    constructor() {
        this._id = "";
        this.characterId = "";
        this.itemId = "";
        this.name="";
        this.quantity = 0;
        this.used = false;
    }

}