export class Login {
    error: string | null;
    data: {
        _id: "",
        name: "",
        email: "",
        pass: "",
    };

    constructor() {
        this.error = null;
        this.data = {
            _id: "",
            name: "",
            email: "",
            pass: "",
        }

    }

}