import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import ResolversBundle from './resolvers/ResolversBundle';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    ...ResolversBundle
  },
  context(req) {
    return {
      db,
      pubsub,
      prisma,
      req
    };
  }
});

server.start(() => {
  console.log('Server Started');
});
