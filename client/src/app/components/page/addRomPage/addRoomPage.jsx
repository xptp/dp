import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoom, roomAdd } from "../../../store/reducers/roomSlice";
import Loader from "../../ui/loader";
import "../../../styles/pages/edithAddRoomPage.scss";
import { TbXboxX } from "react-icons/tb";
const AddRoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.rooms);

  const [newRoom, setNewRoom] = useState({
    number: "",
    name: "",
    shortDescription: "",
    description: "",
    type: "",
    places: "",
    images: [],
  });
  const delRoomsImg = (id) => {
    const newRoom = { ...newRoom };
    const images = [...newRoom.images];

    const index = images.findIndex((img) => img.id === id);
    if (index !== -1) {
      images.splice(index, 1);
    }

    newRoom.images = images;
    setNewRoom(newRoom);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const addImage = () => {
    const imageUrl = document.getElementById("imageUrl").value;
    if (imageUrl) {
      const newImage = {
        id: newRoom.images.length,
        img: imageUrl,
        active: false,
      };
      const updatedImages = [...newRoom.images, newImage];
      setNewRoom({ ...newRoom, images: updatedImages });
      document.getElementById("imageUrl").value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRoom(newRoom)).then(() => {
      navigate("/");
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  return (
    <div className="add-edith-room-form">
      <h1>Добавление нового номера</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-edith-div">
          <label>Номер:</label>
          <input
            type="text"
            name="number"
            // value={room.number}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Название:</label>
          <input
            type="text"
            name="name"
            // value={room.name}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Короткое описание:</label>
          <input
            type="text"
            name="shortDescription"
            // value={room.shortDescription}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Полное описание:</label>
          <textarea
            name="description"
            // value={room.description}
            onChange={handleChange}
          />
        </div>
        <div className="add-edith-div">
          <label>Тип:</label>
          <select name="type" id="" onChange={handleChange}>
            <option value="Standard">Standart</option>
            <option value="Standard+">Standart+</option>
            <option value="Lux">Lux</option>
          </select>
        </div>
        <div className="add-edith-div">
          <label>Количество мест:</label>
          <input
            type="number"
            name="places"
            // value={room.places}
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
          <button type="button" onClick={addImage}>
            Добавить фото
          </button>
        </div>

        <div className="add-edith-div">
          <label>Минимум две фотографии</label>

          <div className="add-edith-div-container">
            {newRoom.images.map((i) => {
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
        <button className="save-room-btn" type="submit">
          Создать номер
        </button>
      </form>
    </div>
  );
};

export default AddRoomPage;
