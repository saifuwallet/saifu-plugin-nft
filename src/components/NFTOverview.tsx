import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import { NFTAccount, useNFTAccounts, useTokenMetadata } from 'saifu';
import useMedia from 'use-media';

import EmptyStateComponent from './EmptyStateComponent';
import LoadingComponent from './LoadingComponent';
import NFTCard from './NFTCard';

const NftOverviewView = () => {
  const nftAccs = useNFTAccounts();
  const isLarge = useMedia({ minWidth: '768px' });

  return (
    <div id="nft-plugin-app" className="h-screen">
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}
      {!nftAccs.isLoading && nftAccs.data?.length === 0 && <EmptyStateComponent />}
      {nftAccs.data && nftAccs.data.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              className="grid grid-cols-2 md:grid-cols-4"
              columnCount={isLarge ? 3 : 2}
              rowCount={nftAccs.data.length / (isLarge ? 3 : 2)}
              columnWidth={isLarge ? 250 : 160}
              rowHeight={isLarge ? 300 : 230}
              height={height}
              width={width}
              itemData={{ nfts: nftAccs.data, isLarge }}
            >
              {NftRow}
            </Grid>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

const NftRow = React.memo(
  ({
    data,
    columnIndex,
    rowIndex,
    style,
  }: {
    data: { nfts: NFTAccount[]; isLarge: boolean };
    style: React.CSSProperties;
    columnIndex: number;
    rowIndex: number;
  }) => {
    const nft = data.nfts[(data.isLarge ? 4 : 2) * rowIndex + columnIndex];
    const metadata = useTokenMetadata(nft.mint.toString());
    return (
      <div className="p-2" style={style}>
        <NFTCard
          mint={nft.mint.toString()}
          name={nft.name || metadata.data?.name}
          image={metadata.data?.image}
          isLoading={metadata.isLoading}
        />
      </div>
    );
  },
  areEqual
);

NftRow.displayName = 'NFTRow';

export default NftOverviewView;
