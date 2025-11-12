export interface LoginRequest {
  identity: string;
  password: string;
}

export interface VerifyRequest {
  code: string;
  token: string;
}
