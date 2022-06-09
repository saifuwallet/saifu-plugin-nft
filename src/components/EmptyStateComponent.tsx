import { PlusIcon } from '@heroicons/react/solid';
import { Card, Text } from '@saifuwallet/saifu-ui';

const EmptyStateComponent = () => {
  return (
    <Card
      as="a"
      href="https://magiceden.io/"
      target="_blank"
      rel="noopener noreferrer"
      hover
      className="p-5"
    >
      <div className="text-center text-lg space-y-2">
        <PlusIcon className="h-5 w-5 text-gray-500 m-auto" />
        <div>
          <Text as="p" weight="semibold">
            Buy NFT
          </Text>
          <Text as="p" variant="secondary" size="sm">
            from Magic Eden
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default EmptyStateComponent;
