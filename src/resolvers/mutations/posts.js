import getUserId from '../../utils/getUserId';

const createPost = async (parent, { data }, { prisma, req }, info) => {
  const userId = getUserId(req);
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
            id: userId
          }
        }
      }
    },
    info
  );
};

const deletePost = async (parent, { id }, { prisma, req }, info) => {
  const userId = getUserId(req);
  const postExists = await prisma.exists.Post({
    id,
    author: {
      id: userId
    }
  });
  if (!postExists) {
    throw new Error('Unable to delete post');
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

const updatePost = async (parent, { id, data }, { prisma, req }, info) => {
  const userId = getUserId(req);
  const postExists = await prisma.exists.Post({
    id,
    author: {
      id: userId
    }
  });

  if (!postExists) {
    throw new Error('Unable to update post');
  }

  if (postExists && data.published === false) {
    await prisma.mutation.deleteManyComments({
      where: {
        post: {
          id: data.id
        }
      }
    });
  }

  return prisma.mutation.updatePost(
    {
      where: {
        id
      },
      data
    },
    info
  );
};

export { createPost, deletePost, updatePost };
