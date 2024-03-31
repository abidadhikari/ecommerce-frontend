import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import LandingLayout from "../layouts/LandingLayouts";
import { getMe } from "../Store/Features/Auth/AuthAction";
import Spinner from "../components/Basic/Spinner";
import { displayDate } from "../helper/dateFormat";

function ProfilePage(props: any) {
  const count = useSelector((state: RootState) => state.uiSlice);
  const auth = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMe());
  }, []);
  return (
    <LandingLayout>
      <div className="container ">
        <div className="my-36">
          PROFILE
          <h1>
            Welcome ,{auth.user.name} {auth.loading && <Spinner />}
          </h1>
          <h2>{auth.user.email}</h2>
          <h2>
            {auth.user.createdAt}
            <br /> {displayDate(auth.user.createdAt, true)}
          </h2>
          <h2>{auth.user.role}</h2>
          <h2>{auth.user.updateddAt}</h2>
          <h2>{auth.user.id}</h2>
          <h2>Account VErified??{auth.user.isVerified ? "YES" : "No"}</h2>
          <h2>{auth.user.createdAt}</h2>
        </div>
      </div>
    </LandingLayout>
  );
}

export default ProfilePage;
