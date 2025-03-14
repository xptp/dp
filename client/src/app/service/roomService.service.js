import axios from "axios";
import config from "../config.json";

const httpAuth = axios.create({
  // baseURL: config.apiEndpoint,
  baseURL: config.apiEndpointTest,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const roomService = {
  getAllRooms: async () => {
    try {
      const response = await httpAuth.get("/rooms");

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении комнат", error);
    }
    throw new Error("Ошибка при получении комнат");
  },

  getById: async (id) => {
    try {
      const response = await httpAuth.get(`/rooms/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении комнаты с id: ${id}`, error);
      throw error;
    }
  },
  updateRoom: async (id, updatedData) => {
    const response = await httpAuth.put(`/rooms/${id}`, updatedData);
    return response;
  },
  createRoom: async (roomData) => {
    try {
      const response = await httpAuth.post("/rooms", roomData);
      return response.data;
    } catch (e) {
      console.error("Ошибкапри создании комнаты", e);
      throw e;
    }
  },
  deleteRoom: async (id) => {
    try {
      const response = await httpAuth.delete(`/rooms/${id}`);

      return response.data;
    } catch (e) {
      console.error("Ошибкапри удаления комнаты", e);
      throw e;
    }
  },
};

export default roomService;
