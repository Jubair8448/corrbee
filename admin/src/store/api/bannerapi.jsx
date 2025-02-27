import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: (builder) => ({
    getAllBanner: builder.query({
      query: () => 'banner',
    }),
    getSingleBanner: builder.query({
      query: (id) => `banner/${id}`,
    }),
    postBanner: builder.mutation({
      query: (data) => ({
        url: 'banner',
        method: 'POST',
        body: data,
      }),
    }),
    patchBanner: builder.mutation({
      query: ({ data, id }) => ({
        url: `banner/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `banner/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useGetSingleBannerQuery,
  usePostBannerMutation,
  usePatchBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
