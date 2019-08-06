import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466'
});

export default prisma;

// // prisma.query prisma.mutation prisma.subscription prisma.exists
// const { query, mutation, exists } = prisma;

// const createPostForUser = async (authorId, data) => {
//   const userExists = await exists.User({
//     id: authorId
//   });

//   if (!userExists) {
//     throw new Error('User not found');
//   }

//   const post = await mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     '{ author { id name email posts{ id title published } } }'
//   );
//   return post.author;
// };

// // createPostForUser('cjyyh2m1g004x0728k8vhfm7d', {
// //   title: 'Great turmix receptek',
// //   body: 'Banános kutyaszőr turmix',
// //   published: true
// // })
// //   .then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// //   })
// //   .catch(error => {
// //     console.log(error.message);
// //   });

// const updatePostForUser = async (postId, data) => {
//   const postExists = await exists.Post({
//     id: postId
//   });

//   if (!postExists) {
//     throw new Error('Post not found');
//   }

//   const post = await mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     '{ author { id name email posts{ id title published } } }'
//   );
//   return post.author;
// };

// // updatePostForUser('cjyyh5wy700530728ffls9ajj', {
// //   title: 'Ejnye kacifántos kalifa'
// // })
// //   .then(user => {
// //     console.log(JSON.stringify(user, undefined, 2));
// //   })
// //   .catch(error => {
// //     console.log(error.message);
// //   });
