// src/services/shopService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://datos-stock-default-rtdb.firebaseio.com/",
  }),

  endpoints: (builder) => ({
    // ⭐ GET – Obtener categorías
    getCategoria: builder.query({
      query: () => "categoria.json",
    }),

    // ⭐ POST – Crear nueva categoría
    postCategoria: builder.mutation({
      query: (newCategoria) => ({
        url: "categoria.json",
        method: "POST",
        body: newCategoria,
      }),
    }),

    // ⭐ PUT – Actualizar una categoría
    updateCategoria: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `categoria/${id}.json`,
        method: "PUT",
        body: updateData,
      }),
    }),

    // ⭐ DELETE – Eliminar categoría
    deleteCategoria: builder.mutation({
      query: (id) => ({
        url: `categoria/${id}.json`,
        method: "DELETE",
      }),
    }),
  }),
});

// 👇 EXPORTS CORRECTOS
export const {
  useGetCategoriaQuery,
  usePostCategoriaMutation,
  useUpdateCategoriaMutation,
  useDeleteCategoriaMutation,
} = shopApi;
