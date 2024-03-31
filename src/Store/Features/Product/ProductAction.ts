import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import { setAccessToken } from "../../../components/AuthTools/accessToken";

export const fetchSingleProductDetail = createAsyncThunk(
  "fetchSingleProductDetail",
  async (productId: number | string | any) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw "Data fetch error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);
