import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, // Use environment variable for flexibility
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('Oneuptoken'); // Retrieve the token from local storage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWishlistProduct: builder.query({
      query: () => ({
        url: `wishlist/wishlistitem`,
        method: 'GET',
      }),
    }),
    getWishlistCount: builder.query({
      query: () => ({
        url: `wishlist/wishlistcount`,
        method: 'GET',
      }),
    }),
    postWishlistItem: builder.mutation({
      query: (data) => ({
        url: `wishlist`,
        method: 'POST',
        body: data,
      }),
    }),
    postDeleteWishlist: builder.mutation({
      query: (data) => ({
        url: `wishlist/removewishlist`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  usePostWishlistItemMutation,
  useGetWishlistProductQuery,
  usePostDeleteWishlistMutation,
  useGetWishlistCountQuery,
} = wishlistApi;
