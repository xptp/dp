import React, { useEffect, useState } from "react";
import "../../../styles/pages/roomsPage.scss";
import { Link } from "react-router-dom";
import SwiperComponent from "../../ui/swiperComponent";
import Loader from "../../ui/loader";
import roomService from "../../../service/roomService.service";
import SortBtn from "../../ui/sortBtn";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);
  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  async function fetchRooms() {
    setLoad(true);
    const r = await roomService.getAllRooms();
    setRooms(r);
    setLoad(false);
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

  return (
    <div className="rooms-page">
      <div className="rooms-description">
        <h1>Номера и цены</h1>
        <p>
          Номерной фонд Отеля включает 42 просторных номера с панорамным видом
          на лес, горы и поселок Домбай.
        </p>
        <p>
          Для удобства и комфорта Гостей все номера оснащены мини-холодильником,
          телевизором с плоским экраном со спутниковым ТВ, чайником, чайными
          наборами, кофе, сахаром и чаем, а также необходимой мебелью для
          длительного и кратковременного пребывания.
        </p>
        <p>
          Ванная комната имеет теплый пол и укомплектована феном, тапочками,
          комплектом полотенец и всеми необходимыми средствами гигиены.
        </p>
        <p>
          Все номера оснащены панорамными, застекленными и просторными балконами
          с теплым полом, где можно любоваться горными пейзажами и насладиться
          тишиной с чашечкой душистого чая. Каждый номер индивидуален, выполнен
          в неповторимом стильном интерьере. В здании отеля имеется лифт.
        </p>
      </div>
      <div className="sort-btn-container">
        <SortBtn onSort={handleSort} />
      </div>

      {rooms ? (
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
                <div className="room-place">{`Спальных мест ${o.places}`}</div>
              </div>
              <button>Забронировать</button>
            </Link>
          </div>
        ))
      ) : (
        <>{load ? <Loader /> : null}</>
      )}
    </div>
  );
};

export default RoomsPage;
