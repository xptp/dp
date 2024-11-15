import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../../service/roomService.service";
import Loader from "../../ui/loader";
import "../../../styles/pages/adminPage.scss";
const AdminPage = () => {
  const [rooms, setRooms] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    const r = await roomService.getAllRooms();

    setRooms(r);
    console.log(rooms);
  }

  return (
    <div className="admin">
      <div className="admin-page">
        {rooms ? (
          rooms.map((o) => (
            <div key={o._id} className="admin-room-box">
              <Link className="" to={`/rooms/${o._id}`}>
                <div className="">
                  <div>{o.number}</div>
                  <div>{o.type}</div>
                  <div>{o.shortDescription}</div>
                  <div className="">{`Мест ${o.places}`}</div>
                  <div>{`Бронь ${!o.available ? `Есть` : `Нет`}`}</div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <>{load ? <Loader /> : null}</>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
