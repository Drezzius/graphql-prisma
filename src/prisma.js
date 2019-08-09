import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/ResolversBundle';
import { secret } from './config';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});

export default prisma;
