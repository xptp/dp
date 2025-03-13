import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadRoomById, updateRoom } from "../../../store/reducers/roomSlice";
import Loader from "../../ui/loader";

const EdithRoomPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentRoom, isLoading, error } = useSelector((state) => state.rooms);
  const [room, setRoom] = useState({
    number: "",
    name: "",
    shortDescription: "",
    description: "",
    type: "",
    places: "",
    images: [],
  });

  useEffect(() => {
    dispatch(loadRoomById(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    if (currentRoom) {
      setRoom({
        number: currentRoom.number,
        name: currentRoom.name,
        shortDescription: currentRoom.shortDescription,
        description: currentRoom.description,
        type: currentRoom.type,
        places: currentRoom.places,
        images: currentRoom.images,
      });
    }
  }, [currentRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRoom(_id, room)).then(() => {
      navigate(`/rooms/${_id}`);
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Редактирование номера</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Номер:</label>
          <input
            type="text"
            name="number"
            value={room.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Короткое описание:</label>
          <input
            type="text"
            name="shortDescription"
            value={room.shortDescription}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            name="description"
            value={room.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тип:</label>
          <input
            type="text"
            name="type"
            value={room.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Количество мест:</label>
          <input
            type="number"
            name="places"
            value={room.places}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EdithRoomPage;
