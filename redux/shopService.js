// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const shopApi = createApi({
//   reducerPath: 'shopApi', 
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://datos-stock-default-rtdb.firebaseio.com' }), 
//   endpoints: (builder) => ({
//     getCategories: builder.query({
//       query: () => 'categoria.json', 
//     }),
//     getProducts: builder.query({
//       query: () => 'products.json', 
//     }),
//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: 'products.json',
//         method: 'POST',
//         body: newProduct,
//       }),
//     }),
//   }),
// });

// export const { useGetCategoriesQuery, useGetProductsQuery, useAddProductMutation } = shopApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://datos-stock-default-rtdb.firebaseio.com/",
  }),
  tagTypes: ["Categoria"],
  endpoints: (builder) => ({
    getCategoria: builder.query({
      query: () => "categoria.json",
      transformResponse: (res) =>
        res
          ? Object.keys(res).map((id) => ({ id, ...res[id] }))
          : [],
      providesTags: ["Categoria"],
    }),

    getProducts: builder.query({
      query: () => 'products.json', 
    }),

    addCategoria: builder.mutation({
      query: (nuevo) => ({
        url: "categoria.json",
        method: "POST",
        body: nuevo,
      }),
      invalidatesTags: ["Categoria"],
    }),

    deleteCategoria: builder.mutation({
      query: (id) => ({
        url: `categoria/${id}.json`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categoria"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriaQuery,
  useAddCategoriaMutation,
  useDeleteCategoriaMutation,
} = shopApi;
