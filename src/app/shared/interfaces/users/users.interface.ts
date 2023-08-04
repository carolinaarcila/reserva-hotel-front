export interface User {
  id: UserID;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  rolId: number;
}

export interface UserID {
  documentType: string;
  documentNumber: number;
}
