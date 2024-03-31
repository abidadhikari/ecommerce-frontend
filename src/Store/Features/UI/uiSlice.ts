import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  value: number;
}

const initialState: UIState = {
  value: 0,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = uiSlice.actions;

export default uiSlice.reducer;
