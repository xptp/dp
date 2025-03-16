import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import commentReducer from "./reducers/commentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
    comments: commentReducer,
  },
});

export default store;
