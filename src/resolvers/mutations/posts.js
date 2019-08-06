import uuid from 'uuid/v4';

const createPost = async (parent, { data }, { prisma, pubsub }, info) => {
  const userExists = await prisma.exists.User({ id: data.author });
  if (!userExists) {
    throw new Error('User not found');
  }

  return prisma.mutation.createPost(
    {
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
        author: {
          connect: {
            id: data.author
          }
        }
      }
    },
    info
  );
};

const deletePost = async (parent, { id }, { prisma, pubsub }, info) => {
  const postExists = await prisma.exists.Post({ id });
  if (!postExists) {
    throw new Error('Post not found');
  }

  return prisma.mutation.deletePost(
    {
      where: {
        id
      }
    },
    info
  );
};

const updatePost = async (parent, { id, data }, { prisma, pubsub }, info) => {
  const postExists = await prisma.exists.Post({ id });
  if (!postExists) {
    throw new Error('Post not found');
  }

  return prisma.mutation.updatePost({
    where: {
      id
    },
    data
  });
};

export { createPost, deletePost, updatePost };
