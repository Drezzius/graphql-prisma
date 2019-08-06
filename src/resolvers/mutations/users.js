import uuid from 'uuid/v4';

const createUser = async (parent, { data }, { prisma }, info) => {
  const emailTaken = await prisma.exists.User({ email: data.email });

  if (emailTaken) {
    throw new Error('Email taken.');
  }

  return prisma.mutation.createUser({ data }, info);
};

const deleteUser = async (parent, { id }, { prisma }, info) => {
  const userExists = await prisma.exists.User({ id });
  if (!userExists) {
    throw new Error('User not found');
  }

  return prisma.mutation.deleteUser(
    {
      where: {
        id
      }
    },
    info
  );
};

const updateUser = (parent, { id, data }, { db }, info) => {
  const user = db.users.find(user => user.id === id);

  if (!user) {
    throw new Error('User not found.');
  }

  if (typeof data.email === 'string') {
    const emailTaken = db.users.some(user => user.email === data.email);
    if (emailTaken) {
      throw new Error('Email is already in use.');
    }
    user.email = data.email;
  }

  if (typeof data.name === 'string') {
    user.name = data.name;
  }

  if (typeof data.age !== 'undefined') {
    user.age = data.age;
  }

  return user;
};

export { createUser, deleteUser, updateUser };
