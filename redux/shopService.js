
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
      transformResponse: (res) => res ? Object.keys(res).map((id) => ({ id, ...res[id] })) : [],
      providesTags: ["Categoria"],
    }),

    postCategoria: builder.mutation({
      query: (orderData) => ({
        url: "orders.json", 
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Categoria"],
    }),

    getProducts: builder.query({
      query: () => "products.json",
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
  usePostCategoriaMutation,
} = shopApi;
