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
  get: async (dispatch) => {
    // console.log("1");
    try {
      const _id = cookieService.getUserId();
      const accesstoken = cookieService.getAccessToken();
      const refreshToken = cookieService.getRefreshToken();

      if (refreshToken) {
        if (!accesstoken) {
          await refreshAccessToken(dispatch);
        }
      } else {
        console.log("нет");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      };
      const response = await httpAuth.get(`/user?_id=${_id}`, { headers });
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshAccessToken(dispatch);
        console.log("1111");
        return userService.get(dispatch);
      } else {
        console.error("Ошибка при получении пользователя", error);
        throw error;
      }
    }
  },
};

const refreshAccessToken = async (dispatch) => {
  try {
    const refreshToken = cookieService.getRefreshToken();

    if (!refreshToken || refreshToken === "undefined") {
      dispatch(logoutUser());
      throw new Error("No refresh token");
    }

    const data = await axios.post("http://localhost:8080/api/auth/token", {
      refresh_token: refreshToken,
    });

    console.log(data.data);
    cookieService.setTokens(data.data);
    // console.log("1");
  } catch (error) {
    console.error("Ошибка при обновлении токена", error);
    dispatch(logoutUser());
    throw error;
  }
};

export default userService;
