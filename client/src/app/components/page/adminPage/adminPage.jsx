import React, { useEffect, useState } from "react";
import roomService from "../../../service/roomService.service";
import Loader from "../../ui/loader";
import "../../../styles/pages/adminPage.scss";
import BookingList from "../../ui/bookingList";

const AdminPage = () => {
  const [rooms, setRooms] = useState();
  const [load, setLoad] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      setLoad(true);
      const r = await roomService.getAllRooms();
      setRooms(r);
      setLoad(false);
    } catch (error) {
      console.error(error);
      setLoad(false);
    }
  }

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  return (
    <>
      {!load ? (
        <div className="admin">
          <div className="admin-page">
            {rooms ? (
              rooms.map((o) => (
                <div key={o._id} className="admin-room-box">
                  <div onClick={() => handleRoomClick(o._id)}>
                    <div>Номер: {o.number}</div>
                    <div>{o.type}</div>
                    <div className="">{`Мест ${o.places}`}</div>
                  </div>
                </div>
              ))
            ) : (
              <>{load ? <Loader /> : null}</>
            )}
          </div>
          {selectedRoom && (
            <BookingList roomId={selectedRoom} onClose={handleCloseModal} />
          )}{" "}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdminPage;
