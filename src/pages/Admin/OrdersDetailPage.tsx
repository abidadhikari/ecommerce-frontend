import React, { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { useParams } from "react-router-dom";
import {
  getSingleOrder,
  updateSingleOrder,
} from "../../Store/Features/Order/OrderAction";
import { OrderStatus } from "../../components/constants/orderStatus";

function OrdersDetailPage(props: any) {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.orderSlice);

  useEffect(() => {
    dispatch(getSingleOrder({ orderId: params.id }));
  }, []);

  return (
    <DashboardLayout>
      <DashboardRightContent>
        {params.id}
        {order.get_loading && "LOADING"}
        <ul>
          <li>{order.singleOrder.updatedAt}</li>
        </ul>
        <button
          onClick={() => {
            dispatch(
              updateSingleOrder({
                orderId: params.id,
                body: {
                  status: "PROCESSING",
                },
              })
            );
          }}
        >
          update here
        </button>
        <h1>{order.singleOrder.status}</h1>

        <div className="flex gap-4 flex-wrap">
          {OrderStatus.map((orderItem: any) => {
            return (
              <button
                className={`p-2 border rounded-md  ${
                  order.singleOrder?.status === orderItem?.value
                    ? "bg-green-500"
                    : "hover:bg-slate-300"
                }`}
                onClick={() =>
                  dispatch(
                    updateSingleOrder({
                      orderId: params.id,
                      body: {
                        status: orderItem?.value,
                      },
                    })
                  )
                }
              >
                {orderItem?.value}
              </button>
            );
          })}
        </div>
      </DashboardRightContent>
    </DashboardLayout>
  );
}

export default OrdersDetailPage;
