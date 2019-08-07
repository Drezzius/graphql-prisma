import jwt from 'jsonwebtoken';
import { jwtsecret } from '../config';

const getUserId = req => {
  const header = req.request.headers.authorization;
  if (!header) {
    throw new Error('Authentication required');
  }

  const token = header.replace('Bearer ', '');
  const decoded = jwt.verify(token, jwtsecret);

  return decoded.userId;
};

export default getUserId;
