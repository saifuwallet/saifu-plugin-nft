import React from 'react';
import { usePublicKey } from 'saifu';

import useNFTAccounts from '@/hooks/useNFTAccounts';

import NoNftsComponent from './EmptyStateComponent';
import LoadingComponent from './LoadingComponent';
import NFTCard from './NFTCard';

const NftOverviewView = () => {
  const publicKey = usePublicKey();

  const nftAccs = useNFTAccounts(publicKey?.toString() || '');

  return (
    <>
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
        {!nftAccs.isLoading && nftAccs.data?.length === 0 && <NoNftsComponent />}
        {nftAccs.data
          ?.sort((a, b) => a.mintAddress.localeCompare(b.mintAddress))
          .map((acc, i) => (
            <NFTCard key={i} mint={acc.mintAddress} info={acc} />
          ))}
      </div>
    </>
  );
};

export default NftOverviewView;
