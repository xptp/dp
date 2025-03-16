import React, { useEffect, useState } from "react";
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
  const [sortedRooms, setSortedRooms] = useState([]);
  const [filters, setFilters] = useState({
    standart: true,
    standartPlus: true,
    lux: true,
  });

  useEffect(() => {
    dispatch(loadRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms) {
      // console.log('1');
      const f = rooms.filter((room) => {
        if (room?.type === "Standard" && !filters.standart) return false;
        if (room?.type === "Standard+" && !filters.standartPlus) return false;
        if (room?.type === "Lux" && !filters.lux) return false;
        return true;
      });
      // console.log('2');
      setSortedRooms(f);
    }
  }, [rooms, filters]);

  const FiltrChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: !prevFilters[type],
    }));
  };

  const handleSort = (type) => {
    const sorted = [...sortedRooms].sort((a, b) => {
      if (a?.type === type && b?.type !== type) return -1;
      if (a?.type !== type && b?.type === type) return 1;
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
        {/* <div className="filter-container"> */}
        <div className="filtr-btn-container">
          <label className="label-ceckbox">
            Standart
            <input
              type="checkbox"
              checked={filters.standart}
              className="input-ceckbox"
              onChange={() => FiltrChange("standart")}
            />
          </label>
        </div>
        <div className="filtr-btn-container">
          <label className="label-ceckbox">
            Standart+
            <input
              type="checkbox"
              className="input-ceckbox"
              checked={filters.standartPlus}
              onChange={() => FiltrChange("standartPlus")}
            />
          </label>
        </div>
        <div className="filtr-btn-container">
          <label className="label-ceckbox">
            Lux
            <input
              type="checkbox"
              className="input-ceckbox"
              checked={filters.lux}
              onChange={() => FiltrChange("lux")}
            />
          </label>
        </div>
        {/* </div> */}
        <SortBtn onSort={handleSort} />
      </div>

      {sortedRooms.length > 0 ? (
        sortedRooms.map((r) => {
          return (
            r && (
              <div key={r._id} className="room">
                {r.images ? (
                  <SwiperComponent
                    objImages={r.images} // мб || []
                    clName={"room-images-swiper"}
                  />
                ) : null}
                <Link className="link-room" to={`/rooms/${r._id}`}>
                  <div className="room-info">
                    <h1>{r.name}</h1>
                    <p>{r.shortDescription}</p>
                    <div className="room-place">{`Спальных мест: ${r.places}`}</div>
                  </div>
                  <div className="button-container">
                    <MainBtn text={"Забронировать"} />
                  </div>
                </Link>
              </div>
            )
          );
        })
      ) : (
        <h3>Нет подходящих номеров</h3>
      )}
    </div>
  );
};

export default RoomsPage;
