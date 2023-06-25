import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (limit) => `products?${limit && `_limit=${limit}`}`,
      providesTags: ['Products'],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    removeProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = productsApi;
