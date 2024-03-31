import React from "react";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import WindowIcon from "@mui/icons-material/Window";
import LayersIcon from "@mui/icons-material/Layers";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../components/Logo";
import { Link, NavLink } from "react-router-dom";
import MyIcon from "../helper/MyIcon";

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
          <SideBarLink
            link="/dashboard"
            icon={<WindowIcon />}
            name="Dashboard"
          />
        </div>
      </div>
      <div className="max-h-full w-full overflow-auto bg-[#f3f3f3] p-6 ">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
