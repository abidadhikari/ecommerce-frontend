import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import { setAccessToken } from "../../../components/AuthTools/accessToken";
import { MyToast } from "../../../helper/MyToast";

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category/`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw "Category Data fetch error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

//add category
export const addCategory = createAsyncThunk(
  "addCategory",
  async (data: any) => {
    const { body } = data;
    try {
      const response = await axios.post(`${BASE_URL}/category/create`, body);
      if (response.status === 201) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        MyToast({ success: false, message: error?.response?.data?.message });
      }
      return null;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/category/${id}`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "Category Delete error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

// update category
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data: any) => {
    const { id, body } = data;
    try {
      const response = await axios.put(`${BASE_URL}/category/${id}`, body);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "Data Update error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async (id: string | undefined) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw "Data Fetch error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);
