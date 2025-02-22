import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL, // Use .env variable
  }),
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => 'banner',
    }),
    getNewArrival: builder.query({
      query: () => 'list/newarrival',
    }),
    getBestSeller: builder.query({
      query: () => 'list/bestseller',
    }),
    getFeatureItem: builder.query({
      query: () => 'list/featureitem',
    }),
  }),
});

export const {
  useGetBannerQuery,
  useGetNewArrivalQuery,
  useGetBestSellerQuery,
  useGetFeatureItemQuery,
} = bannerApi;
