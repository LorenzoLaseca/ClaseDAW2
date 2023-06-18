export class Register {
    error: string;
    data: {
        name: string;
        email: string;
        pass: string;
        _id: string;
    };

    constructor() {
        this.error = "";
        this.data = {
            _id: "",
            name: "",
            email: "",
            pass: "",
        }

    }

}