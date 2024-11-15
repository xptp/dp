import axios from "axios";

const roomService = {
  getAllRooms: async () => {
    try {
      let config = {
        headers: {
          a: "token",
        },
      };
      const response = await axios.get(
        "http://localhost:8080/api/rooms",
        config
      );

      return response.data;
    } catch (error) {
      console.error("Ошибка при получении комнат", error);
    }
    throw new Error("Ошибка при получении комнат");
  },
  getById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${id}`);

      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении комнаты с id: ${id}`, error);
      throw new Error(`Не удалось получить комнату с id: ${id}`);
    }
  },
};

export default roomService;
