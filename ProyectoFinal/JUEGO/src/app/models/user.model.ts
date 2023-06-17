export class User {
    subscribe(arg0: (response: any) => void, arg1: (error: any) => void) {
      throw new Error('Method not implemented.');
    }
    name: string;
    email: string;
    pass: string;
    _id: string;
    constructor() {
        this._id = "";
        this.name = "";
        this.email = "";
        this.pass = "";
    }

}