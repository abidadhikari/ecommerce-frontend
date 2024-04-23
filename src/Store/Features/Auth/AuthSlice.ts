/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  fetchGooglogin,
  fetchUsers,
  getMe,
  loginUser,
} from "./AuthAction";

const initialState: any = {
  loadUser: { name: "ABid Adhikari" },
  user: {},
  loading: false,
  success: false,
  create_loading: false,
  create_success: false,
  login_loading: false,
  login_success: false,
  ip: {},
  products: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearUser(state) {
      console.log(state);
      localStorage.clear();
      state.user = {};
      state.login_loading = false;
      state.login_success = false;
      state.create_loading = false;
      state.create_success = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
      });
    // fetch from google session
    builder
      .addCase(fetchGooglogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGooglogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(fetchGooglogin.rejected, (state, action) => {
        state.loading = false;
      });

    // create user
    builder
      .addCase(createUser.pending, (state) => {
        state.create_loading = true;
        state.create_success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.create_loading = false;
        if (action.payload?.success) {
          state.user = action.payload?.data;
          state.create_success = true;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.create_loading = false;
        state.create_success = false;
      });
    // login user from webssite
    builder
      .addCase(loginUser.pending, (state) => {
        state.login_loading = true;
        state.login_success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login_loading = false;
        state.user = action.payload?.data;
        state.login_success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login_loading = false;
        state.login_success = false;
      });
    //fetch me
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload?.data;
        }
        state.success = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
      });
  },
});
export const { clearUser, setUser } = authSlice.actions;
export default authSlice.reducer;
