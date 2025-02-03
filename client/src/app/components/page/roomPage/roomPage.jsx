import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/loader";
import SwiperComponent from "../../ui/swiperComponent";
import "../../../styles/pages/roomPage.scss";
import roomService from "../../../service/roomService.service";
import BookingForm from "../../ui/bookingForm";

const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const fetchedRoom = await roomService.getById(_id);
        setRoom(fetchedRoom);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [_id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!isLoading ? (
        <div className="roomPage">
          <div className="room-content">
            <h1>{room.name}</h1>
            <p>{room.description}</p>
            <div className="places">
              Количество спальных мест: {room.places}
            </div>
            <BookingForm roomId={_id} bookClassName={"booking-form"} />
          </div>

          <SwiperComponent
            objImages={room.images}
            clName={"main-swiper-room"}
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RoomPage;
