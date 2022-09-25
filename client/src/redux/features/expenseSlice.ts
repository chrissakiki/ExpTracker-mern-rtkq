import { createSlice } from "@reduxjs/toolkit";
import { ILabels } from "../../types";
import { expenseApiSlice } from "./expenseApiSlice";

interface initialState {
  Labels: ILabels[];
}

const initialState: initialState = {
  Labels: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      expenseApiSlice.endpoints.getLabels.matchFulfilled,
      (state, { payload }) => {
        state.Labels = payload;
      }
    );
  },
});

export default expenseSlice.reducer;
