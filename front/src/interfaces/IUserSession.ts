export interface IUserSession {
  token: string;
  user: {
    nameAndLastName: string;
    bDate: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    role: string;
  };
}
