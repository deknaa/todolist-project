import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducers";

const store = configureStore({
  reducer: {
    todo: todoReducer
  }
})

export default store