import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1',
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (auth) => ({
        url: `accounts:signUp?key=AIzaSyDK-b1rfeahLq5pgWzG_2IqnFQJVc7czck`,
        method: 'POST',
        body: {
          email: auth.email,
          password: auth.password,
          returnSecureToken: true,
        },
      }),
    }),

    login: builder.mutation({
      query: (auth) => ({
        url: `accounts:signInWithPassword?key=AIzaSyDK-b1rfeahLq5pgWzG_2IqnFQJVc7czck`,
        method: 'POST',
        body: {
          email: auth.email,
          password: auth.password,
          returnSecureToken: true,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
