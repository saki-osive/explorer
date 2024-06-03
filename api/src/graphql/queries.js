// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_COMMUNITY_WALLETS = gql`
  query GetCommunityWallets {
    communityWallets {
      id
      name
      balance
      awakened
      multisig
    }
  }
`;
