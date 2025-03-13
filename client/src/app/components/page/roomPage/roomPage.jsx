import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/loader";
import SwiperComponent from "../../ui/swiperComponent";
import "../../../styles/pages/roomPage.scss";
import BookingForm from "../../forms/bookingForm";
import { useDispatch, useSelector } from "react-redux";
import { loadRoomById } from "../../../store/reducers/roomSlice";

const RoomPage = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { currentRoom, isLoading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(loadRoomById(_id));
    // console.log("currentRoom", currentRoom);
  }, [dispatch, _id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <>
      <div className="roomPage">
        <div className="room-content">
          <SwiperComponent
            objImages={currentRoom.images}
            clName={"main-swiper-room"}
          />
          <h1>{currentRoom.name}</h1>
          <div className="test">
            <div>
              <p>{currentRoom.description}</p>
              <span className="places">
                Количество спальных мест: {currentRoom.places}
              </span>
            </div>
            <BookingForm roomId={_id} bookClassName={"booking-form"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
