export interface AuthInputInterface {
  email: string;
  password: string;
}

export interface RegisterInterface extends AuthInputInterface {
  name: string;
  password_confirmation: string;
}
