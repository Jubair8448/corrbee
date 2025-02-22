import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, // Use environment variable for flexibility
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Oneuptoken'); // Retrieve token from local storage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderByUser: builder.query({
      query: () => ({
        url: 'order/orderbyuser',
        method: 'GET',
      }),
    }),
    postOrder: builder.mutation({
      query: (data) => ({
        url: 'order',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  usePostOrderMutation,
  useGetOrderByUserQuery,
} = orderApi;
