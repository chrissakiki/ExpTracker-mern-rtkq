import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5000/api";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURI,
  }),
  tagTypes: ["categories", "transactions"],
  endpoints: (builder) => ({}),
});
