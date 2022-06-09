import { Card, Text } from '@saifuwallet/saifu-ui';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'saifu';

import { nftInfo } from '@/hooks/useNFTAccounts';

export interface NftBoxProps {
  mint: string;
  info: nftInfo;
}

const NFTCard = ({ mint, info }: NftBoxProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card
      as={Link}
      to={`/tokens/${info.mintAddress}`}
      className="group w-full overflow-clip duration-200 flex flex-col"
      hover
    >
      <Card
        variant="flat"
        className={clsx(
          'grow overflow-clip rounded-b-none',
          !imgLoaded && 'animate-pulse bg-gray-300'
        )}
      >
        <img
          src={info.image}
          className={clsx(
            'w-full h-full object-center object-cover transition ease-in-out group-hover:scale-110'
          )}
          loading="lazy"
          alt={info.name}
          onError={() => {
            setImgLoaded(true);
          }}
          onLoad={() => setImgLoaded(true)}
        />
      </Card>
      <div className="flex-none p-2 w-full">
        <Text weight="medium" size="sm" as="p">
          {info.name || mint}
        </Text>
      </div>
    </Card>
  );
};

export default NFTCard;
