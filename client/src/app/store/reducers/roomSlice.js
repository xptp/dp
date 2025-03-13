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
    roomUpdated: (state, action) => {
      const updatedRoom = action.payload;
      state.rooms = state.rooms.map((room) =>
        room._id === updatedRoom._id ? updatedRoom : room
      );
      state.currentRoom = updatedRoom;
    },
  },
});

export const {
  roomsRequested,
  roomsReceived,
  roomsRequestedFailed,
  roomById,
  roomUpdated,
} = roomSlice.actions;

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
export const updateRoom = (id, updatedData) => async (dispatch) => {
  dispatch(roomsRequested());
  try {
    const response = await roomService.updateRoom(id, updatedData);
    dispatch(roomUpdated(response.data));
  } catch (e) {
    dispatch(roomsRequestedFailed(e.message));
  }
};

export default roomSlice.reducer;
