import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "../reducer";
import createSagaMiddleware from "redux-saga";

import React from "react";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
