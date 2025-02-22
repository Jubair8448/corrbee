import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, // Use environment variable for flexibility
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Oneuptoken'); // Retrieve token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCartProduct: builder.query({
      query: () => ({
        url: 'cart/addtocartlist',
        method: 'GET',
      }),
    }),
    getCartCount: builder.query({
      query: () => ({
        url: 'cart/cartcount',
        method: 'GET',
      }),
    }),
    postCartItem: builder.mutation({
      query: (data) => ({
        url: 'cart',
        method: 'POST',
        body: data,
      }),
    }),
    postUpdateCart: builder.mutation({
      query: (data) => ({
        url: 'cart/updateqty',
        method: 'POST',
        body: data,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  usePostCartItemMutation,
  useGetCartProductQuery,
  useDeleteCartMutation,
  usePostUpdateCartMutation,
  useGetCartCountQuery,
} = cartApi;
