/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LandingLayout from "../layouts/LandingLayouts";
import AuthLayout from "../layouts/AuthLayout";
import ContinueWithGoogle from "../components/AuthTools/ContinueWithGoogle";
import { ButtonPrimary } from "../components/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { loginUser } from "../Store/Features/Auth/AuthAction";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../Store/Features/Auth/AuthSlice";
import { clearCartLocal } from "../Store/Features/Cart/CartSlice";

function LoginPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.authSlice);

  const login = () => {
    dispatch(
      // loginUser({ email: "suyog@test.com", password: "$hahRukhKhan059" })
      loginUser({ email: "alice@example.com", password: "12345678" })
      // loginUser({ email: "admin@test.com", password: "12345678" })
    );
  };

  useEffect(() => {
    if (!auth.login_loading && auth.login_success) {
      if (auth.user) {
        navigate("/");
      }
    }
  }, [auth.login_loading]);
  useEffect(() => {
    dispatch(clearUser());
    dispatch(clearCartLocal());
  }, []);

  return (
    <LandingLayout>
      <AuthLayout
        title="Log in to Exclusive"
        description="Enter your details below"
      >
        <form action="">
          Login
          <ButtonPrimary text="Login BASIC" onClick={login} />
          <ButtonPrimary
            text="Login ADMIN"
            onClick={() => {
              dispatch(
                loginUser({ email: "admin@test.com", password: "12345678" })
              );
            }}
          />
          <ContinueWithGoogle />
        </form>
      </AuthLayout>
    </LandingLayout>
  );
}

export default LoginPage;
