import React from 'react';
import { useNFTAccounts } from 'saifu';

import NoNftsComponent from './EmptyStateComponent';
import LoadingComponent from './LoadingComponent';
import NFTCard from './NFTCard';

const NftOverviewView = () => {
  const nftAccs = useNFTAccounts();

  return (
    <div id="nft-plugin-app">
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
        {!nftAccs.isLoading && nftAccs.data?.length === 0 && <NoNftsComponent />}
        {nftAccs.data
          ?.sort((a, b) => a.mint.localeCompare(b.mint))
          .map((acc, i) => (
            <NFTCard key={i} mint={acc.mint} />
          ))}
      </div>
    </div>
  );
};

export default NftOverviewView;
