import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import LandingLayout from "../layouts/LandingLayouts";
import { getMe } from "../Store/Features/Auth/AuthAction";
import Spinner from "../components/Basic/Spinner";
import { displayDate } from "../helper/dateFormat";
import { clearOrderState } from "../Store/Features/Order/OrderSlice";
import { deleteMyOrder, getOrders } from "../Store/Features/Order/OrderAction";
import BreadCrumb from "../components/BreadCrumb";
import { Link, NavLink } from "react-router-dom";
import ProfileLayout from "../components/ProfileLayout";
import { TextInput } from "../components/utils/Inputs";

function ProfilePage(props: any) {
  const count = useSelector((state: RootState) => state.uiSlice);
  const auth = useSelector((state: RootState) => state.authSlice);
  const order = useSelector((state: RootState) => state.orderSlice);
  const dispatch = useDispatch<AppDispatch>();

  console.log("ORDER:::", order.myOrders);

  useEffect(() => {
    dispatch(getMe());
    dispatch(clearOrderState());
    dispatch(getOrders());
  }, []);
  return (
    <LandingLayout>
      <div className="container ">
        <BreadCrumb
          ghostLink={[{ name: "Home", link: "/" }]}
          activeLink={{ name: "My Profile", link: "/profile" }}
        />

        <ProfileLayout>
          <div className="">
            <div className="flex items-center justify-end mb-10">
              <span>
                Welcome,{" "}
                <span className="text-[#DB4444]">{auth.user.name}</span>{" "}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <TextInput label="Name" value={auth.user.name} readOnly />
              <TextInput label="Id" value={auth.user.id} readOnly />
              <TextInput label="Email" value={auth.user.email} readOnly />
              <TextInput label="Role" value={auth.user.role} readOnly />

              <TextInput
                label="Created At"
                value={displayDate(auth.user.createdAt, true)}
                readOnly
              />
              <TextInput
                label="Updated At"
                value={displayDate(auth.user.updatedAt, true)}
                readOnly
              />
              <TextInput
                label="Account Verified"
                value={auth.user.isVerified ? "YES" : "No"}
                readOnly
              />
            </div>
          </div>
        </ProfileLayout>

        {/* <div>
          {order.myOrders.map((item: any) => {
            return (
              <div className="flex gap-4">
                <img
                  src={item.Product.thumbnail}
                  alt={item.Product.title}
                  className="w-20 h-auto"
                />
                <h2>{item.id}</h2>
                <button
                  className="p-2 border"
                  onClick={() => {
                    dispatch(deleteMyOrder({ orderId: item.id }));
                  }}
                >
                  Delete this order
                </button>
              </div>
            );
          })}
        </div> */}
      </div>
    </LandingLayout>
  );
}

export default ProfilePage;
