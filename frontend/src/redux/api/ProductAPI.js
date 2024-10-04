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
        query : (id) => `admin-products?id=${id}`
    }),
    categories : builder.query({
        query : (id) => `categories`
    }),
    searchProducts : builder.query({
        query : ({price,search,sort,category,page}) => {

            let base = `all?search={search}&page=${page}`;
            if(price)base += `&price=${price}`
            if(sort)base += `&sort=${sort}`
            if(category)base += `&category=${category}`
            return base;
        }
    }),
    createProducts : builder.mutation({
        query : ({
            formData,id
        }) => ({
            url : `new?id=${id}`,
            method : 'POST',
            body : formData
        })
    }) 

})
})


  

export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useCreateProductsMutation}  = ProductAPI