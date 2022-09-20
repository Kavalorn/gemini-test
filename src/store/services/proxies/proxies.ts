import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetProxiesResDto } from "../accounts/types";

export const proxiesApi = createApi({
  reducerPath: "proxies",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["proxies"],
  endpoints: (builder) => ({
    getProxies: builder.query<GetProxiesResDto, undefined>({
      query: () => ({
        url: `/proxies/simple`,
        method: "GET",
      }),
      providesTags: ["proxies"],
    }),
  }),
});

export const { useGetProxiesQuery } = proxiesApi;
