import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import {
  ResolversBundle,
  fragmentReplacements
} from './resolvers/ResolversBundle';
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
  },
  fragmentReplacements
});

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('Server Started');
});
