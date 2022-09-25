import { apiSlice } from "./apiSlice";
import { ICategory, ITransaction, ILabels } from "../../types";

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: ["categories"],
    }),
    getLabels: builder.query<ILabels[], void>({
      query: () => "/labels",
      providesTags: ["transactions"],
    }),
    addTransaction: builder.mutation<ITransaction, ITransaction>({
      query: (transaction) => ({
        url: "/transaction",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["transactions"],
    }),
    deleteTransaction: builder.mutation<string, string>({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = expenseApiSlice;
