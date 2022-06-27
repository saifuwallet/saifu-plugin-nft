import { Card, Text } from '@saifuwallet/saifu-ui';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'saifu';

export interface NftBoxProps {
  mint: string;
  image?: string;
  isLoading?: boolean;
  name?: string;
}

const NFTCard = ({ mint, image, name, isLoading }: NftBoxProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card
      as={Link}
      to={`/nfts/${mint}`}
      className={clsx(
        'group w-full h-full flex flex-col',
        (!imgLoaded || isLoading) && 'animate-pulse bg-gray-400'
      )}
      hover
    >
      <div className="overflow-hidden rounded-lg">
        <Card
          variant="flat"
          className={clsx(
            'grow overflow-hidden rounded-b-none bg-white',
            !imgLoaded && 'animate-pulse bg-gray-300'
          )}
        >
          <img
            src={image}
            className={clsx(
              'object-center object-cover transition ease-in-out group-hover:scale-110 aspect-square'
            )}
            loading="lazy"
            alt={name}
            onError={() => {
              setImgLoaded(true);
            }}
            onLoad={() => setImgLoaded(true)}
          />
        </Card>
        <div className="flex-none p-2 w-full overflow-hidden">
          <Text className="text-ellipsis break-words" weight="medium" size="sm" as="p">
            {name || mint}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(NFTCard);
