import axios from "axios";
import config from "../config.json";
import cookieService from "./cookie.service";

// http://localhost:8080/api
const httpAuth = axios.create({
  baseURL: config.apiEndpoint + /book/,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const bookingService = {
  fetchUserBookings: async (userId) => {
    const accessToken = cookieService.getAccessToken();
    try {
      const { data } = await httpAuth.get(`user-bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Ошибка поиска бронирований пользователя: ", error);
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    const accessToken = cookieService.getAccessToken();
    try {
      const { data } = await httpAuth.delete(`cancel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Ошибка удаления бронирования: ", error);
      throw error;
    }
  },
  // getBookedDates: async (roomId) => {
  //   console.log("roomId", roomId);

  //   const accessToken = cookieService.getAccessToken();
  //   try {
  //     const { data } = await httpAuth.get(`get-booked-dates`, {
  //       params: {
  //         roomId,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log("aaaa", data);

  //     return data;
  //   } catch (error) {
  //     console.error("Ошибка получения  дат: ", error);
  //     throw error;
  //   }
  // },
  getBookedDates: async (roomId) => {
    console.log("roomId", roomId);
    const accessToken = cookieService.getAccessToken();
    try {
      const { data } = await httpAuth.get(`get-booked-dates`, {
        params: {
          roomId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      console.error("Ошибка получения  дат: ", error);
      throw error;
    }
  },
  getBooked: async (roomId) => {
    const accessToken = cookieService.getAccessToken();
    try {
      const { data } = await httpAuth.get(`get-bookings`, {
        params: {
          roomId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data.bookings;
    } catch (error) {
      console.error("Ошибка получения  дат: ", error);
      throw error;
    }
  },
};

export default bookingService;
