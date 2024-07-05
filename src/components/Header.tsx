import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyIcon from "../helper/MyIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { increment } from "../Store/Features/UI/uiSlice";
import Logout from "./AuthTools/Logout";
import IsAuthenticated from "./AuthTools/isAuthenticated";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./Logo";
import IsAdmin from "./AuthTools/isAdmin";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [searchText, setSearchText] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();
  const ui = useSelector((state: RootState) => state.uiSlice);
  const product = useSelector((state: RootState) => state.productSlice);
  const cart = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = IsAuthenticated();
  const doSomething = () => {
    setMobileNav(false);
  };

  const Nav = () => {
    return (
      <>
        <Link onClick={doSomething} to="/">
          Home
        </Link>
        <Link onClick={doSomething} to="/dashboard">
          Dashboard
        </Link>
        <Link onClick={doSomething} to="/contact">
          Contact
        </Link>
        {/* <Link onClick={doSomething} to="/users/asfd">Users</Link> */}
        <Link onClick={doSomething} to="/about">
          About
        </Link>
        {IsAdmin() && "ADMIN"}

        {IsAuthenticated() ? (
          <></>
        ) : (
          <>
            <Link onClick={doSomething} to="/login">
              Login
            </Link>
            <Link onClick={doSomething} to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </>
    );
  };
  const MobileNav = () => {
    return (
      <div className="fixed bg-white h-screen w-full top-0 left-0 z-[1000] px-8">
        <div className="flex items-center justify-between bg-gray-200 p-4 mt-5">
          <Logo />{" "}
          <button onClick={() => setMobileNav(!mobileNav)}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-8">
          <Nav />
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="min-h-12 py-2 bg-black text-white flex items-center justify-center  ">
        <div className="container h-full flex items-center justify-between ">
          <div />
          <div className="middle text-sm text-[#FAFAFA]">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            ShopNow
          </div>
          <div className="right">English</div>
        </div>
      </div>
      <div className="pt-9 pb-4 border-b border-black flex items-end bg-white  ">
        <div className="container   flex items-center justify-between">
          <div className="logo font-bold text-2xl">
            <Link to="/">
              <Logo />
              {/* {ui.value} {IsAuthenticated() ? ":::auth:::" : "~NOT~"} */}
            </Link>
          </div>
          <nav className=" items-center gap-10 justify-center text-black hidden md:flex ">
            <Nav />
          </nav>
          {mobileNav && <MobileNav />}
          <div className="flex items-center gap-4">
            <form
              className="search bg-[#F5F5F5] rounded-[4px] relative hidden md:flex"
              onSubmit={(e: any) => {
                e.preventDefault();
                navigate(`/search?query=${searchText}`);
              }}
            >
              <input
                type="text"
                name=""
                id=""
                placeholder="What are you looking for?"
                className="text-xs leading-6 py-[7px] px-5 pr-14 bg-transparent outline-none  "
                onChange={(e: any) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                type="submit"
                className="absolute top-[50%] right-[12px] translate-y-[-50%]"
              >
                <SearchIcon />
              </button>
            </form>
            <button
              type="submit"
              className="flex md:hidden"
              onClick={() => navigate("/search")}
            >
              <SearchIcon />
            </button>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon />
              {cart.cart?.length > 0 && (
                <span className="absolute top-[-15px] right-[-5px] text-[#DB4444] text-xs bg-red-200 h-[18px] w-[18px] rounded-full flex items-center justify-center">
                  {cart.cart?.length}
                </span>
              )}
            </Link>
            <button
              className="flex md:hidden"
              onClick={() => setMobileNav(!mobileNav)}
            >
              <MenuIcon />
            </button>
            <button
              type="button"
              className={` rounded-full p-2  relative ${
                profileModal ? "bg-slate-300" : "bg-slate-50 hover:bg-slate-300"
              }`}
              onClick={() => {
                setProfileModal(!profileModal);
              }}
            >
              <PersonIcon />
              {profileModal && (
                <div className="absolute w-[224px] bg-white border right-0 top-[50px] rounded-sm overflow-hidden shadow-lg">
                  <Link
                    to="/profile"
                    className="flex items-center gap-4 p-2 hover:bg-[#f6f6f6]"
                  >
                    <PersonIcon /> Profile
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <button
                        className="w-full flex items-center gap-4 p-2 hover:bg-[#f6f6f6]"
                        onClick={Logout}
                      >
                        <LogoutIcon /> Logout
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
