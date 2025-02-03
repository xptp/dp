import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import roomService from "../../../service/roomService.service";
import Loader from "../../ui/loader";
import "../../../styles/pages/adminPage.scss";
const AdminPage = () => {
  const [rooms, setRooms] = useState();
  const [load, setLoad] = useState(true);

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

  return (
    <>
      {!load ? (
        <div className="admin">
          <div className="admin-page">
            {rooms ? (
              rooms.map((o) => (
                <div key={o._id} className="admin-room-box">
                  <Link className="" to={`/rooms/${o._id}`}>
                    <div className="">
                      <div>{o.number}</div>
                      <div>{o.type}</div>
                      <div className="">{`Мест ${o.places}`}</div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <>{load ? <Loader /> : null}</>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AdminPage;
