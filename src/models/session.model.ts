export interface ISession {
  cpf: string;
  password: string;
}

export interface ISessionResponse {
  token: string;
  user: {
    id: string;
    permission: string;
  };
}
