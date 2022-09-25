import { configureStore } from "@reduxjs/toolkit";
import { expenseApiSlice } from "../features/expenseApiSlice";
import expenseReducer from "../features/expenseSlice";

export const store = configureStore({
  reducer: {
    [expenseApiSlice.reducerPath]: expenseApiSlice.reducer,
    expense: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
