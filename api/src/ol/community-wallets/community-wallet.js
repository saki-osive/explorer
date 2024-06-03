// src/components/CommunityWallets.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMUNITY_WALLETS } from '../graphql/queries';

function CommunityWallets() {
  const { loading, error, data } = useQuery(GET_COMMUNITY_WALLETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.communityWallets.map((wallet) => (
        <div key={wallet.id} className="wallet">
          <h2>{wallet.name}</h2>
          <p>Balance: {wallet.balance}</p>
          <p>Awakened: {wallet.awakened ? 'Yes' : 'No'}</p>
          {wallet.multisig && (
            <pre>{JSON.stringify(wallet.multisig, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommunityWallets;
