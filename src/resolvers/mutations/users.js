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

const updateUser = async (parent, { id, data }, { prisma }, info) => {
  const userExists = await prisma.exists.User({ id });

  if (!userExists) {
    throw new Error('User not found');
  }

  return prisma.mutation.updateUser(
    {
      where: {
        id
      },
      data
    },
    info
  );
};

export { createUser, deleteUser, updateUser };
