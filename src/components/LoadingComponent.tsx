import { CgSpinnerAlt } from 'react-icons/cg';

function Spinner() {
  return <CgSpinnerAlt className="text-4xl animate-spin m-auto" />;
}

const LoadingComponent = () => {
  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default LoadingComponent;
