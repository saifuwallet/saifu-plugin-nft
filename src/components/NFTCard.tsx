import clsx from 'clsx';
import { useState } from 'react';
import { useTokenMetadata } from 'saifu';

export interface NftBoxProps {
  mint: string;
}

const NFTCard = ({ mint }: NftBoxProps) => {
  const metadata = useTokenMetadata(mint);
  const [imgLoaded, setImgLoaded] = useState(false);
  // not an NFT
  if (!metadata.isLoading && !metadata.data) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        'shadow-md rounded-xl overflow-hidden break-inside-avoid-column',
        metadata.isLoading && 'animate-pulse'
      )}
    >
      <img
        src={metadata.data?.image}
        className={clsx(
          'object-cover aspect-auto w-full',
          (!imgLoaded || metadata.isLoading) && 'bg-gray-500 h-52'
        )}
        loading="lazy"
        alt={metadata.data?.name}
        onLoad={() => setImgLoaded(true)}
      />
      <div className="p-2 rounded-md">
        <p className={clsx('font-bold', metadata.isLoading && 'h-4 w-full bg-gray-400 rounded-sm')}>
          {metadata.data?.name}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
