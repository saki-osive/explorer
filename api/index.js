import 'dotenv/config';
import { connect } from 'nats';
import BN from 'bn.js';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import resolvers from './resolvers.js';
import cors from 'cors';

const v = '0x86ea91e266287d11011f5c0b3963d2ea';
const b = new BN(v.substring(2), 'hex');
console.log(b.toString(10));

// NATS connection
async function startNats() {
  try {
    const nc = await connect({
      servers: process.env.NATS_URL || 'nats://localhost:4222',
      user: process.env.NATS_USER,
      pass: process.env.NATS_PASS
    });

    nc.closed().then((err) => {
      if (err) {
        console.error(`NATS connection closed with error: ${err.message}`);
      } else {
        console.log('NATS connection closed');
      }
    });

    console.log('Connected to NATS server');
    return nc;
  } catch (err) {
    console.error('Failed to connect to NATS:', err);
  }
}

// Start the NATS connection
startNats();

// GraphQL setup
const typeDefs = readFileSync(join(process.cwd(), 'schema.graphql'), 'utf8');
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4003;  // Change the port here if needed
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
