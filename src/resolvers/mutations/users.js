import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtsecret } from '../../config';
import getUserId from '../../utils/getUserId';

const dummy = async () => {
  const email = 'peter@example.com';
  const password = 'bindi123';

  const hashedPassword =
    '$2a$10$ESkxmDq3JxmPNhmV8wFbd.3Tw4.9AD8dR2PPBeJ7crAm0DGIVqmda';
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};

const loginUser = async (parent, { data }, { prisma }, info) => {
  console.log(data);
  const user = await prisma.query.user({
    where: {
      email: data.email
    }
  });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error('Email or password is incorrect');
  }

  return {
    user,
    token: jwt.sign({ userId: user.id }, jwtsecret)
  };
};

const createUser = async (parent, { data }, { prisma }, info) => {
  if (data.password.length < 8) {
    throw new Error('Password must be atleast 8 characters long.');
  }

  const emailTaken = await prisma.exists.User({ email: data.email });
  if (emailTaken) {
    throw new Error('Email taken.');
  }

  const password = await bcrypt.hash(data.password, 10);
  const user = await prisma.mutation.createUser({
    data: {
      ...data,
      password
    }
  });
  return {
    user,
    token: jwt.sign({ userId: user.id }, jwtsecret)
  };
};

const deleteUser = async (parent, args, { prisma, req }, info) => {
  const userId = getUserId(req);
  const userExists = await prisma.exists.User({ id: userId });
  if (!userExists) {
    throw new Error('User not found');
  }

  return prisma.mutation.deleteUser(
    {
      where: {
        id: userId
      }
    },
    info
  );
};

const updateUser = async (parent, { data }, { prisma, req }, info) => {
  const userId = getUserId(req);
  const userExists = await prisma.exists.User({ id: userId });

  if (!userExists) {
    throw new Error('User not found');
  }

  return prisma.mutation.updateUser(
    {
      where: {
        id: userId
      },
      data
    },
    info
  );
};

export { createUser, deleteUser, updateUser, loginUser };
