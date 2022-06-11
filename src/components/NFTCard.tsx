import { Card, Text } from '@saifuwallet/saifu-ui';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useTokenMetadata } from 'saifu';

export interface NftBoxProps {
  mint: string;
}

const NFTCard = ({ mint }: NftBoxProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const metadata = useTokenMetadata(mint);
  // not an NFT
  if (!metadata.isLoading && !metadata.data) {
    return <></>;
  }

  return (
    <Card
      as={Link}
      to={`/tokens/${mint}`}
      className={clsx(
        'group w-full h-full duration-200 flex flex-col',
        (!imgLoaded || metadata.isLoading) && 'animate-pulse bg-gray-400'
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
            src={metadata.data?.image}
            className={clsx(
              'w-full h-full object-center object-cover transition ease-in-out group-hover:scale-110 transform-gpu'
            )}
            loading="lazy"
            alt={metadata.data?.name}
            onError={() => {
              setImgLoaded(true);
            }}
            onLoad={() => setImgLoaded(true)}
          />
        </Card>
        <div className="flex-none p-2 w-full overflow-hidden">
          <Text className="text-ellipsis break-words" weight="medium" size="sm" as="p">
            {metadata.data?.name || mint}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default NFTCard;
