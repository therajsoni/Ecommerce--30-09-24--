import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPi"
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { userReducer } from "./reducer/userReducer";
import { ProductAPI } from "./api/ProductAPI";
import { cartReducers } from "./reducer/cartReducer";
import { orderApi } from "./api/OrderApi";

export const server = "http://localhost:4000";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name] : userReducer.reducer,
    [cartReducers.name] : cartReducers.reducer
  },
  middleware : (mid) => [...mid(),userAPI.middleware, ProductAPI.middleware,orderApi.middleware],
  
});
