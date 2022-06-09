import { Spinner } from '@saifuwallet/saifu-ui';

const LoadingComponent = () => {
  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Spinner className="text-4xl m-auto text-gray-400" />
    </div>
  );
};

export default LoadingComponent;
