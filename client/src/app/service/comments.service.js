import axios from "axios";
import config from "../config.json";
import cookieService from "./cookie.service";

const httpAuth = axios.create({
  // baseURL: config.apiEndpoint,
  baseURL: config.apiEndpointTest,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const commentsService = {
  get: async () => {
    try {
      const accessToken = cookieService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await httpAuth.get("/comments", { headers });
      return response.data;
    } catch (e) {
      console.error("Ошибка при получении комментариев", e);
      throw e;
    }
  },
  post: async (text) => {
    // console.log("3");
    try {
      const accessToken = cookieService.getAccessToken();

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      // console.log("4");
      const response = await httpAuth.post("/comments", { text }, { headers });
      // console.log("5");
      return response.data;
    } catch (e) {
      console.error("Ошибка добавления комментария", e);
      throw e;
    }
  },
  del: async (id) => {
    try {
      const accessToken = cookieService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await httpAuth.delete(`/comments/${id}`, { headers });
      return response.data;
    } catch (e) {
      console.error("Ошибка при удалении комментария", e);
      throw e;
    }
  },
  edit: async (id, newText) => {
    try {
      const accessToken = cookieService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const response = await httpAuth.put(
        `/comments/${id}`,
        { text: newText },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка редактирования комментария", error);
      throw error;
    }
  },
};

export default commentsService;
