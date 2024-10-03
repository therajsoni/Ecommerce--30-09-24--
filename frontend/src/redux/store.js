import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/UserApi";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { userReducer } from "./reducer/userReducer";
import { ProductAPI } from "./api/ProductAPI";

export const server = "http://localhost:4000";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [userReducer.name] : userReducer.reducer,
  },
  middleware : (mid) => [...mid(),userAPI.middleware, ProductAPI.middleware],
  
});
