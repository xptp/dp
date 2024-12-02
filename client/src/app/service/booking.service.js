import axios from "axios";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const bookingService = {
  getAllAvaliableRooms: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/book/available"
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch available rooms:", error);
    }
  },
};

export default bookingService;
