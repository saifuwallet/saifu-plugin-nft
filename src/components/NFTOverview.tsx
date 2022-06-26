import { TokenAccount } from '@saifuwallet/saifu-ui';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import { useNFTAccounts, useTokenMetadata } from 'saifu';
import useMedia from 'use-media';

import NoNftsComponent from './EmptyStateComponent';
import LoadingComponent from './LoadingComponent';
import NFTCard from './NFTCard';

const NftOverviewView = () => {
  const nftAccs = useNFTAccounts();
  const isLarge = useMedia({ minWidth: '768px' });

  return (
    <div id="nft-plugin-app" className="h-screen">
      {(nftAccs.isLoading || nftAccs.isIdle) && <LoadingComponent />}
      {!nftAccs.isLoading && nftAccs.data?.length === 0 && <NoNftsComponent />}
      {nftAccs.data && (
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              className="grid grid-cols-2 md:grid-cols-4"
              columnCount={isLarge ? 4 : 2}
              rowCount={nftAccs.data.length / (isLarge ? 4 : 2)}
              columnWidth={160}
              rowHeight={230}
              height={height}
              width={width}
              itemData={{ acc: nftAccs.data, isLarge }}
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
    data: { acc: TokenAccount[]; isLarge: boolean };
    style: React.CSSProperties;
    columnIndex: number;
    rowIndex: number;
  }) => {
    const acc = data.acc[(data.isLarge ? 4 : 2) * rowIndex + columnIndex];
    const metadata = useTokenMetadata(acc.mint);
    return (
      <div className="p-2" style={style}>
        <NFTCard
          mint={acc.mint}
          name={metadata.data?.name}
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
