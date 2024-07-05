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
import DeleteIcon from "@mui/icons-material/Delete";

function MyOrders(props: any) {
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
          activeLink={{ name: "My Orders", link: "/my-orders" }}
        />

        <ProfileLayout>
          <div>
            <h1 className="mb-5 font-bold text-sm pb-2 border-b">My Orders</h1>
            {order.myOrders.length === 0 ? "NO orders" : ""}
            {order.myOrders.map((item: any) => {
              return (
                <div className="flex gap-4 items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.Product.thumbnail}
                      alt={item.Product.title}
                      className="w-20 h-auto"
                    />
                    <h2>{item.Product.title}</h2>
                    <i className="p-2 py-1 text-sm bg-gray-300 rounded-lg">
                      {item.status}
                    </i>
                    <b className="text-green-400">Rs.{item.orderPrice}</b>
                  </div>
                  <button
                    className="p-2 border"
                    onClick={() => {
                      dispatch(deleteMyOrder({ orderId: item.id }));
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </ProfileLayout>
      </div>
    </LandingLayout>
  );
}

export default MyOrders;
