import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRETE || "rishab@mindfire";
export function setUser(user: any) {
  return jwt.sign(user, secret, { expiresIn: 60 * 60 });
}

export function getUser(token: any) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
