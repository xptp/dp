import axios from "axios";
import config from "../config.json";
import cookieService from "./cookie.service";
import { logoutUser } from "../store/userSlice";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const userService = {
  get: async () => {
    try {
      const _id = cookieService.getUserId();
      // console.log("_id", _id);

      const accesstoken = cookieService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      };
      const response = await httpAuth.get(`/user?_id=${_id}`, { headers });

      console.log("response", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Access token expired, attempting to refresh...");
        await refreshAccessToken();
        console.log("1111");

        return userService.get();
      } else {
        console.error("Ошибка при получении пользователя", error);
        throw error;
      }
    }
  },
};
// const userService = {
//   get: async () => {
//     try {
//       const _id = cookieService.getUserId();
//       // console.log("_id", _id);

//       const token = cookieService.getAccessToken();
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
//       const response = await httpAuth.get(`/user?_id=${_id}`, { headers });

//       console.log("response", response.data);

//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         console.error("Access token expired, attempting to refresh...");

//         return userService.get(); // Повторите запрос после обновления токена
//       } else {
//         console.error("Ошибка при получении пользователя", error);
//         throw error;
//       }
//     }
//   },
// };
const refreshAccessToken = async () => {
  try {
    const refreshToken = cookieService.getRefreshToken();

    if (!refreshToken || refreshToken === "undefined") {
      logoutUser();
      throw new Error("No refresh token");
    }

    const data = await axios.post("http://localhost:8080/api/auth/token", {
      refresh_token: refreshToken,
    });
    console.log(refreshToken);

    console.log("data", data.data);
    cookieService.setTokens(data);

    // const newAccessToken = response.data.accessToken;
    // cookieService.setAccessToken(newAccessToken);
    console.log("Access token refreshed");
  } catch (error) {
    console.error("Ошибка при обновлении токена", error);
    // logoutUser();
    throw error;
  }
};
export default userService;
