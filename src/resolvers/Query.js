const Query = {
  users(parent, { query }, { prisma }, info) {
    const opArgs = {};

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          },
          {
            email_contains: query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, { query }, { prisma }, info) {
    const opArgs = {};
    if (query) {
      opArgs.where = {
        OR: [
          {
            title_contains: query
          },
          {
            body_contains: query
          }
        ]
      };
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  me() {
    return {
      id: '123098',
      name: 'Peter',
      email: 'peter@example.com',
      age: 28
    };
  },
  post() {
    return {
      id: 'post123',
      title: 'The curious case of Teddy the Bear',
      body: 'Teddy is not a bear nor a man',
      published: true
    };
  }
};

export default Query;
