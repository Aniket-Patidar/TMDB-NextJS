import { configureStore } from "@reduxjs/toolkit";
import  homeSlice  from "./sclice/homeSlice";

export const store = configureStore({
    reducer: { home: homeSlice },
});
