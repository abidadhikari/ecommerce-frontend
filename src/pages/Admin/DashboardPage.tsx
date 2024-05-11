import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardRightContent from "../../layouts/DashboardRightContent";
import MyTable from "../../components/shared/MyTable";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import {
  deleteProduct,
  fetchAllProducts,
  getProductsPerCategoryStats,
  updateProduct,
} from "../../Store/Features/Product/ProductAction";
import { Rating } from "@mui/material";
import Labels from "../../components/shared/Labels";
import { ButtonPrimary } from "../../components/utils/Buttons";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import DeleteModal from "../../components/Modal/DeleteModal";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";
import {
  getAllUsers,
  getUsersDashStats,
} from "../../Store/Features/User/UserAction";
import { fetchAllCategories } from "../../Store/Features/Category/CategoryAction";
import {
  getAllOrders,
  getSalesLast30days,
} from "../../Store/Features/Order/OrderAction";

function DashboardPage(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.productSlice);
  const categorySlice = useSelector((state: RootState) => state.categorySlice);
  const userSlice = useSelector((state: RootState) => state.userSlice);
  const order = useSelector((state: RootState) => state.orderSlice);
  console.log(product?.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllUsers());
    dispatch(fetchAllCategories());
    dispatch(getAllOrders());
    dispatch(getSalesLast30days());
    dispatch(getUsersDashStats());
    dispatch(getProductsPerCategoryStats());
  }, []);
  console.log(order.sales);
  console.log(userSlice.stats);
  return (
    <DashboardLayout>
      <div className="my-5 flex gap-5">
        <DashCard
          title="Sales"
          smallTitle={`
            ${
              order.allOrders?.filter((item: any) => {
                return (
                  item?.status !== "CANCELLED" &&
                  item?.status !== "DELIVERED" &&
                  item?.status !== "RETURNED"
                );
              }).length
            } Pending 
          `}
          value={`$${order.allOrders
            ?.filter((item: any) => {
              return (
                item?.status !== "CANCELLED" &&
                item?.status !== "DELIVERED" &&
                item?.status !== "RETURNED"
              );
            })
            .reduce((acc: number, item: any) => {
              return acc + Number(item?.orderPrice);
            }, 0)}`}
        />
        <DashCard
          title="Customers"
          smallTitle="0 Inactive"
          value={userSlice?.allUsers?.length}
        />
        <DashCard
          title="Active Products"
          smallTitle={`${
            product?.products?.filter((item: any) => {
              return !item.visibility;
            })?.length
          } Inactive`}
          value={
            product?.products?.filter((item: any) => {
              return item.visibility;
            })?.length
          }
        />
        <DashCard
          title="Active Categories"
          smallTitle="0 Inactive"
          value={categorySlice?.categories?.length}
        />
      </div>
      <div className="flex  gap-4 my-5 ">
        <div className="bg-white p-4 flex-1">
          <div className="font-bold mb-4">Total Sales</div>
          <SalesChart data={order?.sales} />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-white p-4 flex-1">
          <div className="font-bold mb-4">New Customers</div>
          <NewCustomersChart data={userSlice.stats} />
        </div>
        <div className="bg-white p-4 flex-1">
          <div className="font-bold mb-4">Products Per Category</div>
          <RevenueByCategoryChart data={product.productsPerCategoryStat} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;

const SalesChart = (props: any) => {
  const { data } = props;
  // const data = [
  //   { value: 45, date: "2024-12-01" },
  //   { value: 27, date: "2024-12-02" },
  //   { value: 68, date: "2024-12-03" },
  //   { value: 83, date: "2024-12-04" },
  //   { value: 12, date: "2024-12-05" },
  //   { value: 91, date: "2024-12-06" },
  //   { value: 55, date: "2024-12-07" },
  //   { value: 33, date: "2024-12-08" },
  //   { value: 78, date: "2024-12-09" },
  //   { value: 64, date: "2024-12-10" },
  //   { value: 49, date: "2024-12-11" },
  //   { value: 86, date: "2024-12-12" },
  //   { value: 60, date: "2024-12-13" },
  //   { value: 73, date: "2024-12-14" },
  //   { value: 37, date: "2024-12-15" },
  //   { value: 95, date: "2024-12-16" },
  //   { value: 21, date: "2024-12-17" },
  //   { value: 42, date: "2024-12-18" },
  //   { value: 54, date: "2024-12-19" },
  //   { value: 88, date: "2024-12-20" },
  //   { value: 77, date: "2024-12-21" },
  //   { value: 10, date: "2024-12-22" },
  //   { value: 66, date: "2024-12-23" },
  //   { value: 39, date: "2024-12-24" },
  //   { value: 50, date: "2024-12-25" },
  //   { value: 94, date: "2024-12-26" },
  //   { value: 18, date: "2024-12-27" },
  //   { value: 82, date: "2024-12-28" },
  //   { value: 29, date: "2024-12-29" },
  //   { value: 70, date: "2024-12-30" },
  //   { value: 35, date: "2024-12-31" },
  // ];
  return (
    <ResponsiveContainer width="100%" minHeight={300} maxHeight={300}>
      <LineChart data={data} width={500} height={500}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="value" type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const NewCustomersChart = (props: any) => {
  const { data } = props;
  // const data = [
  //   { value: 45, date: "2024-12-01" },
  //   { value: 27, date: "2024-12-02" },
  //   { value: 68, date: "2024-12-03" },
  //   { value: 83, date: "2024-12-04" },
  //   { value: 12, date: "2024-12-05" },
  //   { value: 91, date: "2024-12-06" },
  //   { value: 55, date: "2024-12-07" },
  // ];
  return (
    <ResponsiveContainer width="100%" minHeight={300} maxHeight={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" type="monotone" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const RevenueByCategoryChart = (props: any) => {
  const { data } = props;
  // const data = [
  //   { name: "Electronics", revenue: 100 },
  //   { name: "Apple", revenue: 500 },
  // ];
  return (
    <ResponsiveContainer width="100%" minHeight={300} maxHeight={300}>
      <PieChart data={data} width={300} height={300}>
        <Tooltip />
        <Pie
          dataKey="products"
          nameKey="name"
          startAngle={0}
          endAngle={360}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

const DashCard = (props: any) => {
  const { title, smallTitle, value } = props;
  return (
    <div className="p-2 px-4 border bg-white shadow-sm flex-1">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-sm text-[#333] mb-2">{smallTitle}</p>
      <div>{value}</div>
    </div>
  );
};
