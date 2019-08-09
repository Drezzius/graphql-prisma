import getUserId from '../utils/getUserId';

const Query = {
  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  async myPosts(
    parent,
    { query, first, skip, after, orderBy },
    { prisma, req },
    info
  ) {
    const userId = getUserId(req, true);
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        author: {
          id: userId
        }
      }
    };
    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query
        },
        {
          body_contains: query
        }
      ];
    }
    return await prisma.query.posts(opArgs, info);
  },
  posts(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy,
      where: {
        published: true
      }
    };
    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query
        },
        {
          body_contains: query
        }
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parent, { first, skip, after, orderBy }, { prisma }, info) {
    return prisma.query.comments(
      {
        first,
        skip,
        after,
        orderBy
      },
      info
    );
  },
  async me(parent, args, { prisma, req }, info) {
    const userId = getUserId(req, true);
    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  async post(parent, { id }, { prisma, req }, info) {
    const userId = getUserId(req, false);
    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true
            },
            {
              author: {
                id: userId
              }
            }
          ]
        }
      },
      info
    );
    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return posts[0];
  }
};

export default Query;
