import jwt from 'jsonwebtoken';
import { jwtsecret } from '../config';

const generateJWT = userId => {
  return jwt.sign({ userId }, jwtsecret, { expiresIn: '7 days' });
};

export default generateJWT;
