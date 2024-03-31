/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL_BASE } from "../helper/urlConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";
import { fetchGooglogin } from "../Store/Features/Auth/AuthAction";
import { setUser } from "../Store/Features/Auth/AuthSlice";

function LandingLayout(props: any) {
  const { children } = props;
  const dispatch = useDispatch<AppDispatch>();
  // const getUser = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL_BASE}/auth/login/success`, {
  //       withCredentials: true,
  //     });
  //     console.log("GET GOOGLE LOGIN?", response?.data);
  //   } catch (error: any) {
  //     console.log("ERROR:::", error);
  //   }
  // };

  useEffect(() => {
    let localUser = localStorage.getItem("user");
    localUser = JSON.parse(localUser!);

    if (!localUser?.token) {
      dispatch(fetchGooglogin());
    } else {
      dispatch(setUser(localUser));
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default LandingLayout;
