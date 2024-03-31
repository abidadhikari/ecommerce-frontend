import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LandingLayout from "../layouts/LandingLayouts";
import AuthLayout from "../layouts/AuthLayout";
import { ButtonPrimary } from "../components/utils/Buttons";
import { AuthInput } from "../components/utils/Inputs";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../helper/urlConfig";
import ContinueWithGoogle from "../components/AuthTools/ContinueWithGoogle";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Store/Features/Auth/AuthAction";
import { AppDispatch, RootState } from "../Store/store";

function SignUpPage(props: any) {
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.authSlice);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must have a minimum of six characters with at least one letter, one number and one special character."
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
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

  const onSubmit = (data: any) => {
    // console.log("Form Data:", data);
    dispatch(createUser(data));
  };
  const onError = (error: any) => {
    console.log("Form Error:", error);
  };

  useEffect(() => {
    if (auth?.create_success && !auth?.create_loading) {
      navigate("/login");
    }
  }, [auth?.create_loading]);

  return (
    <LandingLayout>
      <AuthLayout
        title="Create an account"
        description="Enter your details below"
      >
        {user && <h1>{user?.name}</h1>}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-10"
          noValidate
        >
          <AuthInput
            placeholder="Name"
            name="name"
            register={register}
            autoComplete="off"
            error={errors?.name?.message}
            required
          />
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
            placeholder="Phone Number"
            type="text" // Changed from "number" to "text"
            name="phone" // Changed from "number" to "phone"
            register={register}
            error={errors?.phone?.message}
            autoComplete="off"
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
          <AuthInput
            placeholder="Confirm Password"
            type="password"
            autoComplete="off"
            name="confirmPassword"
            register={register}
            error={errors?.confirmPassword?.message}
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
            <div className="leading-6">Already have an account?</div>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </AuthLayout>
    </LandingLayout>
  );
}

export default SignUpPage;
