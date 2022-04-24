import React from 'react';
import { TokenAccount, useNFTAccounts } from 'saifu';

import NoNftsComponent from './EmptyStateComponent';
import LoadingComponent from './LoadingComponent';
import NFTCard from './NFTCard';

const NftOverviewView = () => {
  const nftAccs = useNFTAccounts();

  return (
    <>
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}

      <div className="columns-2 gap-3 space-y-2">
        {!nftAccs.isLoading && nftAccs.data?.length === 0 && <NoNftsComponent />}
        {nftAccs.data
          ?.sort((a, b) => a.mint.localeCompare(b.mint))
          .map((acc: TokenAccount, i) => (
            <NFTCard key={i} mint={acc.mint} />
          ))}
      </div>
    </>
  );
};

export default NftOverviewView;
