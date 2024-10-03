import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductAPI = createApi({
reducerPath : "userApi",
baseQuery : fetchBaseQuery({
    baseUrl : `http://localhost:4000/api/v1/product/`
}),
endpoints : (builder) => ({

    latestProducts : builder.query({
        query : () => "latest"
    }),
    allProducts : builder.query({
        query : () => "admin-products"
    })

})
})


  

export const {useLatestProductsQuery,useAllProductsQuery}  = ProductAPI