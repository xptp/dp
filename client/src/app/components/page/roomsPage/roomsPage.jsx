import React, { useEffect, useState } from "react";
import "../../../styles/pages/roomsPage.scss";
import { Link } from "react-router-dom";
import SwiperComponent from "../../ui/swiperComponent";
import Loader from "../../ui/loader";
import roomService from "../../../service/roomService.service";
import SortBtn from "../../ui/sortBtn";
import SortDate from "../../ui/sortDate";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [load, setLoad] = useState(false);
  // const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);
  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  async function fetchRooms() {
    try {
      setLoad(true);
      const r = await roomService.getAllRooms();
      setRooms(r);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  }

  const handleSort = (type) => {
    const sorted = [...rooms].sort((a, b) => {
      if (a.type === type && b.type !== type) {
        return -1;
      }
      if (a.type !== type && b.type === type) {
        return 1;
      }
      return 0;
    });
    setRooms(sorted);
  };

  // const handleFilter = (filteredRooms) => {
  //   setFilteredRooms(filteredRooms);
  // };

  return (
    <>
      {!load ? (
        <div className="rooms-page">
          <div className="sort-btn-container">
            {/* <SortDate onFilter={handleFilter} /> */}
            <SortBtn onSort={handleSort} />
          </div>
          {rooms.map((o) => (
            <div key={o._id} className="room">
              <SwiperComponent
                objImages={o.images}
                clName={"room-images-swiper"}
              />

              <Link className="link-room" to={`/rooms/${o._id}`}>
                <div className="room-info">
                  <h1>{o.name}</h1>
                  <p>{o.shortDescription}</p>
                  <div className="room-place">{`Спальных мест: ${o.places}`}</div>
                </div>
                <button>Забронировать</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RoomsPage;
{
  /* {rooms ? (
        rooms.map((o) => (
          <div key={o._id} className="room">
            <SwiperComponent
              objImages={o.images}
              clName={"room-images-swiper"}
            />

            <Link className="link-room" to={`/rooms/${o._id}`}>
              <div className="room-info">
                <h1>{o.name}</h1>
                <p>{o.shortDescription}</p>
                <div className="room-place">{`Спальных мест: ${o.places}`}</div>
              </div>
              <button>Забронировать</button>
            </Link>
          </div>
        ))
      ) : (
        <>{load ? <Loader /> : null}</>
      )} */
}
