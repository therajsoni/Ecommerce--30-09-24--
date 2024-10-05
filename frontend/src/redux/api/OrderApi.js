import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = `http://localhost:4000`;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/order`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (order) => ({ url: `new`, method: "POST", body: order }),
      invalidatesTags: ["orders"],
    }),

    myOrders: builder.query({
      query: (id) => ({ url: `my?id=${id}`, method: "GET" }),
      providesTags: ["orders"],
    }),

    allOrders: builder.query({
      query: (id) => ({
        url: `all?id=${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    orderDetails: builder.query({
      query: (id) => ({ url: `${id}` }),
      providesTags: ["orders"],
    }),

    updateOrder: builder.mutation({
      query: ({ userId, orderId }) => ({
        url: `${userId}?id=${orderId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"], // re-render when an order is updated
    }),

    deleteOrder: builder.mutation({
        query: ({ userId, orderId }) => ({
          url: `${userId}?id=${orderId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["orders"], // re-render when an order is updated
      }),
    
  }),
});

// Export all hooks
export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} = orderApi;

// 4:20:56