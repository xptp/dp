import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/edithAddRoomPage.scss";
import {
  updateUser,
  updateUserProfile,
} from "../../../store/reducers/userSlice";
import Loader from "../../ui/loader";
const UserEdithPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.user);
  // console.log(user);
  const [currentUser, setCurrentUser] = useState({
    name: "",
  });
  useEffect(() => {
    if (user) {
      setCurrentUser({
        name: user.name || "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name: currentUser.name })).then(() => {
      setTimeout(() => {
        navigate(`/`);
      }, 500);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  return (
    <div className="add-edith-room-form">
      <h1>Редактирование пользователя</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-edith-div">
          <label>Имя</label>
          <input
            type="text"
            name="name"
            value={currentUser.name}
            onChange={handleChange}
          />
        </div>
        <button className="btn-edith-add-room" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default UserEdithPage;
