import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const attributeApi = createApi({
  reducerPath: 'attributeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: (builder) => ({
    getAllAttribute: builder.query({
      query: () => 'attribute',
    }),
    getSingleAttribute: builder.query({
      query: (id) => `attribute/${id}`,
    }),
    getAttributeByCategoryId: builder.query({
      query: (id) => `attribute/listbycategoryid/${id}`,
    }),
    postAttribute: builder.mutation({
      query: (data) => ({
        url: 'attribute',
        method: 'POST',
        body: data,
      }),
    }),
    patchAttribute: builder.mutation({
      query: ({ data, id }) => ({
        url: `attribute/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteAttribute: builder.mutation({
      query: (id) => ({
        url: `attribute/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllAttributeQuery,
  useGetAttributeByCategoryIdQuery,
  useGetSingleAttributeQuery,
  usePatchAttributeMutation,
  useDeleteAttributeMutation,
  usePostAttributeMutation,
} = attributeApi;
