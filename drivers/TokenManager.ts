import * as jwt from 'jsonwebtoken';
import { User } from '../types/blog';

/**
 * Takes a user object and generates a JWT for the user
 * @param user contains the user's id, username, firstname, lastname, and email
 */
export function generateToken(user: User) {
  const payload = {
    username: user.username,
    password: user.password
  };

  const options = {
    issuer: process.env.ISSUER,
    expiresIn: 86400,
    audience: user.username
  };
  
  const token = jwt.sign(payload, process.env.KEY, options);
  
  return token;
}

/**
 * Accepts a JWT and verifies that the token has been properly issued
 *
 * @param token the JWT as a string
 * @param callback the function to execute after verification
 */
export function verifyJWT(
  token: string,
  res: any,
  callback: Function
): boolean {
  try {
    const decoded = jwt.verify(token, process.env.KEY, {});

    if (typeof callback === 'function') {
      callback(status, decoded);
    }

    return true;
  } catch (error) {
    return false;
  }
}
