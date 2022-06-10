export interface Session {
  cpf: string;
  password: string;
}

export interface SessionResponse {
  token: string;
  user: {
    id: string;
    permission: string;
  };
}
