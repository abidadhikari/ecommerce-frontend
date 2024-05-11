import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import { setAccessToken } from "../../../components/AuthTools/accessToken";
import { MyToast } from "../../../helper/MyToast";

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

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products/`);
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

export const addProduct = createAsyncThunk("addProduct", async (data: any) => {
  const { body } = data;
  try {
    const response = await axios.post(`${BASE_URL}/products`, body);
    if (response.status === 201) {
      MyToast({ success: true, message: response.data.message });
      return response.data;
    } else {
      throw "Data Update error";
    }
  } catch (error) {
    // console.log(error);
  }
});

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "Data Delete error";
      }
    } catch (error) {
      // console.log(error);
    }
  }
);

export const addProductImage = createAsyncThunk(
  "addProductImage",
  async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/products/add-image/${id}`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "image Data add error";
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const getProductImage = createAsyncThunk(
  "getProductImage",
  async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/get-image/${id}`);
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "image get error";
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage",
  async (id: string) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/products/delete-image/${id}`
      );
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "image Data Delete error";
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProductImage = createAsyncThunk(
  "updateProductImage",
  async (data: any) => {
    const { id, body } = data;
    try {
      const response = await axios.put(
        `${BASE_URL}/products/update-image/${id}`,
        body
      );
      if (response.status === 200) {
        MyToast({ success: true, message: response.data.message });
        return response.data;
      } else {
        throw "image Data update error";
      }
    } catch (error) {
      console.log(error);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (data: any) => {
    const { id, body } = data;
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, body);
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

export const searchProducts = createAsyncThunk(
  "searchProducts",
  async (query: string | undefined) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/search?query=${query}`
      );
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

export const getProductsPerCategoryStats = createAsyncThunk(
  "getProductsPerCategoryStats",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products/products-per-category`
      );
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
