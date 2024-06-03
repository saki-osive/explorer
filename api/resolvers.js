import { PrismaClient } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

const prisma = new PrismaClient();

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    communityWallets: async () => {
      return await prisma.communityWallet.findMany();
    },
  },
};

export default resolvers;
