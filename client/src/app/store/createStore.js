import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// const rootReducer = combineReducers({});

const rootReducer = combineReducers({
  user: userReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
