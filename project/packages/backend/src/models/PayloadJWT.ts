export interface PayloadJWT {
  userId: number;
  tokenVersion: number;
  iat: number;
  exp: number;
}
