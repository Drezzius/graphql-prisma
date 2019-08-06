const createComment = async (parent, { data }, { prisma }, info) => {
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
            id: data.author
          }
        }
      }
    },
    info
  );
};

const deleteComment = async (parent, { id }, { prisma }, info) => {
  const commentExists = await prisma.exists.Comment({ id });
  if (!commentExists) {
    throw new Error('Comment not found');
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

const updateComment = async (parent, { id, data }, { prisma }, info) => {
  const commentExists = await prisma.exists.Comment({ id });
  if (!commentExists) {
    throw new Error('Comment not found');
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
