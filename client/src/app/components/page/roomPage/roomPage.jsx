import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/loader";
import SwiperComponent from "../../ui/swiperComponent";
import "../../../styles/pages/roomPage.scss";
import roomService from "../../../service/roomService.service";
import BookingForm from "../../ui/booingForm";
import CancelBooking from "../../ui/bookengDelForm";

const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const { _id } = useParams();
  // console.log(_id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      setIsLoading(true);
      try {
        const fetchedRoom = await roomService.getById(_id);
        setRoom(fetchedRoom);
      } catch (error) {
        console.error("Ошибка при получении комнаты:", error);
      }
      setIsLoading(false);
    };

    fetchRoom();
  }, [_id]);

  if (isLoading) {
    return <Loader />;
  }

  return room ? (
    <div className="roomPage">
      <SwiperComponent objImages={room.images} clName={"main-swiper-room"} />
      <BookingForm roomId={_id} />
      <CancelBooking />
      <div className="room-content">
        <h1>{room.name}</h1>
        <div className="places">Количество спальных мест: {room.places}</div>
        <p className="desc">{room.description}</p>
      </div>

      <button className="btn">ЗАБРОНИРОВАТЬ</button>
    </div>
  ) : null;
};

export default RoomPage;
