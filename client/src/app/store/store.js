import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
  },
});

export default store;
