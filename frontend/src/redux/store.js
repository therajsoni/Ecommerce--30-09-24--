import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPi";


export const server = import.meta.env. VITE_SERVER;

const store = configureStore({
  reducer: {
    [userAPI.reducerPath] : userAPI.reducer,
  },
  middleware : (mid) => [...mid(),userAPI.middleware],
});

export default store;
