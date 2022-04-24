import { PlusIcon } from '@heroicons/react/solid';

const EmptyStateComponent = () => {
  return (
    <button
      onClick={() => window.open('https://magiceden.io/')}
      className="shadow-md rounded-xl bg-white overflow-hidden break-inside-avoid-column p-5 cursor-pointer"
    >
      <div className="text-center text-lg space-y-2">
        <PlusIcon className="h-5 w-5 text-gray-500 m-auto" />
        <div>
          <p className="font-bold">Buy NFT</p>
          <p className="text-xs text-gray-400">from Magic Eden</p>
        </div>
      </div>
    </button>
  );
};

export default EmptyStateComponent;
