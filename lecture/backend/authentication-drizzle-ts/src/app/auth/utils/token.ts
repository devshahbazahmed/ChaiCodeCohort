import jwt from "jsonwebtoken";

export interface UserTokenPayload {
  id: string;
}

const JWTSECRET = "myjwtsecret";

export function createUserToken(payload: UserTokenPayload) {
  const token = jwt.sign(payload, JWTSECRET);
  return token;
}

export function verifyUserToken(token: string) {
  try {
    const payload = jwt.verify(token, JWTSECRET) as UserTokenPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
