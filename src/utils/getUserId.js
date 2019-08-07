import jwt from 'jsonwebtoken';
import { jwtsecret } from '../config';

const getUserId = (req, requireAuth = true) => {
  const header = req.request.headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtsecret);
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

export default getUserId;
