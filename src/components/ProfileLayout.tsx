import React from "react";
import { Link, NavLink } from "react-router-dom";

function ProfileLayout(props: any) {
  const { children } = props;
  return (
    <>
      <div className="flex justify-between gap-10 md:gap-[100px] mb-20 flex-col md:flex-row flex-wrap">
        <div>
          <h2 className="font-bold">Manage my Account</h2>
          <div className="pl-10 mt-3">
            <NavLink
              to="/profile"
              className={({ isActive }) => {
                return `f ${isActive ? "text-[#DB4444] " : "text-black"}`;
              }}
            >
              Profile
            </NavLink>
          </div>
          <h2 className="font-bold mt-5">My Orders</h2>
          <div className="pl-10 mt-3">
            <NavLink
              to="/my-orders"
              className={({ isActive }) => {
                return `f ${isActive ? "text-[#DB4444] " : "text-black"}`;
              }}
            >
              All Orders
            </NavLink>
          </div>
        </div>

        <div className="myshadow flex-1 px-10 md:px-[80px] py-[40px]">
          {children}
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
