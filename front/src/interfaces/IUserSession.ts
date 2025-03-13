export interface IUser {
  id: string;
  dni: string
  nameAndLastName: string;
  bDate: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  role: string;
};

export interface IUserSession {
  token: string;
  user: IUser
}
