import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteRoom,
  loadRoomById,
  updateRoom,
} from "../../../store/reducers/roomSlice";
import Loader from "../../ui/loader";
import "../../../styles/pages/edithAddRoomPage.scss";
import { TbXboxX } from "react-icons/tb";

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
      console.log(currentRoom);

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
      setTimeout(() => {
        navigate(`/rooms/${_id}`);
      }, 500);
    });
  };

  const delRoomsImg = (id) => {
    const newRoom = { ...room };
    const images = [...room.images];

    const index = images.findIndex((img) => img.id === id);
    if (index !== -1) {
      images.splice(index, 1);
    }

    newRoom.images = images;
    setRoom(newRoom);
  };

  const handleDElete = () => {
    if (window.confirm("Удалить этот номер?")) {
      dispatch(deleteRoom(_id))
        .then(() => {
          navigate("/rooms");
        })
        .catch((e) => {
          console.error("ошибка удаления", e);
        });
    }
  };

  const addImage = () => {
    const imageUrl = document.getElementById("imageUrl").value;
    if (imageUrl) {
      const newImage = {
        id: room.images.length,
        img: imageUrl,
        active: false,
      };

      const updatedImages = [...room.images, newImage];
      setRoom({ ...room, images: updatedImages });

      document.getElementById("imageUrl").value = "";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="add-edith-room-form">
      <h1>Редактирование номера</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-edith-div">
          <label>Номер:</label>
          <input
            type="text"
            name="number"
            value={room.number}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Короткое описание:</label>
          <input
            type="text"
            name="shortDescription"
            value={room.shortDescription}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Описание:</label>
          <textarea
            name="description"
            value={room.description}
            onChange={handleChange}
          />
        </div>

        <div className="add-edith-div">
          <label>Тип:</label>
          <select
            name="type"
            id=""
            defaultValue={room.type}
            onChange={handleChange}
          >
            <option value="Standart">Standart</option>
            <option value="Standart+">Standart+</option>
            <option value="Lux">Lux</option>
          </select>
        </div>
        <div className="add-edith-div">
          <label>Количество мест:</label>
          <input
            type="number"
            name="places"
            value={room.places}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Добавить фото (URL):</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Введите URL изображения"
          />
          <button
            className="btn-edith-add-room"
            type="button"
            onClick={addImage}
          >
            Добавить фото
          </button>
        </div>
        <div className="add-edith-div">
          <label>Минимум две фотографии</label>

          <div className="add-edith-div-container">
            {room.images.map((i) => {
              // console.log(i);
              return (
                <div className="add-edith-img-box">
                  <img src={i.img} key={i.id} alt="" />
                  <button
                    className="img-del-btn"
                    type="button"
                    onClick={() => delRoomsImg(i.id)}
                  >
                    <TbXboxX />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn-edith-add-room" type="submit">
          Сохранить
        </button>
        <button
          className="btn-edith-add-room"
          type="button"
          onClick={handleDElete}
        >
          Удалить
        </button>
      </form>
    </div>
  );
};

export default EdithRoomPage;
