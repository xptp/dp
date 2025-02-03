import axios from "axios";
import config from "../config.json";
import cookieService from "./cookie.service";

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
      console.error("Ошибка поиска свободных номеров:", error);
    }
  },
  fetchUserBookings: async (userId) => {
    const accessToken = cookieService.getAccessToken();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/book/user-bookings/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка поиска бронирований пользователя: ", error);
      throw error;
    }
  },
  cancelBooking: async (bookingId) => {
    const accessToken = cookieService.getAccessToken();
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/book/cancel/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка удаления бронирования: ", error);
      throw error;
    }
  },
};

export default bookingService;
