import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import LandingLayout from "../layouts/LandingLayouts";
import { getMe } from "../Store/Features/Auth/AuthAction";
import Spinner from "../components/Basic/Spinner";
import { displayDate } from "../helper/dateFormat";
import { clearOrderState } from "../Store/Features/Order/OrderSlice";
import { deleteMyOrder, getOrders } from "../Store/Features/Order/OrderAction";

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

        <div>
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
        </div>
      </div>
    </LandingLayout>
  );
}

export default ProfilePage;
