import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, // Use .env variable
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Oneuptoken'); // Retrieve token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserAddress: builder.query({
      query: () => ({
        url: '/userid',
        method: 'GET',
      }),
    }),
    postCreateAddress: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    postLoginUser: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    patchaddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserAddressQuery,
  usePostCreateAddressMutation,
  usePostLoginUserMutation,
  usePatchaddressMutation,
  useDeleteAddressMutation,
} = addressApi;
