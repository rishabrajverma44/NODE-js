import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRETE;
export function setUserToken(user: any) {
  if (secret) return jwt.sign(user, secret, { expiresIn: 60 * 60 });
}
export function getUser(token: any) {
  if (!token) return null;
  try {
    if (secret) return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
