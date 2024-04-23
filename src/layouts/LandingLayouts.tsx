/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL_BASE } from "../helper/urlConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { fetchGooglogin } from "../Store/Features/Auth/AuthAction";
import { setUser } from "../Store/Features/Auth/AuthSlice";
import CartUpdating from "../components/Modal/CartUpdating";
import { getCart } from "../Store/Features/Cart/CartAction";
import { useLocation, useSearchParams } from "react-router-dom";

function LandingLayout(props: any) {
  const { children } = props;
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cartSlice);

  // useEffect(() => {
  //   const localUserString = localStorage.getItem("user");
  //   if (localUserString) {
  //     const localUser = JSON.parse(localUserString);
  //     if ("token" in localUser) {
  //       dispatch(setUser(localUser));
  //     } else {
  //       if (searchParams.get("login") === "true") {
  //         dispatch(fetchGooglogin());
  //       }
  //     }
  //   } else {
  //     if (searchParams.get("login") === "true") {
  //       dispatch(fetchGooglogin());
  //     }
  //   }
  // }, []);
  console.log("LOCATION", location?.search, searchParams.get("login"));

  useEffect(() => {
    dispatch(getCart());
  }, []);
  useEffect(() => {
    if (!cart.update_loading && cart.update_success) dispatch(getCart());
  }, [cart.update_loading]);
  return (
    <>
      <CartUpdating active={cart.update_loading} />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default LandingLayout;
