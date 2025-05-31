import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <ThreeCircles
        height="80"
        width="80"
        radius="9"
        color="#7C5DFA"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
