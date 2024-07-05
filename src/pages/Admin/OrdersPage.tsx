/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  deleteCategory,
  fetchAllCategories,
} from "../../Store/Features/Category/CategoryAction";
import MyTable from "../../components/shared/MyTable";
import { ButtonPrimary } from "../../components/utils/Buttons";
import CategoryAddEditModal from "../../components/Modal/CategoryAddEditModal";
import Modal from "../../components/Modal/Modal";
import DeleteModal from "../../components/Modal/DeleteModal";
import { resetCategoryStates } from "../../Store/Features/Category/CategorySlice";
import {
  deleteMyOrder,
  getAllOrders,
} from "../../Store/Features/Order/OrderAction";
import { Link } from "react-router-dom";

function OrdersPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.orderSlice);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  console.log(order.allOrders);
  return (
    <DashboardLayout>
      <DashboardRightContent>
        <div className="top-row flex items-center justify-between gap-3 mb-5">
          <h1 className="text-lg">Orders</h1>
        </div>
        <MyTable
          headings={[
            { title: "Product", align: "left", visible: true },
            { title: "Customer Name", align: "left", visible: true },
            // { title: "Name", align: "center", visible: true },

            { title: "Customer Email", align: "center", visible: true },
            { title: "Status", align: "center", visible: true },
            { title: "Payment", align: "center", visible: true },
            { title: "Message", align: "left", visible: true },
            { title: "Quantity", align: "right", visible: true },
            { title: "Total Price", align: "right", visible: true },
            { title: "Action", align: "right", visible: true },
          ]}
        >
          {order.allOrders?.map((item: any, index: number) => {
            return (
              <>
                <tr key={index}>
                  <td style={{ minWidth: 150 }}>
                    <div className="flex items-center gap-3  h-full">
                      <div className="h-10 w-10 bg-slate-400">
                        <img
                          src={item?.Product?.thumbnail ?? "/noImage.jpg"}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>{item?.Product?.title}</div>
                    </div>
                  </td>
                  <td style={{ minWidth: 150 }}>{item.User.name}</td>
                  <td style={{ minWidth: 150 }} className="text-center">
                    {item.User.email ?? "-"}
                  </td>
                  <td style={{ minWidth: 150 }} className="text-center">
                    {item?.status ?? "-"}
                  </td>
                  <td style={{ minWidth: 150 }} className="text-center">
                    {item?.payment_type ?? "-"}
                  </td>
                  <td style={{ minWidth: 150 }} className="text-center">
                    {item?.customMessageToCustomer ?? "-"}
                  </td>
                  <td style={{ minWidth: 50 }} className="text-right">
                    {item?.quantity}
                  </td>
                  <td style={{ minWidth: 150 }} className="text-right">
                    {item?.orderPrice}
                  </td>
                  <td style={{ minWidth: 150 }}>
                    {" "}
                    <div className="w-full  flex items-center justify-end gap-3">
                      <Link
                        to={`/orders/${item?.id}`}
                        className="text-sm hover:underline text-indigo-400"
                      >
                        View Details
                      </Link>
                      {/* <button
                        type="button"
                        className="action-btn"
                        onClick={() => {}}
                      >
                        <EditIcon />
                      </button> */}
                      <button
                        type="button"
                        className="action-btn"
                        onClick={() =>
                          dispatch(deleteMyOrder({ orderId: item.id }))
                        }
                      >
                        <Delete />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </MyTable>
      </DashboardRightContent>
    </DashboardLayout>
  );
}

export default OrdersPage;
