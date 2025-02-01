import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./graphSlice";
import historyReducer from "./historySlice";

const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
  },
});

export default store;
