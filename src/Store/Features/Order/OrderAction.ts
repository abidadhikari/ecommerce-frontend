import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import {
  hasAccessToken,
  setAccessToken,
} from "../../../components/AuthTools/accessToken";
import { MyToast } from "../../../helper/MyToast";
import IsAuthenticated from "../../../components/AuthTools/isAuthenticated";

//get cart
export const getOrders = createAsyncThunk("getOrders", async () => {
  setAccessToken();
  try {
    if (hasAccessToken()) {
      const response = await axios.get(`${BASE_URL}/orders`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw "My Order Data fetch error";
      }
    }
  } catch (error) {
    // console.log(error);
  }
});
//get all orders
export const getAllOrders = createAsyncThunk("getAllOrders", async () => {
  setAccessToken();
  try {
    if (hasAccessToken()) {
      const response = await axios.get(`${BASE_URL}/orders/all-orders`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw "All Order Data fetch error";
      }
    }
  } catch (error) {
    // console.log(error);
  }
});

//get single order
export const getSingleOrder = createAsyncThunk(
  "getSingleOrder",
  async (data: any) => {
    const { orderId } = data;
    setAccessToken();
    try {
      if (hasAccessToken()) {
        const response = await axios.get(
          `${BASE_URL}/orders/single-order/${orderId}`
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw "Single Order Data fetch error";
        }
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

//update single order
export const updateSingleOrder = createAsyncThunk(
  "updateSingleOrder",
  async (data: any) => {
    const { orderId, body } = data;
    setAccessToken();
    try {
      if (hasAccessToken()) {
        const response = await axios.put(
          `${BASE_URL}/orders/single-order/${orderId}`,
          body
        );
        if (response.status === 200) {
          MyToast({ success: true, message: response.data.message });
          return response.data;
        } else {
          throw "Single Order Data update error";
        }
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

//place order
export const placeOrders = createAsyncThunk(
  "placeOrders",
  async (data: any) => {
    const { body } = data;
    setAccessToken();
    try {
      const response = await axios.post(`${BASE_URL}/orders`, body);
      if (response.status === 201) {
        MyToast({ success: true, message: response.data.message });
        console.log(response.data);
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

//delete my order
export const deleteMyOrder = createAsyncThunk(
  "deleteMyOrder",
  async (data: any) => {
    const { orderId } = data;
    setAccessToken();
    try {
      const response = await axios.delete(`${BASE_URL}/orders/${orderId}`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

// sales last 30days
export const getSalesLast30days = createAsyncThunk(
  "getSalesLast30days",
  async () => {
    setAccessToken();
    try {
      const response = await axios.get(`${BASE_URL}/orders/sales-last-30-days`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);
