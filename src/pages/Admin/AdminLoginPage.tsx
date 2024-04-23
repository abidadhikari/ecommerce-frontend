import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Store/Features/Auth/AuthAction";
import { ButtonPrimary } from "../../components/utils/Buttons";
import { clearUser } from "../../Store/Features/Auth/AuthSlice";
import { clearCartLocal } from "../../Store/Features/Cart/CartSlice";

function AdminLoginPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.authSlice);

  const login = () => {
    dispatch(
      //   loginUser({ email: "suyog@test.com", password: "$hahRukhKhan059" })
      loginUser({ email: "admin@test.com", password: "12345678" })
    );
  };
  useEffect(() => {
    if (!auth.login_loading && auth.login_success) {
      if (auth.user) {
        navigate("/dashboard");
      }
    }
  }, [auth.login_loading]);

  useEffect(() => {
    dispatch(clearUser());
    dispatch(clearCartLocal());
  }, []);

  return (
    <div>
      DASHBOARD LOGIN PAGE
      <ButtonPrimary
        text="Login ADMIN"
        onClick={() => {
          dispatch(
            loginUser({ email: "admin@test.com", password: "12345678" })
          );
        }}
      />
      <Link to="/">GO HOME</Link>
    </div>
  );
}

export default AdminLoginPage;
