import React, { useEffect, useMemo, useState } from "react";
import "../../../styles/pages/roomsPage.scss";
import { Link, useNavigate } from "react-router-dom";
import SwiperComponent from "../../ui/swiperComponent";
import Loader from "../../ui/loader";
import SortBtn from "../../ui/sortBtn";
import MainBtn from "../../ui/mainBtn";
import { useDispatch, useSelector } from "react-redux";
import { loadRooms } from "../../../store/reducers/roomSlice";

const RoomsPage = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading, error } = useSelector((state) => state.rooms);
  const navigate = useNavigate();
  const [sortedRooms, setSortedRooms] = useState([...rooms]);

  const finalRooms = useMemo(() => {
    return sortedRooms;
  }, [sortedRooms]);

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

  const handleClick = () => {
    navigate(`/rooms/addRoom`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="rooms-page">
      <div>
        <MainBtn handle={handleClick} text={"Добавить номер"} />
      </div>
      <div className="sort-btn-container">
        <SortBtn onSort={handleSort} />
      </div>
      {finalRooms.map(
        (o) =>
          o && (
            <div key={o._id} className="room">
              {o.images ? (
                <SwiperComponent
                  objImages={o.images || []}
                  clName={"room-images-swiper"}
                />
              ) : null}
              {/* <SwiperComponent
            objImages={o.images || []}
            clName={"room-images-swiper"}
          /> */}
              <Link className="link-room" to={`/rooms/${o._id}`}>
                <div className="room-info">
                  <h1>{o.name}</h1>
                  <p>{o.shortDescription}</p>
                  <div className="room-place">{`Спальных мест: ${o.places}`}</div>
                </div>
                <div className="button-container">
                  <MainBtn text={"Забронировать"} />
                </div>
              </Link>
            </div>
          )
      )}
    </div>
  );
};

export default RoomsPage;
