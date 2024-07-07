/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LandingLayout from "../layouts/LandingLayouts";
import AuthLayout from "../layouts/AuthLayout";
import ContinueWithGoogle from "../components/AuthTools/ContinueWithGoogle";
import { ButtonPrimary } from "../components/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { loginUser } from "../Store/Features/Auth/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../Store/Features/Auth/AuthSlice";
import { clearCartLocal } from "../Store/Features/Cart/CartSlice";
import { AuthInput } from "../components/utils/Inputs";

function LoginPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.authSlice);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formOptions: any = {
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>(formOptions);

  const login = () => {
    dispatch(
      // loginUser({ email: "liam@example.com", password: "12345678" })
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

  const onSubmit = (data: any) => {
    // console.log("Form Data:", data);
    // dispatch(createUser(data));
    dispatch(
      // loginUser({ email: "liam@example.com", password: "12345678" })
      // loginUser({ email: "suyog@test.com", password: "$hahRukhKhan059" })
      loginUser({ ...data })
      // loginUser({ email: "admin@test.com", password: "12345678" })
    );
  };
  const onError = (error: any) => {
    console.log("Form Error:", error);
  };

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

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-10"
          noValidate
        >
          <AuthInput
            placeholder="Email or Phone Number"
            type="email"
            name="email"
            register={register}
            autoComplete="off"
            error={errors?.email?.message}
            required
          />

          <AuthInput
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="off"
            register={register}
            error={errors?.password?.message}
            required
          />

          <div className="flex flex-col gap-4">
            <ButtonPrimary
              text="Create Account"
              type="submit"
              loading={auth?.create_loading}
            />

            <ContinueWithGoogle />
            {/* <ButtonPrimary type="button" text="test" onCLicck={onSubmit} /> */}
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <div className="leading-6">Don't have an Account?</div>
            <Link to="/signup">SignUp</Link>
          </div>
        </form>
      </AuthLayout>
    </LandingLayout>
  );
}

export default LoginPage;
