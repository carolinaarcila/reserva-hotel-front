export interface User {
    id:          ID;
    name:        string;
    phoneNumber: string;
    email:       string;
    password:    string;
    rolId:       number;
}

interface ID {
    documentType:   string;
    documentNumber: number;
}