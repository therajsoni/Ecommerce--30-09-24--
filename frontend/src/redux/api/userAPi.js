import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { server } from "../store";


export const userAPI = createApi({
    reducerPath : "userAPI",
    baseQuery : fetchBaseQuery({
        // /api/v1/user/new
        baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user/`
    }),
    endpoints : (builder) => ({
    login :  builder.mutation({
        query : (user) => ({
            url : "new",
            method : "POST",
            body : user
        })
    }),
    })
})

export const {useLoginMutation} = userAPI