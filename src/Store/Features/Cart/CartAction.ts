import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import { setAccessToken } from "../../../components/AuthTools/accessToken";
import { MyToast } from "../../../helper/MyToast";

//get cart
export const getCart = createAsyncThunk("getCart", async () => {
  setAccessToken();
  try {
    const response = await axios.get(`${BASE_URL}/cart`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw "Cart Data fetch error";
    }
  } catch (error) {
    // console.log(error);
  }
});

//update cart
export const updateCart = createAsyncThunk("updateCart", async (data: any) => {
  const { body } = data;
  setAccessToken();
  try {
    const response = await axios.post(`${BASE_URL}/cart`, body);
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
});
