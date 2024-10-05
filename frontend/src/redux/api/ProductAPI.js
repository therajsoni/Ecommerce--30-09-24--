import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    categories: builder.query({
      query: () => `categories`,
      providesTags: ["product"],
    }),
    searchProducts: builder.query({
      query: ({ price, search, sort, category, page }) => {
        let base = `all?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        return base;
      },
    }),
    newProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    productDetails: builder.query({
      query: ({ id }) => id,
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, userId ,productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ formData, userId ,productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
        body: formData,
      }),
      invalidatesTags: ["product"],
    })
  }),
});

//2:58:43

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = ProductAPI;
