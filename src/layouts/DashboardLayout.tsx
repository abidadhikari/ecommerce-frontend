import React, { useEffect } from "react";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import WindowIcon from "@mui/icons-material/Window";
import LayersIcon from "@mui/icons-material/Layers";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import Logo from "../components/Logo";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MyIcon from "../helper/MyIcon";
import DashboardRightHeader from "./DashboardRightHeader";
import IsAdmin from "../components/AuthTools/isAdmin";

const SideBarLink = (props: any) => {
  const { link, icon, name } = props;
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return `flex items-center gap-4 p-4  hover:bg-slate-300 hover:text-[#DB4444] ${
          isActive ? "text-[#DB4444] bg-slate-300" : "text-[#CDCDCD]"
        }`;
      }}
    >
      {icon}
      {name}
    </NavLink>
  );
};

function DashboardLayout(props: any) {
  const { children } = props;
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-red-300">
      <div className="min-w-60 h-full  bg-white py-6 ">
        <div className="px-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="sidebar-links my-10 ">
          <SideBarLink
            link="/dashboard"
            icon={<LayersIcon />}
            name="Dashboard"
          />
          <SideBarLink link="/products" icon={<WindowIcon />} name="Products" />
          <SideBarLink
            link="/categories"
            icon={<CategoryIcon />}
            name="Categories"
          />
          <SideBarLink
            link="/customers"
            icon={<GroupIcon />}
            name="Customers"
          />
          <SideBarLink
            link="/orders"
            icon={<ShoppingCartIcon />}
            name="Orders"
          />
          <SideBarLink
            link="/settings"
            icon={<SettingsIcon />}
            name="Settings"
          />
          {/* <button
            type="button"
            onClick={() => {
              localStorage.clear();
              navigate("/admin-login");
            }}
          >
            Logout
          </button> */}
          <button
            type="button"
            className="flex items-center gap-4 p-4 w-full  hover:bg-slate-300 hover:text-[#DB4444]  text-[#CDCDCD] "
            onClick={() => {
              localStorage.clear();
              navigate("/admin-login");
            }}
          >
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>
      <div className="max-h-full w-full overflow-auto bg-[#f3f3f3] px-6 py-4 ">
        <DashboardRightHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
