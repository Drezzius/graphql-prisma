import bcrypt from 'bcryptjs';
import getUserId from '../../utils/getUserId';
import generateJWT from '../../utils/generateJWT';

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
    token: generateJWT(user.id)
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
    token: generateJWT(user.id)
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
