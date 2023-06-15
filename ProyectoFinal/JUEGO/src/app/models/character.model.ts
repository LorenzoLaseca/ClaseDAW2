export class Character {
    _id: string;
    userId: string;
    name: string;
    level: number;
    health: number;
    luck: number;
    attack: number;
    constructor() {
        this._id = "";
        this.userId = "";
        this.name = "";
        this.level = 0;
        this.health = 0;
        this.luck = 0;
        this.attack = 0;

    }

}