import axios from "axios";
import config from "../config.json";
import cookieService from "./cookie.service";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "/auth/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});
const authService = {
  register: async ({ email, password, admin }) => {
    const { data } = await httpAuth.post(`signUp`, {
      email,
      password,
      admin,
      returnSecureToken: true,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signInWithPassword`, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);

    return data;
  },
  refresh: async () => {
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: cookieService.getRefreshToken(),
    });
    return data;
  },
  logout: async () => {
    try {
      const refreshToken = cookieService.getRefreshToken();
      const userId = cookieService.getUserId();
      if (refreshToken) {
        await httpAuth.post("logout", { refresh_token: refreshToken });
      } else if (userId) {
        await httpAuth.post("logout", { userId });
      }
      cookieService.removeAuthData();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export default authService;
