import getUserId from '../utils/getUserId';

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { req }, info) {
      const userId = getUserId(req, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    async resolve(parent, args, { req, prisma }, info) {
      return prisma.query.posts({
        where: {
          author: {
            id: parent.id
          },
          published: true
        }
      });
    }
  }
};

export default User;
