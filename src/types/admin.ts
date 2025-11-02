export interface IAuthenticateAdminParams {
  username: string;
  password: string;
}

export interface IAuthenticateAdminResponse {
  token: string;
  username: string;
  // время жизни токена в минутах
  expires: number;
}
