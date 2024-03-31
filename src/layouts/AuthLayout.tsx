import React from "react";
import authSideImage from "../assets/images/authSideImage.svg";

function AuthLayout(props: any) {
  const { title, description, children } = props;
  return (
    <div className=" my-14 mb-36">
      <div className="auth-container  flex items-center justify-between gap-[130px] ">
        <div className="w-full  h-[780px] overflow-hidden">
          <img src={authSideImage} alt="phones" className="" />
        </div>
        <div className="min-w-[370px] max-w-[370px]  flex flex-col ">
          <h1 className="text-4xl font-medium mb-6">{title}</h1>
          <p className="mb-12">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
