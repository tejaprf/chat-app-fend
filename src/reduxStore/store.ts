import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice.ts";


const rootReducer=combineReducers({
    chatReducer:chatSlice,
})

const store=configureStore({
    reducer:rootReducer
});

export default store