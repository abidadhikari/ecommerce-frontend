import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, BASE_URL_BASE } from "../../../helper/urlConfig";
import {
  hasAccessToken,
  setAccessToken,
} from "../../../components/AuthTools/accessToken";
import { MyToast } from "../../../helper/MyToast";
import IsAuthenticated from "../../../components/AuthTools/isAuthenticated";

//get all users
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  setAccessToken();
  try {
    if (hasAccessToken()) {
      const response = await axios.get(`${BASE_URL}/user/only`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw "All users Data fetch error";
      }
    }
  } catch (error) {
    // console.log(error);
  }
});

// get stats

export const getUsersDashStats = createAsyncThunk(
  "getUsersDashStats",
  async () => {
    setAccessToken();
    try {
      if (hasAccessToken()) {
        const response = await axios.get(
          `${BASE_URL}/user/user-creations-last-7-days`
        );
        if (response.status === 200) {
          return response.data;
        } else {
          throw "All users Data fetch error";
        }
      }
    } catch (error) {
      // console.log(error);
    }
  }
);
