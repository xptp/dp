import { createSlice } from "@reduxjs/toolkit";
import roomService from "../../service/roomService.service";

const initialState = {
  rooms: [],
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    roomsRequested: (state) => {
      state.isLoading = true;
    },
    roomsReceived: (state, action) => {
      state.rooms = action.payload;
      state.isLoading = false;
    },
    roomsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    roomById: (state, action) => {
      state.currentRoom = action.payload;
      state.isLoading = false;
    },
  },
});

export const { roomsRequested, roomsReceived, roomsRequestedFailed, roomById } =
  roomSlice.actions;

export const loadRooms = () => async (dispatch) => {
  dispatch(roomsRequested());
  try {
    const rooms = await roomService.getAllRooms();
    dispatch(roomsReceived(rooms));
  } catch (e) {
    dispatch(roomsRequestedFailed(e.message));
  }
};

export const loadRoomById = (id) => async (dispatch) => {
  dispatch(roomsRequested());
  try {
    const room = await roomService.getById(id);
    dispatch(roomById(room));
  } catch (e) {
    dispatch(roomsRequestedFailed(e.message));
  }
};

export default roomSlice.reducer;
