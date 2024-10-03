import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
reducerPath : "userApi",
baseQuery : fetchBaseQuery({
    baseUrl : `http://localhost:4000/api/v1/user/`
}),
endpoints : (builder) => ({
    login : builder.mutation({
        query: (user) => ({
            url: "new",
            method : "POST",
            body : user
        })
    }),
})
})

export const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/user/${id}`);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json(); // Convert response to JSON
      console.log('hello', data);
      
      return data;
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
  

export const {useLoginMutation}  = userAPI