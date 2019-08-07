import getUserId from '../../utils/getUserId';

const createComment = async (parent, { data }, { prisma, req }, info) => {
  const userId = getUserId(req);

  return prisma.mutation.createComment(
    {
      data: {
        body: data.body,
        post: {
          connect: {
            id: data.post
          }
        },
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

const deleteComment = async (parent, { id }, { prisma, req }, info) => {
  const userId = getUserId(req);
  const commentExists = await prisma.exists.Comment({
    id,
    author: {
      id: userId
    }
  });
  if (!commentExists) {
    throw new Error('Unable to delete comment');
  }

  return prisma.mutation.deleteComment(
    {
      where: {
        id
      }
    },
    info
  );
};

const updateComment = async (parent, { id, data }, { prisma, req }, info) => {
  const userId = getUserId(req);
  const commentExists = await prisma.exists.Comment({
    id,
    author: {
      id: userId
    }
  });
  if (!commentExists) {
    throw new Error('Unable to update comment');
  }

  return prisma.mutation.updateComment(
    {
      where: {
        id
      },
      data
    },
    info
  );
};

export { createComment, deleteComment, updateComment };
