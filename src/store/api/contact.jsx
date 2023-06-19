import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1/",
  }),
  tagTypes: "contactApi",
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: (token) => ({
        url: "contact",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["contactApi"],
    }),
    setNewContact: builder.mutation({
      query: ({ token, data }) => ({
        url: "contact",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
    getContact: builder.query({
      query: ({ token, id }) => ({
        url: `contact/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["contactApi"],
    }),
    updateContact: builder.mutation({
      query: ({ token, id, data }) => ({
        url: `contact/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags:['contactApi']
    }),
    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `contact/ ${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
  }),
});

export const {
  useGetAllContactQuery,
  useSetNewContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
