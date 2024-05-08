import React from "react";
import Spinner from "../Basic/Spinner";
import GoogleIcon from "../../assets/icons/GoogleIcon.svg";
import { useNavigate } from "react-router-dom";

function Buttons(props: any) {
  return (
    <button type="button" className="bg-[#DB4444]">
      Log in
    </button>
  );
}

export default Buttons;

export const ButtonPrimary = (props: any) => {
  const { text, loading, fullWidth, onClick, small, disabled, ...rest } = props;
  return (
    <button
      type="button"
      className={` cursor-pointer font-medium text-white rounded-[4px] flex items-center justify-center gap-2 ${
        disabled ? "bg-gray-400" : "bg-[#DB4444] hover:bg-[#aa2d2d] "
      } ${fullWidth ? "w-full" : ""} ${small ? "p-2 px-5" : "  p-4 px-12"} `}
      disabled={loading || disabled}
      onClick={onClick}
      {...rest}
    >
      {text} {loading && <Spinner white />}
    </button>
  );
};

export const ButtonSecondary = (props: any) => {
  const { text, loading, small, disabled, ...rest } = props;
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={` cursor-pointer font-medium text-black rounded-[4px] flex items-center justify-center gap-2 border border-[#00000080] ${
        disabled ? "bg-gray-400" : "bg-[#fff] hover:bg-[#f4f4f4] "
      } ${small ? "p-2 px-5" : "  p-4 px-12"} `}
      disabled={loading || disabled}
      {...rest}
    >
      {text} {loading && <Spinner white />}
    </button>
  );
};

export const GoogleBtn = (props: any) => {
  const { text, loading, disabled, ...rest } = props;
  return (
    <button
      type="button"
      className={` p-4 px-12 cursor-pointer font-medium text-black rounded-[4px] flex items-center justify-center gap-4 border border-[#00000066] ${
        disabled ? "bg-gray-400" : "bg-[#fff] hover:bg-[#f4f4f4] "
      } `}
      disabled={loading || disabled}
      {...rest}
    >
      <img src={GoogleIcon} alt="google" /> {text}{" "}
      {loading && <Spinner white />}
    </button>
  );
};
