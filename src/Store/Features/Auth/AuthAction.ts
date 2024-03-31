import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import { setAccessToken } from "../../../components/AuthTools/accessToken";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    if (response.status === 200) {
      // alert("Data fetched success");
      return response.data;
    } else {
      throw "Data fetch error";
    }
  } catch (error) {
    // console.log(error);
  }
});

export const fetchGooglogin = createAsyncThunk("fetchGooglogin", async () => {
  try {
    const response = await axios.get(`${BASE_URL_BASE}/auth/login/success`, {
      withCredentials: true,
    });
    console.log("AUTH FGOOGLE RESPONSE:::", response);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("access_token", response.data.data.token);
      return response.data;
    } else if (response.status === 403) {
      alert("Google login failed");
    } else {
      throw "Data fetch error";
    }
  } catch (error: any) {
    // if (error?.response?.status === 403) {
    //   alert(error?.response?.data.message);
    // }
    console.log(error);
  }
});

export const createUser = createAsyncThunk("createUser", async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data);
    if (response.status === 200) {
      // localStorage.setItem("user", JSON.stringify(response.data.data));

      return response.data;
    } else {
      throw "Data fetch error";
    }
  } catch (error) {
    // console.log(error);
  }
});

export const loginUser = createAsyncThunk("loginUser", async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data);
    console.log(response);
    if (response.status === 201) {
      localStorage.setItem("user", JSON.stringify(response.data.data));

      localStorage.setItem("access_token", response.data.data.token);
      return response.data;
    } else {
      throw "Data fetch error";
    }
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk("getMe", async () => {
  try {
    setAccessToken();
    const response = await axios.get(`${BASE_URL}/user/getme`);
    console.log("GET ME::::", response?.data);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
});
