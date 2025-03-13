import React, { useEffect, useMemo, useState } from "react";
import "../../../styles/pages/roomsPage.scss";
import { Link } from "react-router-dom";
import SwiperComponent from "../../ui/swiperComponent";
import Loader from "../../ui/loader";
import SortBtn from "../../ui/sortBtn";
import MainBtn from "../../ui/mainBtn";
import { useDispatch, useSelector } from "react-redux";
import { loadRooms } from "../../../store/reducers/roomSlice";

const RoomsPage = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading, error } = useSelector((state) => state.rooms);
  const [sortedRooms, setSortedRooms] = useState([...rooms]);

  useEffect(() => {
    dispatch(loadRooms());
  }, [dispatch]);

  useEffect(() => {
    setSortedRooms([...rooms]);
  }, [rooms]);

  const handleSort = (type) => {
    const sorted = [...rooms].sort((a, b) => {
      if (a.type === type && b.type !== type) return -1;
      if (a.type !== type && b.type === type) return 1;
      return 0;
    });
    setSortedRooms(sorted);
  };

  const finalRooms = useMemo(() => {
    return sortedRooms;
  }, [sortedRooms]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="rooms-page">
      <div className="sort-btn-container">
        <SortBtn onSort={handleSort} />
      </div>
      {finalRooms.map((o) => (
        <div key={o._id} className="room">
          <SwiperComponent objImages={o.images} clName={"room-images-swiper"} />
          <Link className="link-room" to={`/rooms/${o._id}`}>
            <div className="room-info">
              <h1>{o.name}</h1>
              <p>{o.shortDescription}</p>
              <div className="room-place">{`Спальных мест: ${o.places}`}</div>
            </div>
            <div className="button-container">
              <MainBtn />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RoomsPage;
