import bcrypt from 'bcryptjs';

const hashPassword = async password => {
  if (password.length < 8) {
    throw new Error('Password must be atleast 8 characters long.');
  }
  return bcrypt.hash(password, 10);
};

export default hashPassword;
