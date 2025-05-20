import useStore from "../store/useStore";
import Avatar from "./../assets/Oval.svg";
import { MdLightMode } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { isDarkMode, toggleDarkMode } = useStore();
  const navigate = useNavigate();
  return (
    <div
      className={`
        w-full h-20 md:rounded-r-3xl rounded-none z-[9999] flex items-center justify-between pr-6 md:w-20 md:min-h-screen md:p-0 md:flex-col md:fixed 
        ${isDarkMode ? "bg-[#1e2139]" : "bg-[#373b53]"}
      `}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className="h-20 w-20 cursor-pointer flex items-center justify-center rounded-r-[20px]"
      >
        <img src={Logo} alt="logo" width={80} height={80} />
      </div>
      <div className="flex md:flex-col items-center gap-4 md:pb-4">
        <button onClick={toggleDarkMode} className="mb-2 md:mb-8 text-2xl">
          {isDarkMode ? (
            <MdLightMode className="text-[#7e88c3] " />
          ) : (
            <IoMoonSharp className="text-[#7e88c3]" />
          )}
        </button>
        <hr className="bg-white text-white w-full" />

        <img src={Avatar} width={40} height={40} alt="user img" />
      </div>
    </div>
  );
}
