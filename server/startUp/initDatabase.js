const Room = require("../models/Room");
const hotelRoomsMock = require("../mock/rooms.json");

module.exports = async () => {
  const rooms = await Room.find();
  if (rooms.length !== hotelRoomsMock.length) {
    await createInitialEntity(Room, hotelRoomsMock);
  }

  async function createInitialEntity(Model, data) {
    return Promise.all(
      data.map(async (item) => {
        try {
          delete item.id;
          const newItem = new Model(item);
          await newItem.save();
        } catch (e) {}
      })
    );
  }
};
